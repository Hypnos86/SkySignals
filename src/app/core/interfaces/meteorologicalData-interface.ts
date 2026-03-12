export interface MeteorologicalDataInterface {
  kod_stacji: number;
  nazwa_stacji: string;
  lon: number;
  lat: number;
  temperatura_gruntu: string;
  temperatura_gruntu_data: string;
  temperatura_powietrza: string;
  temperatura_powietrza_data: string;
  wiatr_kierunek: string;
  wiatr_kierunek_data: string;
  wiatr_srednia_predkosc: string;
  wiatr_srednia_predkosc_data: string;
  wiatr_predkosc_maksymalna: string;
  wiatr_predkosc_maksymalna_data: string;
  wilgotnosc_wzgledna: string;
  wilgotnosc_wzgledna_data: string;
  wiatr_poryw_10min: string;
  wiatr_poryw_10min_data: string;
  opad_10min: number;
  opad_10min_data: string;
}
