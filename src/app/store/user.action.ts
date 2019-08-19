import { createAction, props } from '@ngrx/store';
import { ReviewData } from '../classes/ReviewData';

export const login = createAction(
  'Login',
  props<{ ID: string; Name: string; Picture: string; Gender: string; }>()
);

export const test = createAction(
  'Test'
);

export const logout = createAction(
  'Logout'
);

export const setPage = createAction(
  'SetPage',
  props<{ page: number }>()
);

export const dataIsEnd = createAction(
  'DataIsEnd',
  props<{ dataIsEnd: boolean }>()
);

export const initReviewData = createAction(
  'InitReviewData',
  props<{ reviewData: ReviewData[] }>()
);

export const addReviewData = createAction(
  'AddReviewData',
  props<{ reviewData: ReviewData[] }>()
)