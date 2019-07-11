import { createAction, props } from '@ngrx/store';

export const login = createAction(
  'Login',
  props<{ Name: string; Picture: string; Gender: string; }>()
);

export const test = createAction(
  'Test'
);

export const logout = createAction(
  'Logout'
);