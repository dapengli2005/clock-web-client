import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClockEntry } from '../../models/clock-entry.interface';
import { ClockService } from '../../clock.service';

@Component({
  selector: 'clock-in-out',
  template: `
    <div class="loader" *ngIf="loading"></div>
    <div class="container" style="margin-top: 70px;" *ngIf="!loading">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div>
            <form>
              <div class="form-group">
                <label for="note">Note (optional)</label>
                <textarea
                  type="text"
                  class="form-control"
                  [value]="note"
                  (input)="onNoteChange(noteInput.value)"
                  aria-describedby="noteHelp"
                  #noteInput>
                </textarea>
                <small id="noteHelp" class="form-text text-muted">Additional note about the Clock In/Out action</small>

                <button type="button" class="btn btn-primary" (click)="handleClick()">Clock {{nextEntry.action_type}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
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

