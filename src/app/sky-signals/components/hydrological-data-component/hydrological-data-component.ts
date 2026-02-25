import { HydrologicalDataInterface } from './../../../core/interfaces/hydrologicalData-interface';
import { Component, computed, signal } from '@angular/core';
import { Header } from '../../../shared/header/header';
import { Footer } from '../../../shared/footer/footer';
import { WeatherService } from '../../../core/services/weather-service';
import { CommonModule, DatePipe } from '@angular/common';
import { groupBy } from 'rxjs';

@Component({
  selector: 'app-hydrological-data-component',
  imports: [Header, Footer, DatePipe, CommonModule],
  templateUrl: './hydrological-data-component.html',
  styleUrl: './hydrological-data-component.css',
})
export class HydrologicalDataComponent {
  constructor(private weatherService: WeatherService) {}

  isLoading = signal(true);
  weatherData = signal<HydrologicalDataInterface[]>([]);

  ngOnInit() {
    this.getWeatherHydro();
  }

  getWeatherHydro() {
    this.weatherService.getAllHydrologicalData().subscribe({
      next: (data) => {
        this.weatherData.set(data);
        this.isLoading.set(false);
        console.log('Dane pogrupowane:', this.newFilterHydroData());
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
      },
    });
  }

  newFilterHydroData = computed(() => {
    const daneHydro = this.weatherData();
    const grupy: Record<string, HydrologicalDataInterface[]> = {};

    daneHydro.forEach((stacja) => {
      const woj = stacja.wojewodztwo || 'Nieokreślone';
      if (!grupy[woj]) {
        grupy[woj] = [];
      }
      grupy[woj].push(stacja);
    });

    return Object.keys(grupy)
      .sort((a, b) => a.localeCompare(b, 'pl'))
      .map((nazwaWoj) => ({
        wojewodztwo: nazwaWoj,
        stacje: grupy[nazwaWoj],
        ostatniaData: grupy[nazwaWoj][0]?.stan_wody_data_pomiaru,
        // Dodajemy sygnał sterujący widocznością dla każdego województwa z osobna
        pokazuj: signal(false),
      }));
  });
}
