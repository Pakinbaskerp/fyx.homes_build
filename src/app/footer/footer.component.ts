import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(private router : Router){}
  goToService(){
    this.router.navigate(['/service']);
  }
  goToHome(){
    this.router.navigate(['/dashboard']);
  }
  goToAbout(){
    this.router.navigate(['/about']);
  }
  goToContact(){
    this.router.navigate(['/contact']);
  }
}
