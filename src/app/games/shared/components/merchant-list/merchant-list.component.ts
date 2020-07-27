import {Component, Input, OnInit} from '@angular/core';
import {Merchants} from '../../../../shared/interface';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {
  public merchantIds: any[] = [];
  @Input() merchantList: Merchants[];

  constructor() {
  }

  ngOnInit(): void {
  }

  isSelected(merchant): number {
    let isSelected = -1;
    this.merchantIds.forEach((item, index) => {
      if (merchant.ID === item) {
        isSelected = index;
      }
      return false;
    });
    return isSelected;
  }

  toggleMerchant(merchant: Merchants): void {
    const index = this.isSelected(merchant);
    console.log(index);
    if (index < 0) {
      this.merchantIds.push(merchant.ID);
    } else {
      this.merchantIds.splice(index, 1);
    }
    console.log(this.merchantIds);
  }

}
