import { Routes } from '@angular/router';
import { SkySignals } from './sky-signals/sky-signals';
import { SynopticDataComponent } from './sky-signals/components/synoptic-data-component/synoptic-data-component';
import { StationDataComponent } from './sky-signals/components/synoptic-data-component/station-data-component/station-data-component';
import { HydrologicalDataComponent } from './sky-signals/components/hydrological-data-component/hydrological-data-component';
import { MeteorologicalDataComponent } from './sky-signals/components/meteorological-data-component/meteorological-data-component';
export const routes: Routes = [
  // 1. Przekierowanie główne
  { path: '', pathMatch: 'full', redirectTo: 'sky-signals' },

  // 2. Drzewo tras sky-signals
  {
    path: 'sky-signals',
    children: [
      // Adres: /sky-signals
      { path: '', component: SkySignals },

      {
        path: 'synoptic',
        children: [
          // Adres: /sky-signals/synoptic
          { path: '', component: SynopticDataComponent },

          // Adres: /sky-signals/synoptic/station/:id
          { path: 'station/:id', component: StationDataComponent },
        ],
      },
      {
        path: 'hydrological',
        children: [
          // Adres: /sky-signals/hydrological
          { path: '', component: HydrologicalDataComponent },
        ],
      },
      { path: 'meteorological', children: [{ path: '', component: MeteorologicalDataComponent }] },
    ],
  },

  // 3. Obsługa błędnych adresów
  { path: '**', redirectTo: 'sky-signals/' },
];
