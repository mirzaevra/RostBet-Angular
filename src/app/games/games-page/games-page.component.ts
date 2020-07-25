import {Component, OnDestroy, OnInit} from '@angular/core';
import {GamesService} from '../services/games.service';
import {Subscription} from 'rxjs';
import {Games} from '../../shared/interface';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent implements OnInit, OnDestroy {

  gamesSubscription: Subscription;
  allGames: Games[] = [];
  allCategories = [];
  allMerchants = [];
  private perPage = 12;
  private page = 1;
  private someTest = 0;

  constructor(
    private gamesService: GamesService,
  ) {
  }

  ngOnInit(): void {
    this.gamesSubscription = this.gamesService.getAll().subscribe(response => {
      this.allGames = response.games;
      this.allCategories = response.categories;
      this.allMerchants = response.merchants;
    });
  }

  ngOnDestroy(): void {
    if (this.gamesSubscription) {
      this.gamesSubscription.unsubscribe();
    }
  }

  get games(): Games[] {
    return this.allGames.slice(0, this.perPage * this.page);
  }

  loadMoreGames(): void {
    this.page++;
  }
}
