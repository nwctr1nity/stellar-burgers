import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TIngredient,
  TConstructorIngredient,
  TConstructorState
} from '../utils/types';

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorIngredientsSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const structuredIngredient: TConstructorIngredient = {
        ...action.payload,
        id: `${action.payload._id}-${Math.random().toString(36).slice(2)}`
      };
      state.ingredients.push(structuredIngredient);
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    upIngredient: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      if (idx > 0) {
        [state.ingredients[idx], state.ingredients[idx - 1]] = [
          state.ingredients[idx - 1],
          state.ingredients[idx]
        ];
      }
    },
    downIngredient: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      if (idx < state.ingredients.length - 1) {
        [state.ingredients[idx], state.ingredients[idx + 1]] = [
          state.ingredients[idx + 1],
          state.ingredients[idx]
        ];
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addBun,
  addIngredient,
  deleteIngredient,
  upIngredient,
  downIngredient,
  clearConstructor
} = constructorIngredientsSlice.actions;

export default constructorIngredientsSlice.reducer;
