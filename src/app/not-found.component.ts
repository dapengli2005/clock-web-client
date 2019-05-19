import { Component } from '@angular/core';

@Component({
  selector: 'not-found',
  template: `
    <div class="jumbotron" style="background-color: #fff; height: calc(95vh);">
      <h3>This page does not exist...</h3>
      <p class="lead">
        <a routerLink="/">Go home</a>
      </p>
    </div>
  `
})
export class NotFoundComponent {}
