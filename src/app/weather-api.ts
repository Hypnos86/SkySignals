import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // serwis jest dostepny w całej aplikacji
})
export class WeatherApi {

  private http = inject(HttpClient) //Wstrzykujemy HttpClient

  private apiUrl: string = 'https://danepubliczne.imgw.pl/api/data/synop'; //dane synaptyczne

  // Pobieranie danych 
  getAllWeather(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
  }
}
