import { FC, memo, useCallback } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  deleteIngredient,
  upIngredient,
  downIngredient
} from '../../slices/constructor-slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = useCallback(() => {
      dispatch(downIngredient(index));
    }, [dispatch, index]);

    const handleClose = useCallback(() => {
      dispatch(deleteIngredient(ingredient.id));
    }, [dispatch, ingredient.id]);

    const handleMoveUp = useCallback(() => {
      dispatch(upIngredient(index));
    }, [dispatch, index]);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
