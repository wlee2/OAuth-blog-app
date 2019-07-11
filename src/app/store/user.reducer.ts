import { createReducer, on, Action, props } from '@ngrx/store';
import { login, logout, test } from './user.action';

export interface State {
  Name: string;
  Picture: string;
  Gender: string;
}

export const initialState = {
  Name: null,
  Picture: null,
  Gender: null
};

export const userReducer = createReducer(
  initialState,
  on(login, (state, {Name, Picture, Gender}) => ({
    Name: Name,
    Picture: Picture,
    Gender: Gender
  })),
  on(logout, state => ({
    ...state,
    Name: null,
    Picture: null,
    Gender: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
