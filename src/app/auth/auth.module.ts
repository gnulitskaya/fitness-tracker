import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
  declarations: [
    SignComponent,
    LoginComponent],
  imports: [
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule,
    AuthRoutingModule],
  exports: []
})

export class AuthModule {}
