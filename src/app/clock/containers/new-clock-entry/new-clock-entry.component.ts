import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClockService } from '../../clock.service';
import { ClockEntry } from '../../models/clock-entry.interface';

@Component({
  selector: 'edit-clock-entry',
  template: `
    <div class="loader" *ngIf="loading"></div>
    <div *ngIf="!loading">
      <div class="container" style="margin-top: 70px;">
        <div class="row">
          <div class="col-sm-8 offset-sm-2">
            <div>
              <clock-entry-form [entry]="entry"></clock-entry-form>
              <button class="btn btn-primary" (click)="create()">Create</button>
            </div>
            <div class="alert alert-danger mt-3" role="alert" *ngIf="error">
              {{this.error}}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NewClockEntryComponent {
  loading: boolean = false;
  error: string;
  entry: ClockEntry;

  constructor(private clockService: ClockService, private router: Router) {
    this.entry = {
      action_type: 'IN',
      datetime: new Date(),
      note: ''
    };
  }

  create() {
    this.loading = true;

    this.clockService.createEntry(this.entry)
      .subscribe(() => this.router.navigate(['/clock/history']),
        this.handleRequestError.bind(this));
  }

  handleRequestError(resp: any) {
    this.error = (resp && resp.error && resp.error.message) || 'The operation cannot be performed.';
    this.loading = false;
  }
}

