export interface WeatherDataInterface{
  id_stacji: string,
  stacja: string,
  data_pomiaru: string,
  godzina_pomiaru: number,
  temperatura: number,
  predkosc_wiatru: number,
  kierunek_wiatru: number,
  wilgotnosc_wzgledna: number,
  suma_opadu: number,
  cisnienie: number
}
