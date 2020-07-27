import {Component, Input, OnInit} from '@angular/core';
import {Merchants} from '../../../../shared/interface';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {
  @Input() merchantList: Merchants[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
