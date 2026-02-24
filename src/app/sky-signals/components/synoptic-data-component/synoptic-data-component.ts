import { Component, signal } from '@angular/core';
import { WeatherService } from '../../../core/services/weather-service';
import { StationInterface } from '../../../core/interfaces/station-interface';
import { Header } from '../../../shared/header/header';
import { Footer } from '../../../shared/footer/footer';
import { RouterLink } from '@angular/router';
import { TemperaturePipe } from '../../../shared/pipes/temperature-pipe';

@Component({
  selector: 'app-synoptic-data-component',
  imports: [Header, Footer, RouterLink, TemperaturePipe],
  templateUrl: './synoptic-data-component.html',
  styleUrl: './synoptic-data-component.css',
})
export class SynopticDataComponent {
  // private weatherService = inject(WeatherApi); sposób na wstrzyknięcie serwisu

  // poprawny sposób na wstrzyknięcie serwisu
  constructor(private weatherService: WeatherService) {}

  weatherData = signal<any[]>([]);
  isLoading = signal(true);
  cities = signal<StationInterface[]>([]);

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
    this.weatherService.getAllSynopticData().subscribe({
      next: (data) => {
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

  getTempClass(temp: string | number) {
    const t = Number(temp);

    if (t <= -10) {
      return 'bg-ice';
    }
    if (t > -10 && t <= 0) {
      return 'bg-cold';
    }
    if (t > 0 && t <= 10) {
      return 'bg-mild';
    }
    if (t > 10 && t <= 20) {
      return 'bg-warm';
    }
    if (t > 20 && t <= 30) {
      return 'bg-got';
    }
    return 'bg-danger';
  }
}
