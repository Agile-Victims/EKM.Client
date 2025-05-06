import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgOptimizedImage, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  currentLanguage: string = '';
  isLoggedIn: boolean = false;
  isDropdownVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
      console.log(this.isLoggedIn)
    });
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.toggleDropdown();
  }
}
