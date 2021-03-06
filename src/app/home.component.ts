import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { User } from './models/user.interface';

@Component({
  selector: 'app-home',
  template: `
    <div class="loader" *ngIf="loading"></div>
    <div class="container" style="margin-top: 70px;" *ngIf="!loading">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <h3>Login to start</h3>
          <div>
            <form>
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  [value]="username"
                  (input)="onNameChange(nameInput.value)"
                  aria-describedby="usernameHelp"
                  #nameInput>
                <small id="usernameHelp" class="form-text text-muted">A new user will be created the first time you login</small>
                <button type="button" class="btn btn-primary" [disabled]="!username" (click)="login()">
                  Login
                </button>
              </div>
              <div class="alert alert-danger mt-3" role="alert" *ngIf="error">
                {{this.error}}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  username: string = '';
  error: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    if (this.userService.getUser()) {
      this.router.navigate(['/clock']);
    }
  }

  onNameChange(value) {
    this.username = value;
  }

  login() {
    this.loading = true;

    this.userService
      .login(this.username)
      .subscribe((user: User) => this.router.navigate(['/clock']),
        this.handleRequestError.bind(this));
  }

  handleRequestError(resp: any) {
    this.error = (resp && resp.error && resp.error.message) || 'The operation cannot be performed.';
    this.loading = false;
  }
}
