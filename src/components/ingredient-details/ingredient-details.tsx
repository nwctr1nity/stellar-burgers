import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { getDetailsList } from '../../utils/constants';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { NotFound404 } from '@pages';

export const IngredientDetails: FC = () => {
  const routeParams = useParams();
  const ingredients = useSelector(getDetailsList);

  const ingredientsData = useMemo(
    () => ingredients.find((ing) => ing._id === routeParams.id),
    [ingredients, routeParams.id]
  );

  if (!ingredients.length) {
    return <Preloader />;
  }

  if (!ingredientsData) {
    return <NotFound404 />;
  }

  return <IngredientDetailsUI ingredientData={ingredientsData} />;
};
