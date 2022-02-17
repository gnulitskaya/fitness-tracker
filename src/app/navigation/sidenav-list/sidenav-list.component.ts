import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter<void>();
  authSubscription!: Subscription;
  isAuth: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe( authState => {
      this.isAuth = authState;
    })
  }

  onClose() {
    this.sidenavClose.emit();
  }

  ngOnDestroy() {
    if (this.authSubscription)
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.onClose();
  }

}
