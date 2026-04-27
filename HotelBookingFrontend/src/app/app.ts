import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Authservice } from '../core/services/authservice';
import { Footer } from "../shared/components/footer/footer";
import { Navbar } from "../shared/components/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('HotelBookingFrontend');
   constructor() {
    inject(Authservice).checksession();  // restores login state on every page refresh
  }
}
