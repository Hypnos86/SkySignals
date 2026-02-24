import { Component} from '@angular/core';
import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';
import { WarningMeteorologicalDataComponent } from "./components/warning-meteorological-data-component/warning-meteorological-data-component";
import { WarningHydrologicalDataComponent } from "./components/warning-hydrological-data-component/warning-hydrological-data-component";

@Component({
  selector: 'app-sky-signals',
  imports: [Header, Footer, WarningMeteorologicalDataComponent, WarningHydrologicalDataComponent],
  templateUrl: './sky-signals.html',
  styleUrl: './sky-signals.css',
})
export class SkySignals {

}
