export interface HydrologicalDataInterface {
  id_stacji: string;
  stacja: string;
  rzeka: string;
  wojewodztwo: string;
  lon: number;
  lat: number;
  stan_wody: number;
  stan_wody_data_pomiaru: string;
  temperatura_wody: null;
  temperatura_wody_data_pomiaru: null;
  przelyw: number;
  przeplyw_data: string;
  zjawisko_lodowe: number;
  zjawisko_lodowe_data_pomiaru: string;
  zjawisko_zarastania: number;
  zjawisko_zarastania_data_pomiaru: string;
}
