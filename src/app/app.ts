import { Component, inject, signal } from '@angular/core';
import { WeatherApi } from './weather-api';
import { Footer } from './footer/footer';
import { Station } from './interface/station';

@Component({
  selector: 'app-root',
  imports: [Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('sky-signals');

  // private weatherService = inject(WeatherApi); sposób na wstrzyknięcie serwisu

  // poprawny sposób na wstrzyknięcie serwisu
  constructor(private weatherService: WeatherApi) {}

  weatherData = signal<any[]>([]);
  isLoading = signal(true);
  cities = signal<Station[]>([]);

  ngOnInit(): void {
    // this.weatherService.getAllWeather().subscribe({
    //   next: (data) => {
    //     this.weatherData.set(data); //zapisywanie danych do weatherData czyli do sygnału
    //     this.isLoading.set(false);
    //     console.log('dane załadowane', this.weatherService);
    //   },
    //   error:(err) =>{
    //     console.error("Błąd przy wczytywaniu danych:", err);
    //     this.isLoading.set(false)
    //   }
    // });
    this.loadCities();
  }

  loadCities() {
    this.weatherService.getAllWeather().subscribe({
      next: (data) => {
        console.log('Moje dane', data);
        this.cities.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Błąd przy wczytywaniu dannych', err);
        this.cities.set([]);
        this.isLoading.set(false);
      },
    });
  }
}
