import { Component } from '@angular/core';
import { Header } from "../../../shared/header/header";
import { Footer } from "../../../shared/footer/footer";

@Component({
  selector: 'app-hydrological-data-component',
  imports: [Header, Footer],
  templateUrl: './hydrological-data-component.html',
  styleUrl: './hydrological-data-component.css',
})
export class HydrologicalDataComponent {

}
