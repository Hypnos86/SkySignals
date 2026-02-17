import { Routes } from '@angular/router';
import { SkyWeather } from './sky-weather/sky-weather';

export const routes: Routes = [
    {path:"", pathMatch: "full", redirectTo:"sky-weather"},
    {path:"sky-weather", component:SkyWeather}


];