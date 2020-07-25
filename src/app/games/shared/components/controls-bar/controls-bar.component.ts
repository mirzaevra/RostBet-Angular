import {Component, EventEmitter, OnInit, Output} from '@angular/core';

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

  chooseQuantity(event): void {
    this.quntityOnPage.emit(+event.target.dataset.perPage);
  }
}
