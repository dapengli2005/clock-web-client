import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_BASE } from '../constants';

import { User } from '../models/user.interface';
import { UserService } from '../user.service';

import { ClockEntry } from './models/clock-entry.interface';
import { PaginatedClockEntries, PaginationMeta } from './models/paginated-clock-entries.interface';

const NEXT_ENTRY_URL = `${API_BASE}/users/:user_id/clock_entries/next`;
const ENTRIES_URL = `${API_BASE}/users/:user_id/clock_entries`;
const SINGLE_ENTRY_URL = `${API_BASE}/users/:user_id/clock_entries/:id`;

@Injectable()
export class ClockService {
  constructor(private httpClient: HttpClient, private userService: UserService) {}

  getNext(): Observable<ClockEntry> {
    const url = NEXT_ENTRY_URL.replace(':user_id', `${this.userId()}`);

    return this.httpClient
      .get<ClockEntry>(url);
  }

  registerEntry(entry: ClockEntry): Observable<ClockEntry> {
    const url = ENTRIES_URL.replace(':user_id', `${this.userId()}`);

    return this.httpClient
      .post<ClockEntry>(url, entry);
  }

  getEntries(): Observable<PaginatedClockEntries> {
    const url = ENTRIES_URL.replace(':user_id', `${this.userId()}`);

    return this.httpClient
      .get<PaginatedClockEntries>(url);
  }

  getEntriesBy({ url, method }: PaginationMeta): Observable<PaginatedClockEntries> {
    return this.httpClient
      .request<PaginatedClockEntries>(method, url);
  }

  getEntry(id: number): Observable<ClockEntry> {
    const url = SINGLE_ENTRY_URL.replace(':user_id', `${this.userId()}`)
                                .replace(':id', `${id}`);

    return this.httpClient
      .get<ClockEntry>(url);
  }

  updateEntry(entry: ClockEntry): Observable<ClockEntry> {
    const url = SINGLE_ENTRY_URL.replace(':user_id', `${this.userId()}`)
                                .replace(':id', `${entry.id}`);

    return this.httpClient
      .put<ClockEntry>(url, entry);
  }

  deleteEntry(entry: ClockEntry): Observable<ClockEntry> {
    const url = SINGLE_ENTRY_URL.replace(':user_id', `${this.userId()}`)
                                .replace(':id', `${entry.id}`);

    return this.httpClient
      .delete<ClockEntry>(url);
  }

  createEntry(entry: ClockEntry): Observable<ClockEntry> {
    const userId = this.userService.getUser().id;
    const url = ENTRIES_URL.replace(':user_id', `${userId}`);

    return this.httpClient
      .post<ClockEntry>(url, {
        ...entry,
        user_id: userId
      });
  }

  userId(): number {
    return this.userService.getUser().id;
  }
}

