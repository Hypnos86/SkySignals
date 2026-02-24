import { Component } from '@angular/core';
import { WeatherService } from '../../../core/services/weather-service';

@Component({
  selector: 'app-warning-hydrological-data-component',
  imports: [],
  templateUrl: './warning-hydrological-data-component.html',
  styleUrl: './warning-hydrological-data-component.css',
})
export class WarningHydrologicalDataComponent {
  constructor(private weatherService: WeatherService) {}
}
