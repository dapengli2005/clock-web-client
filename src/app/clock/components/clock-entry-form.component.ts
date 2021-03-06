import { Component, Input } from '@angular/core';
import * as moment from 'moment-timezone';

import { ClockEntry } from '../models/clock-entry.interface';

@Component({
  selector: 'clock-entry-form',
  styleUrls: ['./clock-entry-form.component.css'],
  template: `
    <form>
      <div class="form-group required">
        <label for="action_type">Type</label>
        <select
          class="form-control"
          name="action_type"
          (change)="onTypeChange(typeInput.value)"
          aria-describedby="actionTypeHelp"
          #typeInput
        >
          <option
            *ngFor="let allowedType of allowedTypes"
            [value]="allowedType"
            [selected]="allowedType === entry.action_type">
            {{ allowedType }}
          </option>
        </select>
        <small id="actionTypeHelp" class="form-text text-muted">Type of the event</small>
      </div>

      <div class="form-group required">
        <label for="date">Date</label>
        <input
          type="datetime-local"
          name="date"
          class="form-control"
          [ngModel]="entry.datetime | date:'yyyy-MM-ddTHH:mm'"
          (ngModelChange)="onDatetimeChange(datetimeInput.value)"
          aria-describedby="dateHelp"
          #datetimeInput>
        <small id="dateHelp" class="form-text text-muted">Date Time of the event</small>
      </div>

      <div class="form-group">
        <label for="note">Note</label>
        <textarea
          type="text"
          class="form-control"
          [value]="entry.note"
          (input)="onNoteChange(noteInput.value)"
          aria-describedby="noteHelp"
          #noteInput>
        </textarea>
        <small id="noteHelp" class="form-text text-muted">Additional note about the event</small>
      </div>
    </form>
  `
})
export class ClockEntryFormComponent {
  allowedTypes = ['IN', 'OUT'];

  @Input()
  entry: ClockEntry;

  constructor() {
  }

  onTypeChange(val: ClockEntry['action_type']) {
    this.entry.action_type = val;
  }

  onDatetimeChange(val: Date) {
    const utcDate = moment(val).utc().format();
    this.entry.datetime = utcDate;
  }

  onNoteChange(val: string) {
    this.entry.note = val;
  }
}

