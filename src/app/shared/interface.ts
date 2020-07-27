export interface Games {
  ID?: number | string;
  ImageFullPath: string;
  Name: {
    ru?: string;
    en?: string;
  };
  some: object;
  favourites?: boolean;
  priority?: boolean;
  Sort?: number;
  LaunchCode?: string | number;
  MerchantID?: string | number;
}

export interface Categories {
  id: number;
}

export interface Merchants {
  ID: string | number;
  Name: string;
}

export interface ResponseAPI {
  categories: [];
  games: Games[];
  merchants: object;
  countriesRestrictions: object;
  merchantsCurrencies: [];
}
