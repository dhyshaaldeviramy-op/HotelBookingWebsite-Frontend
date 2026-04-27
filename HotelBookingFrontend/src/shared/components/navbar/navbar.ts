import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';          // ← add RouterLink
import { Authservice } from '../../../core/services/authservice';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],                 // ← replace FormsModule with RouterLink
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  auth = inject(Authservice);
}