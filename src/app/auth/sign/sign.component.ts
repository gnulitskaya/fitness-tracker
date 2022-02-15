import { Subscription } from 'rxjs';
import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit, OnDestroy {
  maxDate = new Date();
  isLoading = false;
  private loadingSub?: Subscription;

  constructor(private authService: AuthService,
    private uiService: UIService) { }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  ngOnDestroy(): void {
    this.loadingSub?.unsubscribe();
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }

}
