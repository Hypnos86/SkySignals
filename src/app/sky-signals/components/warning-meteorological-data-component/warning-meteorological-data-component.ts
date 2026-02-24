import { Component, computed, signal } from '@angular/core';
import { WeatherService } from '../../../core/services/weather-service';
import { warningMeteoInterface } from '../../../core/interfaces/warningMeteo-interface';
import administrationData from '../../../../../public/data/administrationData.json';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-warning-meteorological-data-component',
  imports: [DatePipe],
  templateUrl: './warning-meteorological-data-component.html',
  styleUrl: './warning-meteorological-data-component.css',
})
export class WarningMeteorologicalDataComponent {
  // poprawny sposób na wstrzyknięcie serwisu
  constructor(private weatherService: WeatherService) {}

  warningData = signal<warningMeteoInterface[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.getWarningMeteo();
  }

  getWarningMeteo() {
    this.weatherService.getWarningMeteorologicalInformation().subscribe({
      next: (data) => {
        this.warningData.set(data);
        console.log(this.warningData());
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      },
    });
  }

  // Dane wzbogacone o nazwy - to jest ta "magia"
  enrichedWarnings = computed(() => {
    const data = this.warningData();
    const teryt: any = administrationData;

    return data.map((warning) => {
      // 1. Tworzymy tymczasowy obiekt do grupowania: { "Pomorskie": ["bytowski", "Gdańsk"], ... }
      const grouped: { [voivode: string]: string[] } = {};

      warning.teryt.forEach((code) => {
        const voivodeCode = code.substring(0, 2);
        const voivode = teryt[voivodeCode];

        const vName = voivode?.name || 'Nieznane województwo';
        const cName = voivode?.powiaty?.[code] || 'Nieznany powiat';

        if (!grouped[vName]) {
          grouped[vName] = [];
        }
        grouped[vName].push(cName);
      });

      // 2. Zamieniamy obiekt na tablicę łatwą do wyświetlenia w @for: [{ name: "Pomorskie", counties: [...] }]
      const groupedRegions = Object.keys(grouped).map((vName) => ({
        voivodeName: vName,
        counties: grouped[vName],
      }));

      return {
        ...warning,
        groupedRegions, // Nowa, zgrupowana struktura
      };
    });
  });
}
