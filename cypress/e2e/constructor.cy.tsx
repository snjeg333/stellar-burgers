/// <reference types="cypress"/>

const baseUrl = 'http://localhost:4000';
const accessToken = '1';
const refreshToken = '2';

describe('Правильная работа добавления ингредиентов в конструктор', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', {
      statusCode: 200,
      fixture: 'ingredients'
    }).as('getIngredients');
    cy.visit(baseUrl);

    window.localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    cy.wait('@getIngredients');
  });

  it('Проверка добавления булки', function () {
    cy.get('[data-cy=bun-ingredients]')
      .contains('Добавить', { timeout: 20000 })
      .click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Краторная булка N-200i')
      .should('exist')
      .and('be.visible');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Краторная булка N-200i')
      .should('exist')
      .and('be.visible');
  });

  it('Проверка добавления основного ингредиента и соуса', function () {
    cy.get('[data-cy=mains-ingredients]')
      .contains('Добавить', { timeout: 20000 })
      .click();
    cy.get('[data-cy=sauces-ingredients]')
      .contains('Добавить', { timeout: 20000 })
      .click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist')
      .and('be.visible');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус Spicy-X')
      .should('exist')
      .and('be.visible');
  });
});

describe('Модальное окно ингредиента', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', {
      statusCode: 200,
      fixture: 'ingredients'
    }).as('getIngredients');
    cy.visit(baseUrl);

    window.localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    cy.wait('@getIngredients');
  });

  it('Открытие модального окна ингредиента', function () {
    cy.contains('Краторная булка N-200i').click();
    cy.get('#modals').contains('Краторная булка N-200i').should('exist');
  });

  it('Закрытие модального окна по кнопке', function () {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-cy=modal-close-button]').first().click();
    cy.get('#modals').contains('Краторная булка N-200i').should('not.exist');
  });
});

describe('Проверка модального окна заказа', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', {
      statusCode: 200,
      fixture: 'ingredients'
    }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', {
      statusCode: 200,
      fixture: 'user'
    }).as('getUser');
    cy.intercept('POST', 'api/orders', {
      statusCode: 200,
      fixture: 'order'
    }).as('getOrder');

    cy.setCookie('accessToken', accessToken);
    window.localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    cy.visit(baseUrl);
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.reload();
  });

  it('Функциональность оформления заказа', function () {
    cy.get('[data-cy=bun-ingredients]')
      .contains('Добавить', { timeout: 20000 })
      .click();
    cy.get('[data-cy=mains-ingredients]')
      .contains('Добавить', { timeout: 20000 })
      .click();
    cy.get('[data-cy=sauces-ingredients]')
      .contains('Добавить', { timeout: 20000 })
      .click();

    cy.contains('Оформить заказ').click();
    cy.wait('@getOrder').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ]
      });
    });

    cy.get('[data-cy=modal]').should('exist').and('be.visible');
    cy.get('[data-cy=modal]').contains('50875').should('exist');

    cy.get('[data-cy=modal-close-button]').first().click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=constructor-bun-1]')
      .contains('Выберите булки')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Выберите начинку')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Выберите булки')
      .should('exist');
  });
});
