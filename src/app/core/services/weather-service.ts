import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherDataInterface } from '../interfaces/weatherData-interface';
import { StationInterface } from '../interfaces/station-interface';
import { warningMeteoInterface } from '../interfaces/warningMeteo-interface';

@Injectable({
  providedIn: 'root', // serwis jest dostepny w całej aplikacji
})
export class WeatherService {
  private apiUrl: string = 'https://danepubliczne.imgw.pl/api/data'; //dane

  // wstrzykiwania seriwus przez konstruktir sposob nr 1
  constructor(private http: HttpClient) {}

  // private http = inject(HttpClient) //Wstrzykujemy HttpClient - inny sposób wstrzykiwania sposob nr 2

  // Pobieranie danych

  // Pobieranie całości stacji
  getAllSynopticData(): Observable<StationInterface[]> {
    return this.http.get<StationInterface[]>(this.apiUrl.concat('/synop'));
  }

  // pobieranie danych dla jednego miasta id = miasto
  getSynopticDataByStationId(id: string): Observable<WeatherDataInterface> {
    return this.http.get<WeatherDataInterface>(`${this.apiUrl.concat('/synop')}/id/${id}`);
  }

  //pobieranie ostrzezec metrorologicznych
  // https://danepubliczne.imgw.pl/api/data/warningsmeteo
  getWarningMeteorologicalInformation(): Observable<warningMeteoInterface[]> {
    return this.http.get<warningMeteoInterface[]>(this.apiUrl.concat('/warningsmeteo'));
  }
  getWarningHydroInformation():Observable<any>{
    return this.http.get<any>(this.apiUrl.concat("/warningshydro"))
  }

}
