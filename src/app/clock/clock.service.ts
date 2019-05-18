import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { User } from '../models/user.interface';
import { UserService } from '../user.service';
import { API_BASE } from '../constants';

import { ClockEntry } from './models/clock-entry.interface';
import { PaginatedClockEntries, PaginationMeta } from './models/paginated-clock-entries.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

const NEXT_ENTRY_URL: string = `${API_BASE}/users/:user_id/clock_entries/next`;
const REGISTER_ENTRY_URL: string = `${API_BASE}/users/:user_id/clock_entries`;
const GET_ENTRIES_URL: string = `${API_BASE}/users/:user_id/clock_entries`;
const GET_ENTRY_URL: string = `${API_BASE}/users/:user_id/clock_entries/:id`;
const UPDATE_ENTRY_URL: string = `${API_BASE}/users/:user_id/clock_entries/:id`;
const DELETE_ENTRY_URL: string = `${API_BASE}/users/:user_id/clock_entries/:id`;
const CREATE_ENTRY_URL: string = `${API_BASE}/users/:user_id/clock_entries`;

@Injectable()
export class ClockService {
  constructor(private httpClient: HttpClient, private userService: UserService) {}

  getNext(): Observable<ClockEntry> {
    const url = NEXT_ENTRY_URL.replace(':user_id', `${this.userService.getUser().id}`);
    return this.httpClient
      .get<ClockEntry>(url)
      .catch((error: any) => Observable.throw(error.json()));
  }

  registerEntry(entry: ClockEntry): Observable<ClockEntry> {
    const url = REGISTER_ENTRY_URL.replace(':user_id', `${this.userService.getUser().id}`);
    return this.httpClient
      .post<ClockEntry>(url, entry)
      .catch((error: any) => Observable.throw(error.json()));
  }

  getEntries(): Observable<PaginatedClockEntries> {
    const url = GET_ENTRIES_URL.replace(':user_id', `${this.userService.getUser().id}`);
    return this.httpClient
      .get<PaginatedClockEntries>(url)
      .catch((error: any) => Observable.throw(error.json()));
  }

  getEntriesBy({ url, method }: PaginationMeta): Observable<PaginatedClockEntries> {
    return this.httpClient
      .request<PaginatedClockEntries>(method, url)
      .catch((error: any) => Observable.throw(error.json()));
  }

  getEntry(id: number): Observable<ClockEntry> {
    const url = GET_ENTRY_URL.replace(':user_id', `${this.userService.getUser().id}`)
                             .replace(':id', `${id}`);

    return this.httpClient
      .get<ClockEntry>(url)
      .catch((error: any) => Observable.throw(error.json()));
  }

  updateEntry(entry: ClockEntry): Observable<ClockEntry> {
    const url = UPDATE_ENTRY_URL.replace(':user_id', `${this.userService.getUser().id}`)
                                .replace(':id', `${entry.id}`);

    return this.httpClient
      .put<ClockEntry>(url, entry)
      .catch((error: any) => Observable.throw(error.json()));
  }

  deleteEntry(entry: ClockEntry): Observable<ClockEntry> {
    const url = DELETE_ENTRY_URL.replace(':user_id', `${this.userService.getUser().id}`)
                                .replace(':id', `${entry.id}`);

    return this.httpClient
      .delete<ClockEntry>(url)
      .catch((error: any) => Observable.throw(error.json()));
  }

  createEntry(entry: ClockEntry): Observable<ClockEntry> {
    const userId = this.userService.getUser().id;
    const url = CREATE_ENTRY_URL.replace(':user_id', `${userId}`);

    return this.httpClient
      .post<ClockEntry>(url, {
        ...entry,
        user_id: userId
      })
      .catch((error: any) => Observable.throw(error.json()));
  }
}

