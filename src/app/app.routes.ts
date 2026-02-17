import { Routes } from '@angular/router';
import { SkyWeather } from './sky-weather/sky-weather';
import { CityInfo } from './city-info/city-info';

export const routes: Routes = [
    {path:"", pathMatch: "full", redirectTo:"sky-weather"},
    {path:"sky-weather", component:SkyWeather},
    {path:"station/:id", component:CityInfo},
    {path:"**", redirectTo:""}

];
