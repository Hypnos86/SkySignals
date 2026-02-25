import { Component, signal } from '@angular/core';
import { WeatherService } from '../../../core/services/weather-service';
import { WarningHydroInterface } from '../../../core/interfaces/warningHydro-interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-warning-hydrological-data-component',
  imports: [DatePipe],
  templateUrl: './warning-hydrological-data-component.html',
  styleUrl: './warning-hydrological-data-component.css',
})
export class WarningHydrologicalDataComponent {
  constructor(private weatherService: WeatherService) {}
  warningData = signal<WarningHydroInterface[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.getWeatherHydro();
  }

  getWeatherHydro() {
    this.weatherService.getWarningHydrologicalInformation().subscribe({
      next: (data) => {
        this.warningData.set(data);
        console.log(this.warningData, 'tutaj');
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err)
        this.isLoading.set(false);
      },
    });
  }
}
