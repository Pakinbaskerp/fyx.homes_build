import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {
  images: string[] = [
    'assets/hero0.jpeg',
    'assets/hero1.jpg',
    'assets/hero2.jpeg',
  ];
}
