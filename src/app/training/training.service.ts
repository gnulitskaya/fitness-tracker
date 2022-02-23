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
  constructor(private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>) {}

  private fbSubs: Subscription[] = [];

  fetchAvailableExercises(){
    this.store.dispatch(new UI.StartLoading);
    this.fbSubs.push(this.db
    .collection('availableExercises')
    .snapshotChanges()
    .pipe(
      map(docArray => {
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
      this.store.dispatch(new UI.StopLoading);
      this.store.dispatch(new Training.SetAvailableTraining(exercises));
    }, error => {
      this.store.dispatch(new UI.StopLoading);
      this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
    }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {

      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed',
      });
    this.store.dispatch(new Training.StopTraining());
  });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
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
    .subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new Training.SetFinishedTraining(exercises));
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
