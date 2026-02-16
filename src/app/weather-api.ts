import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // serwis jest dostepny w całej aplikacji
})
export class WeatherApi {

  private apiUrl: string = 'https://danepubliczne.imgw.pl/api/data/synop'; //dane synaptyczne

  // wstrzykiwania seriwus przez konstruktir sposob nr 1
  constructor(private http: HttpClient) {}

  // private http = inject(HttpClient) //Wstrzykujemy HttpClient - inny sposób wstrzykiwania sposob nr 2

  // Pobieranie danych

  // Pobieranie całości stacji
  getAllWeather(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // pobieranie danych dla jednego miasta id = miasto
  getCityWeather(id:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/id/${id}`)
  }
}
