import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { getConstructorState } from '../../utils/constants';
import { useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const { bun, ingredients: items = [] } = useSelector(getConstructorState);

  const countMap = useMemo(() => {
    const counter: Record<string, number> = {};
    items.forEach((item: TConstructorIngredient) => {
      if (item?._id) {
        counter[item._id] = (counter[item._id] || 0) + 1;
      }
    });
    if (bun?._id) counter[bun._id] = 2;
    return counter;
  }, [bun, items]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={countMap}
      ref={ref}
    />
  );
});
