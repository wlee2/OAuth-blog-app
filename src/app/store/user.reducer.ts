import { createReducer, on, Action, props } from '@ngrx/store';
import { login, logout, test } from './user.action';

export interface State {
  ID: string;
  Name: string;
  Picture: string;
  Gender: string;
}

export const initialState = {
  ID: null,
  Name: null,
  Picture: null,
  Gender: null
};

export const userReducer = createReducer(
  initialState,
  on(login, (state, {ID, Name, Picture, Gender}) => ({
    ID: ID,
    Name: Name,
    Picture: Picture,
    Gender: Gender
  })),
  on(logout, state => ({
    ...state,
    ID: null,
    Name: null,
    Picture: null,
    Gender: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
