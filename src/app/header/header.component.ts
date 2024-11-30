import { Component } from '@angular/core';
import { environment } from '../../../common.constant';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title: string = environment.homeTitle;

  constructor() {
    console.log(this.title);
  }
}
