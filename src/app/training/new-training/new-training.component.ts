import { TrainingService } from './../training.service';
import { Exercise } from './../exercise.module';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises?: Observable<Exercise[]>;

  constructor(private trainingService: TrainingService,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.exercises = this.db
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
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
