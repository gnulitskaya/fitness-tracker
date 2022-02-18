export interface State {
  isLoading: boolean;
}
//create a start state
const initialState: State = {
  isLoading: false
}

//dispatch actions to change the store
export function appReducer(state = initialState, action: any) {
//return a new state - return state;
  switch (action.type) {
    case 'START_LOADING':
      return {
        isLoading: true
      };
    case 'STOP_LOADING':
      return {
        isLoading: false
      }
    default:
      return state;
  }
}
