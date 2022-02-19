import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';

export interface State {
  ui: fromUi.State
}

//group all reducers
export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

// import { Action } from '@ngrx/store';

// export interface State {
//   isLoading: boolean;
// }
// //create a start state
// const initialState: State = {
//   isLoading: false
// }

// //dispatch actions to change the store
// export function appReducer(state = initialState, action: Action) {
// //return a new state - return state;
//   switch (action.type) {
//     case 'START_LOADING':
//       return {
//         isLoading: true
//       };
//     case 'STOP_LOADING':
//       return {
//         isLoading: false
//       }
//     default:
//       return state;
//   }
// }
