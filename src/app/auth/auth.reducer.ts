import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';

export interface State {
  isAuthenticated: boolean
}

//create a start state
const initialState: State = {
  isAuthenticated: false
}

//dispatch actions to change the store
export function authReducer(state = initialState, action: AuthActions) {
  //return a new state - return state;
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      }
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      }
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
