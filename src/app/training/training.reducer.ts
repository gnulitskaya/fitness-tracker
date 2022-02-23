import {
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAININGS,
  STOP_TRAININGS,
  TrainingActions
} from './training.actions';
import {Exercise} from "./exercise.module";
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  availableExercises: Exercise[],
  finishedExercises: Exercise[],
  activeTraining: Exercise,
}

//our app state doesnt know about the training state,
// but the training state knows about the app state
//when we load module lazily it will merge
export interface State extends fromRoot.State{
  training: TrainingState
}

//create a start state
const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
}

//dispatch actions to change the store
export function trainingReducer(state = initialState, action: TrainingActions) {
  //return a new state - return state;
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        //distribute the old state properties
        ...state,
        //override whta you have to change
        availableExercises: action.payload
      }
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      }
    case START_TRAININGS:
      return {
        ...state,
        activeTraining: {...state.availableExercises.find(ex => ex.id === action.payload)}
      }
    case STOP_TRAININGS:
      return {
        ...state,
        activeTraining: null
      }
    default: {
      return state;
    }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);
