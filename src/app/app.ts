import { Component, signal } from '@angular/core';
import { WeatherService } from './core/services/weather-service';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Station } from './core/interfaces/station-interface';

@Component({
  selector: 'app-root',
  imports: [Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('sky-signals');

  // private weatherService = inject(WeatherApi); sposób na wstrzyknięcie serwisu

  // poprawny sposób na wstrzyknięcie serwisu
  constructor(private weatherService: WeatherService) {}

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
