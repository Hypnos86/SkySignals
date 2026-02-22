import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  title: string = 'Sky Signals';

  isMenuOpen = signal(false);

  // Funkcja zamykająca menu po kliknięciu w link (dobra praktyka na mobile)
  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
