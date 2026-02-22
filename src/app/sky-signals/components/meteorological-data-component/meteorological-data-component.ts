import { Component } from '@angular/core';
import { Header } from "../../../shared/header/header";
import { Footer } from "../../../shared/footer/footer";

@Component({
  selector: 'app-meteorological-data-component',
  imports: [Header, Footer],
  templateUrl: './meteorological-data-component.html',
  styleUrl: './meteorological-data-component.css',
})
export class MeteorologicalDataComponent {}
