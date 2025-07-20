import constructorReducer, {
  addIngredient,
  deleteIngredient,
  upIngredient,
  downIngredient,
  addBun,
  clearConstructor
} from '../constructor-slice';
import { TIngredient } from '../../utils/types';

const sampleIngredient: TIngredient = {
  _id: '1',
  name: 'Ингредиент',
  type: 'main',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 300,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('constructor-slice', () => {
  it('добавляет ингредиент', () => {
    const state = constructorReducer(undefined, addIngredient(sampleIngredient));
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]._id).toBe('1');
  });

  it('добавляет булку', () => {
    const state = constructorReducer(undefined, addBun(sampleIngredient));
    expect(state.bun?._id).toBe('1');
  });

  it('удаляет ингредиент', () => {
    const stateWithIngredient = constructorReducer(undefined, addIngredient(sampleIngredient));
    const id = stateWithIngredient.ingredients[0].id;
    const state = constructorReducer(stateWithIngredient, deleteIngredient(id));
    expect(state.ingredients.length).toBe(0);
  });

  it('перемещает ингредиент вверх по списку', () => {
    let state = constructorReducer(undefined, addIngredient(sampleIngredient));
    state = constructorReducer(state, addIngredient({ ...sampleIngredient, _id: '2' }));
    const before = state.ingredients.map(i => i._id);
    state = constructorReducer(state, upIngredient(1));
    const after = state.ingredients.map(i => i._id);
    expect(after).toEqual(before.reverse());
  });

  it('перемещает ингредиент вниз по списку', () => {
    let state = constructorReducer(undefined, addIngredient(sampleIngredient));
    state = constructorReducer(state, addIngredient({ ...sampleIngredient, _id: '2' }));
    const before = state.ingredients.map(i => i._id);
    state = constructorReducer(state, downIngredient(0));
    const after = state.ingredients.map(i => i._id);
    expect(after).toEqual(before.reverse());
  });

  it('очищает конструктор', () => {
    let state = constructorReducer(undefined, addIngredient(sampleIngredient));
    state = constructorReducer(state, addBun(sampleIngredient));
    state = constructorReducer(state, clearConstructor());
    expect(state.ingredients.length).toBe(0);
    expect(state.bun).toBeNull();
  });
});
