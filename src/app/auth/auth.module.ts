import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [SignComponent,
    LoginComponent],
  imports: [CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  FlexLayoutModule,
  AngularFireAuthModule],
  exports: []
})

export class AuthModule {}
