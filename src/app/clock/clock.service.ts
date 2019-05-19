import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { User } from '../models/user.interface';
import { UserService } from '../user.service';
import { API_BASE } from '../constants';

import { ClockEntry } from './models/clock-entry.interface';
import { PaginatedClockEntries, PaginationMeta } from './models/paginated-clock-entries.interface';

import { Observable } from 'rxjs/Observable';

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
      .get<ClockEntry>(url);
  }

  registerEntry(entry: ClockEntry): Observable<ClockEntry> {
    const url = REGISTER_ENTRY_URL.replace(':user_id', `${this.userService.getUser().id}`);
    return this.httpClient
      .post<ClockEntry>(url, entry);
  }

  getEntries(): Observable<PaginatedClockEntries> {
    const url = GET_ENTRIES_URL.replace(':user_id', `${this.userService.getUser().id}`);
    return this.httpClient
      .get<PaginatedClockEntries>(url);
  }

  getEntriesBy({ url, method }: PaginationMeta): Observable<PaginatedClockEntries> {
    return this.httpClient
      .request<PaginatedClockEntries>(method, url);
  }

  getEntry(id: number): Observable<ClockEntry> {
    const url = GET_ENTRY_URL.replace(':user_id', `${this.userService.getUser().id}`)
                             .replace(':id', `${id}`);

    return this.httpClient
      .get<ClockEntry>(url);
  }

  updateEntry(entry: ClockEntry): Observable<ClockEntry> {
    const url = UPDATE_ENTRY_URL.replace(':user_id', `${this.userService.getUser().id}`)
                                .replace(':id', `${entry.id}`);

    return this.httpClient
      .put<ClockEntry>(url, entry);
  }

  deleteEntry(entry: ClockEntry): Observable<ClockEntry> {
    const url = DELETE_ENTRY_URL.replace(':user_id', `${this.userService.getUser().id}`)
                                .replace(':id', `${entry.id}`);

    return this.httpClient
      .delete<ClockEntry>(url);
  }

  createEntry(entry: ClockEntry): Observable<ClockEntry> {
    const userId = this.userService.getUser().id;
    const url = CREATE_ENTRY_URL.replace(':user_id', `${userId}`);

    return this.httpClient
      .post<ClockEntry>(url, {
        ...entry,
        user_id: userId
      });
  }
}

