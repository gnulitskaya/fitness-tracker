import {Observable, Subscription} from 'rxjs';
import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Store} from "@ngrx/store";
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    // this.store.subscribe(data => {
    //   console.log(data)
    // })
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.isLoading$ = this.store.pipe(
    //   map(state => state.ui.isLoading)
    // );
    //subscribe to loading state changed listener
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // });
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    // console.log(this.loginForm)
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }

  // ngOnDestroy(): void {
  //   if (this.loadingSubs)
  //   this.loadingSubs?.unsubscribe();
  // }


}
