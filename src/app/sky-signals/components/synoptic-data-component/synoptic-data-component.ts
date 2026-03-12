import { Component, signal, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../../core/services/weather-service';
import { WeatherDataInterface } from '../../../core/interfaces/weatherData-interface';
import { Header } from '../../../shared/header/header';
import { Footer } from '../../../shared/footer/footer';
import { TemperaturePipe } from '../../../shared/pipes/temperature-pipe';

@Component({
  selector: 'app-synoptic-data-component',
  standalone: true,
  imports: [Header, Footer, TemperaturePipe, FormsModule, CommonModule],
  templateUrl: './synoptic-data-component.html',
  styleUrl: './synoptic-data-component.css',
})
export class SynopticDataComponent implements OnInit {
  private weatherService = inject(WeatherService);

  cities = signal<WeatherDataInterface[]>([]);
  isLoading = signal(true);
  searchTerm = signal('');
  selectedCity = signal<WeatherDataInterface | null>(null);

  // Filtrowanie i sortowanie danych
  filteredCities = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.cities()
      .filter((city) => {
        const hasTemp = city.temperatura !== null && city.temperatura !== '';
        const matchesSearch = city.stacja.toLowerCase().includes(term);
        return hasTemp && matchesSearch;
      })
      .sort((a, b) => a.stacja.localeCompare(b.stacja));
  });

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.weatherService.getAllSynopticData().subscribe({
      next: (data) => {
        this.cities.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Błąd:', err);
        this.isLoading.set(false);
      },
    });
  }

  openModal(city: WeatherDataInterface) {
    this.selectedCity.set(city);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedCity.set(null);
    document.body.style.overflow = 'auto';
  }

  getTempClass(temp: string | number): string {
    const t = Number(temp);
    if (t <= -10) return 'temp-ice';
    if (t <= 0) return 'temp-cold';
    if (t <= 10) return 'temp-mild';
    if (t <= 20) return 'temp-warm';
    if (t <= 30) return 'temp-hot';
    return 'temp-extreme';
  }
}
