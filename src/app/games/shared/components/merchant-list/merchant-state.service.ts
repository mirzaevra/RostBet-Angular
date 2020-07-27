import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MerchantStateService {
  public merchantIds: any[] = [];

  resetMerchantIds(): void {
    this.merchantIds = [];
  }
}
