import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './models/user.interface';
import { API_BASE } from './constants';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

const LOGIN_URL: string = `${API_BASE}/users/login`;

@Injectable()
export class UserService {
  user: User;
  constructor(private httpClient: HttpClient) {}

  login(username: string): Observable<User> {
    const body = { username };
    return this.httpClient
      .post<User>(LOGIN_URL, body)
      .map((user: User) => {
        this.user = user;
        return this.user;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  logout(): Observable<User> {
    this.user = null;
    return Observable.of(this.user);
  }

  getUser(): User {
    return this.user;
  }
}

