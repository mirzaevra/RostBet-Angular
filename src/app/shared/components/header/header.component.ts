import {Component, OnInit} from '@angular/core';
import {HeaderStateService} from './header-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private headerStateService: HeaderStateService
  ) {
  }

  ngOnInit(): void {
  }

  getAllGemesCount(): number {
    return this.headerStateService.getAllGemesCount();
  }

  getFilteredGemesCount(): number {
    return this.headerStateService.getFilteredGemesCount();
  }
}
