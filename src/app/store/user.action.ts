import { createAction, props } from '@ngrx/store';

export const login = createAction(
  'Login',
  props<{ name: string; picture: string; url: string; }>()
);

export const test = createAction(
  'Test'
);

export const logout = createAction(
  'Logout'
);