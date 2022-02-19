import { START_LOADING, UIActions, STOP_LOADING } from './ui.actions';

export interface State {
  isLoading: boolean
}

//create a start state
const initialState: State = {
  isLoading: false
}

//dispatch actions to change the store
export function uiReducer(state = initialState, action: UIActions) {
  //return a new state - return state;
  switch (action.type) {
    case START_LOADING:
      return {
        isLoading: true
      }
    case STOP_LOADING:
      return {
        isLoading: false
      }
    default: {
      return state;
    }
  }
}

export const getIsLoading = (state: State) => state.isLoading;
