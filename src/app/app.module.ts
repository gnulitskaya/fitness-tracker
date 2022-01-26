import { TrainingService } from './training/training.service';
import { AuthService } from './auth/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignComponent } from './auth/sign/sign.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopTrainingComponent } from './training/current-training/stop-training.component';
import { AngularFireModule  } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [AuthService, TrainingService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent]
})
export class AppModule { }
