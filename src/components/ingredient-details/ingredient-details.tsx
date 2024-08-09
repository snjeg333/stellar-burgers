import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Params, useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/burgerIngredients/selectorIngredients';

export const IngredientDetails: FC = () => {
  const { id } = useParams<Params>();
  const ingredients = useSelector(selectIngredients);
  const ingredientData = ingredients.find(({ _id }) => _id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
