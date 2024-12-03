import { Component, ViewChild } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  imports: [PopupComponent],
})
export class HeroComponent {
  images: string[] = [
    'assets/hero0.jpeg',
    'assets/hero1.jpg',
    'assets/hero2.jpeg',
  ];

  @ViewChild('popup') popup!: PopupComponent;

  openPopup() {
    this.popup.openPopup();
  }
}
