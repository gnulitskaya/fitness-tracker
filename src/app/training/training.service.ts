import { Exercise } from './exercise.module';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable()

export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[] | null>();

  constructor(private db: AngularFirestore) {}

  private availableExercises: Exercise[] = [];

  //store the exercise which the user selected
  private runningExercise?: Exercise | null;
  private exercises: Exercise[] = [];
  fetchAvailableExercises(){
    this.db
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
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises]);
    });
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

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
