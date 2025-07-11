import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TDetailsState } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';

const initialState: TDetailsState = {
  list: [],
  selected: null,
  isLoading: false,
  fetchError: null
};

export const loadIngredientData = createAsyncThunk(
  'details/loadIngredientData',
  async () => await getIngredientsApi()
);

const detailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    resetSelectedIngredient: (state) => {
      state.selected = null;
    },
    applySelectedIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.selected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredientData.pending, (state) => {
        state.isLoading = true;
        state.fetchError = null;
      })
      .addCase(loadIngredientData.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(loadIngredientData.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchError = action.error.message ?? 'Ошибка загрузки данных';
      });
  }
});

export const { resetSelectedIngredient, applySelectedIngredient } =
  detailsSlice.actions;
export default detailsSlice.reducer;
