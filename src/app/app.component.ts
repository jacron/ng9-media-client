import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appTitle = 'media-client';
  darkOn = false;
  // mobileQuery: MediaQueryList;

  setDarkOn(e) {
    this.darkOn = e;
  }}
