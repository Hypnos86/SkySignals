import { Footer } from '../shared/footer/footer';
import { Header } from '../shared/header/header';
import { WeatherDataInterface } from './../core/interfaces/weatherData-interface';
import { WeatherService } from './../core/services/weather-service';
import { Component, input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-city-info',
  imports: [Header, Footer],
  templateUrl: './city-info.html',
  styleUrl: './city-info.css',
})
export class CityInfo implements OnInit {
  constructor(private weatherService: WeatherService) {
  }

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
}
