import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe( authStatus => {
      this.isAuth = authStatus;
    })
  }

  openSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
