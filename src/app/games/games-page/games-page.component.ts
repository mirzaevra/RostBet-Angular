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
  private allMerchants = {};
  public favouritesGames = [];
  private perPage = 12;
  private page = 1;
  private savedGamesList: Games[] = [];


  constructor(
    private gamesService: GamesService,
  ) {
  }

  ngOnInit(): void {
    this.restoreFavourites();
    this.gamesSubscription = this.gamesService.getAll().subscribe(response => {
      this.allGames = response.games.map(game => {
        game.favourites = false;
        return game;
      });
      this.allCategories = response.categories;
      this.allMerchants = response.merchants;
      this.dataMerge();
      this.savedGamesList = [...this.allGames];
    });
  }

  selectSorted(type): void {
    switch (type) {
      case 'default':
        this.sortByDefault();
        break;
      case 'name':
        this.sortByName();
        break;
      case 'reverse':
        this.sortByNameReverse();
        break;
    }
  }

  sortByName(): any {
    this.allGames.sort((a: Games, b: Games) => {
      if (a.Name.en > b.Name.en) {
        return 1;
      }
      if (a.Name.en < b.Name.en) {
        return -1;
      }
      return 0;
    });
  }

  sortByNameReverse(): any {
    this.allGames.sort((a: Games, b: Games) => {
      if (a.Name.en > b.Name.en) {
        return -1;
      }
      if (a.Name.en < b.Name.en) {
        return 1;
      }
      return 0;
    });
  }

  sortByDefault(): any {
    this.allGames = this.savedGamesList;
    this.savedGamesList = [...this.allGames];
  }

  ngOnDestroy(): void {
    if (this.gamesSubscription) {
      this.gamesSubscription.unsubscribe();
    }
  }

  dataMerge(): void {
    this.favouritesGames.forEach(fav => {
      this.allGames.forEach(game => {
        if (fav.ID === game.ID) {
          game.favourites = fav.favourites;
        }
      });
    });
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

  restoreFavourites(): void {
    this.favouritesGames = this.getFavouritesFromStorage();
  }

  getFavouritesFromStorage(): Games[] {
    return localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [];
  }

  toggleFavourites(game): void {
    this.favouritesGames = this.allGames
      .map(favorFame => {
        if (game.ID === favorFame.ID) {
          favorFame.favourites = !favorFame.favourites;
        }
        return favorFame;
      })
      .filter(item => item.favourites);
    localStorage.setItem('favourites', JSON.stringify(this.favouritesGames));
  }
}
