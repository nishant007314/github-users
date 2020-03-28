import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../_animations/fade-in';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class HomeComponent {
  hover = false;
  constructor() { }
}
