import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.css'],
  template: `
    <footer>
      <p  class="text-xs-center">© Copyright 2019. All rights reserved.</p>
    </footer>
  `
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
