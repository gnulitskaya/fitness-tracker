import { UIService } from './../shared/ui.service';
import { Exercise } from './exercise.module';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import * as UI from '../shared/ui.actions';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import { Store } from '@ngrx/store';

@Injectable()

export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[] | null>();
  finishedExercisesChanged = new Subject<Exercise[] | null>();

  constructor(private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>) {}

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
      // this.availableExercises = exercises;
      // this.exercisesChanged.next([...this.availableExercises]);
      this.store.dispatch(new Training.SetAvailableTraining(exercises));
    }, error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading);
      this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
      this.exercisesChanged.next(null);
    }));
  }

  startExercise(selectedId: string) {
    // this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    // if(this.runningExercise) {
    //   this.exerciseChanged.next({...this.runningExercise});
    // }
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveExercises).pipe(take(1)).subscribe(ex => {

      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed',
      });

    // this.runningExercise = null;
    // this.exerciseChanged.next(null);
    this.store.dispatch(new Training.StopTraining());
  });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveExercises).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
    .collection('finishedExercises')
    .valueChanges()
    .subscribe((exercises) => {
      // this.finishedExercisesChanged.next(exercises as Exercise[]);
      this.store.dispatch(new Training.SetFinishedTraining(exercises as Exercise[]));
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
