import { DatePipe } from '@angular/common';
import { Footer } from '../shared/footer/footer';
import { Header } from '../shared/header/header';
import { HumidityPipe } from '../shared/pipes/humidity-pipe';
import { TemperaturePipe } from '../shared/pipes/temperature-pipe';
import { WeatherDataInterface } from './../core/interfaces/weatherData-interface';
import { WeatherService } from './../core/services/weather-service';
import { Component, input, OnInit, signal } from '@angular/core';
import { PressurePipe } from '../shared/pipes/pressure-pipe';
import { WinterSpeedPipe } from '../shared/pipes/winter-speed-pipe';
import { WindDirectionPipe } from '../shared/pipes/wind-direction-pipe';
import { PrecipitationPipe } from '../shared/pipes/precipitation-pipe';

@Component({
  selector: 'app-city-info',
  imports: [
    Header,
    Footer,
    TemperaturePipe,
    HumidityPipe,
    DatePipe,
    PressurePipe,
    WinterSpeedPipe,
    WinterSpeedPipe,
    WindDirectionPipe,
    PrecipitationPipe,
  ],
  templateUrl: './city-info.html',
  styleUrl: './city-info.css',
})
export class CityInfo implements OnInit {
  constructor(private weatherService: WeatherService) {}

  id = input.required<string>();
  stationData = signal<WeatherDataInterface | null>(null);
  isLoading = signal(true);

  ngOnInit(): void {
    this.getWeatherInfo();
  }

  getWeatherInfo() {
    this.weatherService.getWeatherByStationId(this.id()).subscribe({
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
