export interface Games {
  ID?: number | string;
  ImageFullPath: string;
  Name: {
    ru?: string;
    en?: string;
  };
  some: object;
  favourites?: boolean;
  priority?: number;
  Sort?: number;
  LaunchCode?: string | number;
  MerchantID?: string | number;
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
