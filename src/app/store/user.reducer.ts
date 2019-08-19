import { createReducer, on, Action } from '@ngrx/store';
import { login, logout, initReviewData, addReviewData, setPage, dataIsEnd } from './user.action';
import { ReviewData } from '../classes/ReviewData';

export interface State {
  ID: string;
  Name: string;
  Picture: string;
  Gender: string;
  ReviewData: ReviewData[];
  Page: number;
  DataIsEnd: boolean;
}

export const initialState = {
  ID: null,
  Name: null,
  Picture: null,
  Gender: null,
  ReviewData: null,
  Page: 0,
  DataIsEnd: false
};

export const userReducer = createReducer(
  initialState,
  on(login, (state, { ID, Name, Picture, Gender }) => ({
    ...state,
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
  })),
  on(initReviewData, (state, { reviewData }) => ({
    ...state,
    ReviewData: [...reviewData],
    Page: 0,
    DataIsEnd: false
  })),
  on(addReviewData, (state, { reviewData }) => ({
    ...state,
    ReviewData: [...state.ReviewData, ...reviewData]
  })),
  on(setPage, (state, { page }) => ({
    ...state,
    Page: page
  })),
  on(dataIsEnd, (state, { dataIsEnd }) => ({
    ...state,
    DataIsEnd: dataIsEnd
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
