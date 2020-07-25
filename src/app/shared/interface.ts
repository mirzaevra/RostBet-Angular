export interface Games {
  ID?: number | string;
  ImageFullPath: string;
  Name: object;
  some: object;
  favourites?: boolean;
}

export interface Categories {
  id: number;
}

export interface Merchants {
  id: number;
}

export interface ResponseAPI {
  categories: [];
  games: Games[];
  merchants: object;
  countriesRestrictions: object;
  merchantsCurrencies: [];
}
