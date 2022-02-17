import { UIService } from './../../shared/ui.service';
import { TrainingService } from './../training.service';
import { Exercise } from './../exercise.module';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises?: Exercise[] | null;
  exerciseSubscription?: Subscription;
  exerciseLoading?: Subscription;
  isLoading = false;

  constructor(private trainingService: TrainingService,
    private uiService: UIService) { }

  ngOnInit() {
    this.exerciseLoading = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });

    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription)
    this.exerciseSubscription?.unsubscribe();
    if (this.exerciseLoading)
    this.exerciseLoading?.unsubscribe();
  }

}
