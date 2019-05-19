import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClockEntry } from '../../models/clock-entry.interface';
import { ClockService } from '../../clock.service';

@Component({
  selector: 'clock-in-out',
  template: `
    <div class="loader" *ngIf="loading"></div>
    <div *ngIf="!loading">
      <span>Note: </span>
      <input
        type="text"
        [value]="note"
        (input)="onNoteChange(noteInput.value)"
        #noteInput>
        <button (click)="handleClick()">Clock {{nextEntry.action_type}}</button>
    </div>
  `
})
export class ClockInOutComponent implements OnInit {
  loading: boolean = false;
  note: string = '';
  nextEntry: ClockEntry;

  constructor(private clockService : ClockService, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;

    this.clockService.getNext()
      .subscribe((val: ClockEntry) => {
        this.nextEntry = val;
        this.loading = false;
      });
  }

  onNoteChange(val) {
    this.note = val;
  }

  handleClick() {
    const entry = {
      ...this.nextEntry,
      note: this.note
    };

    this.loading = true;

    this.clockService.registerEntry(entry)
      .subscribe(() => this.router.navigate(['/clock/history']));
  }
}

