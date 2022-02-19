import { UIService } from './../shared/ui.service';
import { Exercise } from './exercise.module';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import * as UI from '../shared/ui.actions';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';

@Injectable()

export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[] | null>();
  finishedExercisesChanged = new Subject<Exercise[] | null>();

  constructor(private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromRoot.State>) {}

  private availableExercises: Exercise[] = [];

  //store the exercise which the user selected
  private runningExercise?: Exercise | null;
  private fbSubs: Subscription[] = [];

  fetchAvailableExercises(){
    this.store.dispatch(new UI.StartLoading);
    // this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(this.db
    .collection('availableExercises')
    .snapshotChanges()
    .pipe(
      map(docArray => {
        //throw(new Error());
        return docArray.map(doc => {
          return {
            ...doc.payload.doc.data() as Exercise,
            id: doc.payload.doc.id
          };
        });
      })
    )
    .subscribe((exercises: Exercise[]) => {
      console.log(exercises)
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading);
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises]);
    }, error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading);
      this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
      this.exercisesChanged.next(null);
    }));
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    if(this.runningExercise) {
      this.exerciseChanged.next({...this.runningExercise});
    }
  }

  completeExercise() {
    if(this.runningExercise) {
      this.addDataToDatabase({
        ...this.runningExercise,
        date: new Date(),
        state: 'completed'
      });
    }

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    if(this.runningExercise) {
      this.addDataToDatabase({
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
    }

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
    .collection('finishedExercises')
    .valueChanges()
    .subscribe((exercises) => {
      this.finishedExercisesChanged.next(exercises as Exercise[]);
    }));
    }

    cancelSubscription() {
      this.fbSubs.forEach(sub => {
        sub.unsubscribe();
      })
    }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
