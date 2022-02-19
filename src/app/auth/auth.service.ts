import { UIService } from './../shared/ui.service';
import { TrainingService } from './../training/training.service';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Store} from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()

export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
              private store: Store<fromRoot.State>) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscription;
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    })
  }

  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    //dispatch the action when we start loading
    // this.store.dispatch({type: 'START_LOADING'});
    this.store.dispatch(new UI.StartLoading);
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
    })
    .catch(error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(error.message, null, 3000);
    })
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // }
    // this.authSuccessfully();
  }

  login(authData: AuthData) {
    //indicate we started loading
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading);
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      //also emit an event once we're done
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
    })
    .catch(error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(error.message, null, 3000);
    })
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // }
    // this.authSuccessfully();
  }

  logout() {
    this.afAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
