export interface WarningHydroInterface {
  opublikowano: string;
  stopien: string;
  data_od: string;
  data_do: string;
  prawdopodobienstwo: number;
  numer: number;
  biuro: string;
  zdarzenie: string;
  przebieg: string;
  komentarz: string;
  obszary: AreaInterface[];
}

interface AreaInterface {
  wojewodztwo: string;
  opis: string;
  kod_zlewni: string[];
}
