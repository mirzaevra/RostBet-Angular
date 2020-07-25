import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GamesOnPage} from '../../interface';

@Component({
  selector: 'app-controls-bar',
  templateUrl: './controls-bar.component.html',
  styleUrls: ['./controls-bar.component.scss']
})
export class ControlsBarComponent implements OnInit {
  @Output() quntityOnPage: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  get gemseOnPage(): GamesOnPage[] {
    return [
      {
        text: 'Set:',
        perPage: 12
      },
      {
        text: 'Set:',
        perPage: 24
      },
      {
        text: 'Set:',
        perPage: 36
      },
    ];
  }

  chooseQuantity(item): void {
    this.quntityOnPage.emit(item.perPage);
  }
}
