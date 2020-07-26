import {Component, OnDestroy, OnInit} from '@angular/core';
import {GamesService} from '../shared/services/games.service';
import {Subscription} from 'rxjs';
import {Games} from '../../shared/interface';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent implements OnInit, OnDestroy {

  private gamesSubscription: Subscription;
  public allGames: Games[] = [];
  private allCategories = [];
  private allMerchants = {};
  public perPage = 12;
  public page = 1;
  public favouritesGames = [];
  private savedGamesList: Games[] = [];
  public searchString = '';
  public topGames: Games[] = [];


  constructor(
    private gamesService: GamesService,
  ) {
  }

  ngOnInit(): void {
    this.restoreFavouritesFromStorage();
    this.gamesSubscription = this.gamesService.getAll().subscribe(response => {
      this.allGames = response.games.map(game => {
        game.favourites = false;
        game.priority = 0;
        return game;
      });
      this.allCategories = response.categories;
      this.allMerchants = response.merchants;
      this.dataMerge();
      this.savedGamesList = [...this.allGames];
    });
  }

  ngOnDestroy(): void {
    if (this.gamesSubscription) {
      this.gamesSubscription.unsubscribe();
    }
  }

  selectSorted(type): void {
    this.page = 1;
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
    if (this.searchString.trim().length > 0) {
      return this.allGames;
    } else {
      return this.allGames.slice(0, this.perPage * this.page);
    }
  }

  loadMoreGames(): void {
    this.page++;
  }

  public changeShowingQuantity(quantity = 100): void {
    this.perPage = quantity;
  }

  setQuntityOnPage(perPage): void {
    this.page = 1;
    this.perPage = perPage;
  }

  restoreFavouritesFromStorage(): void {
    this.favouritesGames = this.getFavouritesFromStorage();
  }

  getFavouritesFromStorage(): Games[] {
    return localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [];
  }

  isPriority(game): number {
    let result = -1;
    this.topGames.forEach((item, index) => {
      if (game.ID === item.ID) {
        if (item.priority) {
          result = index;
        }
        return false;
      }
    });

    return result;
  }

  togglePriority(game): void {
    const index = this.isPriority(game);
    if (index < 0) {
      this.topGames.push(game);
    } else {
      this.topGames.splice(index, 1);
    }
  }

  setFavouritesInStorage(): void {
    localStorage.setItem('favourites', JSON.stringify(this.favouritesGames));
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
    this.setFavouritesInStorage();
  }
}
