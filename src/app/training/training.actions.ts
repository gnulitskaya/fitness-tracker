import { Action } from '@ngrx/store';
import {Exercise} from "./exercise.module";

//описание действий
export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Training';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Training';
export const START_TRAININGS = '[Training] Start Training';
export const STOP_TRAININGS = '[Training] Stop Training';

//классы действий
export class SetAvailableTraining implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;

  constructor(public payload: Exercise[]) {

  }
}

export class SetFinishedTraining implements Action {
  readonly type = SET_FINISHED_TRAININGS;

  constructor(public payload: Exercise[]) {

  }
}

export class StartTraining implements Action {
  readonly type = START_TRAININGS;

  constructor(public payload: Exercise[]) {

  }
}

export class StopTraining implements Action {
  readonly type = STOP_TRAININGS;
}

//смешанный тип для краткости записи типа в редюсере
export type TrainingActions = SetAvailableTraining | SetFinishedTraining | StartTraining | StopTraining;
