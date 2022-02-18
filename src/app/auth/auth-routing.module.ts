import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SignComponent} from "./sign/sign.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: 'sign', component: SignComponent },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {}
