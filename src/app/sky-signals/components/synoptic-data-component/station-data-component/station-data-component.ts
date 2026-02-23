import { Header } from './../../../../shared/header/header';
import { Component, input, signal } from '@angular/core';
import { WeatherService } from '../../../../core/services/weather-service';
import { WeatherDataInterface } from '../../../../core/interfaces/weatherData-interface';
import { DatePipe } from '@angular/common';
import { HumidityPipe } from '../../../../shared/pipes/humidity-pipe';
import { PressurePipe } from '../../../../shared/pipes/pressure-pipe';
import { PrecipitationPipe } from '../../../../shared/pipes/precipitation-pipe';
import { WinterSpeedPipe } from '../../../../shared/pipes/winter-speed-pipe';
import { WindDirectionPipe } from '../../../../shared/pipes/wind-direction-pipe';
import { Footer } from '../../../../shared/footer/footer';
import { TemperaturePipe } from '../../../../shared/pipes/temperature-pipe';

@Component({
  selector: 'app-station-data-component',
  imports: [Header, DatePipe, HumidityPipe,PressurePipe, PrecipitationPipe, WinterSpeedPipe, WindDirectionPipe, TemperaturePipe, Footer],
  templateUrl: './station-data-component.html',
  styleUrl: './station-data-component.css',
})
export class StationDataComponent {
  constructor(private weatherService: WeatherService) {}

  id = input.required<string>();
  stationData = signal<WeatherDataInterface | null>(null);
  isLoading = signal(true);

  ngOnInit(): void {
    this.getWeatherInfo();
  }

  getWeatherInfo() {
    this.weatherService.getSynopticDataByStationId(this.id()).subscribe({
      next: (data) => {
        Promise.resolve().then(() => {
          this.stationData.set(data);
          console.log(this.stationData());
          this.isLoading.set(false);
        });
      },
      error: (err) => {
        console.error(err);
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
