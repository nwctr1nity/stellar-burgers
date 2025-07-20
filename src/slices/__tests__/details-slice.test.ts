import detailsReducer, {
  loadIngredientData
} from '../details-slice';
import { TIngredient } from '../../utils/types';

const sampleIngredient: TIngredient = {
  _id: '1',
  name: 'Sample',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('details-slice', () => {
  it('sets isLoading to true on pending', () => {
    const action = { type: loadIngredientData.pending.type };
    const state = detailsReducer(undefined, action);
    expect(state.isLoading).toBe(true);
    expect(state.fetchError).toBeNull();
  });

  it('sets data and isLoading false on fulfilled', () => {
    const action = {
      type: loadIngredientData.fulfilled.type,
      payload: [sampleIngredient]
    };
    const state = detailsReducer(undefined, action);
    expect(state.isLoading).toBe(false);
    expect(state.list).toHaveLength(1);
    expect(state.list[0]._id).toBe('1');
  });

  it('sets error on rejected', () => {
    const action = {
      type: loadIngredientData.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = detailsReducer(undefined, action);
    expect(state.isLoading).toBe(false);
    expect(state.fetchError).toBe('Ошибка');
  });
});
