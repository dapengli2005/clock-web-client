import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';
import { UserService } from '../user.service';

interface Nav {
  link: string,
  name: string,
  exact: boolean
}

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  template: `
    <nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
      <a class="navbar-brand" href="#">Clock Me</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse" *ngIf="user()">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" *ngFor="let item of nav">
            <a class="nav-link"
              [routerLink]="item.link"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: item.exact }">
              {{ item.name }}
            </a>
          </li>
        </ul>
        <ul class="nav navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" (click)="logout($event)">Logoff {{user().username}}</a>
          </li>
        </ul>
      </div>
    </nav>
  `,
})
export class HeaderComponent {
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
