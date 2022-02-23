import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { TrainingService } from './../training.service';
import { Exercise } from './../exercise.module';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  // private exChangedSubscription?: Subscription;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private trainingService: TrainingService,
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
    // this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises) => {
    //   this.dataSource.data = exercises as Exercise[];
    // })
    this.store.select(fromTraining.getFinishedExercises).subscribe((exercises) => {
      this.dataSource.data = exercises as Exercise[];
    })
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(): void {
    if(this.sort) {
      this.dataSource.sort = this.sort;
    }
    if(this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
