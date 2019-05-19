import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.interface';
import { UserService } from './user.service';

interface Nav {
  link: string,
  name: string,
  exact: boolean
}

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">
      <nav *ngIf="user()" class="nav">
        <a
          *ngFor="let item of nav"
          [routerLink]="item.link"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: item.exact }">
          {{ item.name }}
        </a>
      </nav>
      <div *ngIf="user()">
        Hello {{user().username}}.
        <a href="#" (click)="logout($event)">log out</a>
      </div>
      <app-header></app-header>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `
})
@Injectable()
export class AppComponent {
  nav: Nav[] = [
    {
      link: '/clock',
      name: 'Clock',
      exact: true
    },
    {
      link: '/clock/history',
      name: 'History',
      exact: true
    },
    {
      link: '/clock/new',
      name: 'New',
      exact: true
    }
  ];

  constructor(private userService: UserService, private router: Router) {
  }

  user() {
    return this.userService.getUser();
  }

  logout(e) {
    e.preventDefault();
    this.userService
      .logout()
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
