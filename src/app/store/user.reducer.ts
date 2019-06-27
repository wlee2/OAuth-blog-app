import { createReducer, on, Action, props } from '@ngrx/store';
import { login, logout, test } from './user.action';

export interface State {
  userName: string;
  picture: string;
  url: string;
}

export const initialState = {
  userName: null,
  picture: null,
  url: null
};

export const userReducer = createReducer(
  initialState,
  on(login, (state, {name, picture, url}) => ({
    userName: name,
    picture: picture,
    url: url
  })),
  on(logout, state => ({
    ...state,
    userName: null,
    picture: null,
    url: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
