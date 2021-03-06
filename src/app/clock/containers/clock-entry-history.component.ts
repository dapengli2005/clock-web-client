import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClockService } from '../clock.service';

import { PaginatedClockEntries, PaginationMeta } from '../models/paginated-clock-entries.interface';

@Component({
  selector: 'clock-entry-history',
  styleUrls: ['clock-entry-history.component.css'],
  template: `
    <div class="loader" *ngIf="loading"></div>
    <div class="container" style="margin-top: 70px;" *ngIf="!loading && paginatedEntries">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Date</th>
            <th>Note</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let entry of paginatedEntries.data">

            <td>{{ entry.id }}</td>
            <td>{{ entry.action_type }}</td>
            <td>{{ entry.datetime | date:'medium' }}</td>
            <td class="note">{{ entry.note }}</td>
            <td>
              <a href="#" class="btn btn-primary" (click)="onEdit($event, entry.id)">Edit</a>
            </td>
          </tr>
          <a href="#" *ngIf="paginatedEntries.meta?.prev" (click)="goTo($event, paginatedEntries.meta.prev)">prev </a>
          <a href="#" *ngIf="paginatedEntries.meta?.next" (click)="goTo($event, paginatedEntries.meta.next)"> next</a>
        </tbody>
      </table>
    </div>
    <div class="alert alert-danger mt-3" role="alert" *ngIf="error">
      {{this.error}}
    </div>
  `
})
export class ClockEntryHistoryComponent implements OnInit {
  loading: boolean = false;
  error: string;
  paginatedEntries: PaginatedClockEntries;

  constructor(private clockService : ClockService, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;

    this.clockService.getEntries()
      .subscribe(val => {
          this.paginatedEntries = val;
          this.loading = false;
        },
        this.handleRequestError.bind(this));
  }

  goTo(e, paginationMeta: PaginationMeta) {
    e.preventDefault();

    this.loading = true;

    this.clockService.getEntriesBy(paginationMeta)
      .subscribe(val => {
          this.paginatedEntries = val;
          this.loading = false;
        },
        this.handleRequestError.bind(this));
  }

  onEdit(e, id: number) {
    e.preventDefault();
    this.router.navigate([`/clock/edit/${id}`]);
  }

  handleRequestError(resp: any) {
    this.error = (resp && resp.error && resp.error.message) || 'The operation cannot be performed.';
    this.loading = false;
  }
}

