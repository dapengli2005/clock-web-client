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
      <clock-entry-form [entry]="entry"></clock-entry-form>
      <button (click)="update()">Update</button>
      <button (click)="remove()">Delete</button>
    </div>
  `
})
export class EditClockEntryComponent implements OnInit {
  loading: boolean = false;
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
      });
  }

  update() {
    this.loading = true;

    this.clockService.updateEntry(this.entry)
      .subscribe(() => this.router.navigate(['/clock/history']));
  }

  remove() {
    this.loading = true;

    this.clockService.deleteEntry(this.entry)
      .subscribe(() => this.router.navigate(['/clock/history']));
  }
}

