import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-admin-main-page',
  imports: [MatButtonModule],
  templateUrl: './admin-main-page.component.html',
  styleUrl: './admin-main-page.component.css'
})
export class AdminMainPageComponent {
  constructor() {}
}
