import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherApi } from './weather-api';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('sky-signals');

  private weatherService = inject(WeatherApi);

  weatherData = signal<any[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.weatherService.getAllWeather().subscribe({
      next: (data) => {
        this.weatherData.set(data); //zapisywanie danych do weatherData czyli do sygnału
        this.isLoading.set(false);
        console.log('dane załadowane', this.weatherService);
      },
      error:(err) =>{
        console.error("Błąd przy wczytywaniu danych:", err);
        this.isLoading.set(false)
      }
    });
  }
}
