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

  private gamesSubscription: Subscription;
  private allGames: Games[] = [];
  private allCategories = [];
  private allMerchants = [];
  public favouritesGames = [];
  private perPage = 4;
  private page = 1;
  private favouritesList: Games[] = [];


  constructor(
    private gamesService: GamesService,
  ) {
  }

  ngOnInit(): void {
    this.gamesSubscription = this.gamesService.getAll().subscribe(response => {
      this.allGames = response.games.map(game => {
        game.chosen = false;
        return game;
      });
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

  public changeShowingQuantity(quantity = 100): void {
    this.perPage = quantity;
  }

  setQuntityOnPage(perPage): void {
    this.perPage = perPage;
  }

  toggleFavourites(game): void {
    this.favouritesList.push(game);
    console.log(this.favouritesList);
    console.log(123123);
  }
}
