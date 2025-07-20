import { rootReducer } from '../store';
import constructorReducer from '../../slices/constructor-slice';
import detailsReducer from '../../slices/details-slice';

describe('rootReducer', () => {
  it('должен содержать все слайсы', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    // проверяем что рутредюсер содержит слайсы
    expect(initialState).toHaveProperty('constructorIngredients');
    expect(initialState).toHaveProperty('details');
    expect(initialState).toHaveProperty('orders');
    expect(initialState).toHaveProperty('feeds');
    expect(initialState).toHaveProperty('auth');
  });
});
