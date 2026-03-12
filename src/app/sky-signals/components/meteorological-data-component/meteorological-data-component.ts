import { Component, signal, inject, OnInit, DestroyRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Header } from '../../../shared/header/header';
import { Footer } from '../../../shared/footer/footer';
import { WeatherService } from '../../../core/services/weather-service';
import { MeteorologicalDataInterface } from '../../../core/interfaces/meteorologicalData-interface';

@Component({
  selector: 'app-meteorological-data-component',
  standalone: true,
  imports: [Header, Footer, FormsModule, CommonModule],
  templateUrl: './meteorological-data-component.html',
  styleUrl: './meteorological-data-component.css',
})
export class MeteorologicalDataComponent implements OnInit {
  private weatherService = inject(WeatherService);
  private destroyRef = inject(DestroyRef);

  // Sygnały stanu
  isLoading = signal(true);
  weatherData = signal<MeteorologicalDataInterface[]>([]);
  searchTerm = signal('');

  // Sygnał dla modala
  selectedStation = signal<MeteorologicalDataInterface | null>(null);

  // Automatyczne filtrowanie danych
  filteredWeather = computed(() => {
    const term = this.searchTerm().toLowerCase();

    return this.weatherData().filter((item) => {
      // 1. Sprawdzamy, czy kluczowe dane istnieją (nie są nullem, undefined ani pustym stringiem)
      const hasData =
        item.temperatura_powietrza !== null &&
        item.temperatura_powietrza !== undefined &&
        item.temperatura_powietrza !== '';

      // 2. Sprawdzamy, czy nazwa stacji pasuje do wyszukiwarki
      const matchesSearch = item.nazwa_stacji.toLowerCase().includes(term);

      // Stacja przechodzi tylko, jeśli ma dane I pasuje do wyszukiwania
      return hasData && matchesSearch;
    });
  });

  ngOnInit(): void {
    this.getWeatherMeteo();
  }

  getWeatherMeteo() {
    this.weatherService
      .getAllMeteorologicalData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.weatherData.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Błąd pobierania danych:', err);
          this.isLoading.set(false);
        },
      });
  }

  // Akcje wyszukiwarki i modala
  updateSearch(value: string) {
    this.searchTerm.set(value);
  }

  openDetails(station: MeteorologicalDataInterface) {
    this.selectedStation.set(station);
    // Opcjonalnie: blokada skrolowania tła
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedStation.set(null);
    document.body.style.overflow = 'auto';
  }

  getTempClass(temp: string): string {
    const t = parseFloat(temp);
    if (t <= 0) return 'bg-cold';
    if (t > 25) return 'bg-hot';
    return 'bg-moderate';
  }
}
