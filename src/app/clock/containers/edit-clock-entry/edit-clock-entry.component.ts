import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';

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
              <button class="btn btn-primary" (click)="update()">Update</button>
              <button class="btn btn-danger" style="margin-left: 2%" (click)="remove()">Delete</button>
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
export class EditClockEntryComponent implements OnInit {
  loading: boolean = false;
  error: string;
  entry: ClockEntry;

  constructor(private clockService: ClockService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = true;

    this.route.params
      .switchMap(({ id }) => this.clockService.getEntry(id))
      .subscribe((val: ClockEntry) => {
          this.entry = val;
          this.loading = false;
        },
        this.handleRequestError.bind(this));
  }

  update() {
    this.loading = true;
    this.error = null;

    this.clockService.updateEntry(this.entry)
      .subscribe(() => this.router.navigate(['/clock/history']),
        this.handleRequestError.bind(this));
  }

  remove() {
    this.loading = true;
    this.error = null;

    this.clockService.deleteEntry(this.entry)
      .subscribe(() => this.router.navigate(['/clock/history']),
        this.handleRequestError.bind(this));
  }

  handleRequestError(resp: any) {
    this.error = (resp && resp.error && resp.error.message) || 'The operation cannot be performed.';
    this.loading = false;
  }
}

