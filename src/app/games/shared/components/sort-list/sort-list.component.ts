import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ControlList, SortBy} from '../../interface';

@Component({
  selector: 'app-sort-list',
  templateUrl: './sort-list.component.html',
  styleUrls: ['./sort-list.component.scss']
})
export class SortListComponent implements OnInit {
  @Output() sortBy: EventEmitter<any> = new EventEmitter<any>();
  private sortDataList: SortBy[] = [
    {
      type: 'default',
      text: 'Default',
      active: true,
    },
    {
      type: 'name',
      text: 'By name',
      active: false,
    },
    {
      type: 'reverse',
      text: 'By name reverse',
      active: false,
    },
  ];

  constructor() {
  }

  get sortList(): SortBy[] {
    return this.sortDataList;
  }

  ngOnInit(): void {
  }

  setActiveClass(item: SortBy): void {
    this.sortDataList.map(list => {
      if (item.type === list.type) {
        list.active = true;
        return list;
      }
      list.active = false;
      return list;
    });
  }

  sortHandler(item): any {
    this.setActiveClass(item);
    this.sortBy.emit(item.type);
  }
}
