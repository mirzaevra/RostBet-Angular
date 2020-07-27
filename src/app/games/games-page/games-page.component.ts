import {Component, OnDestroy, OnInit} from '@angular/core';
import {GamesService} from '../shared/services/games.service';
import {Subscription} from 'rxjs';
import {Games, Merchants} from '../../shared/interface';
import {HeaderStateService} from '../../shared/components/header/header-state.service';
import {MerchantStateService} from '../shared/components/merchant-list/merchant-state.service';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent implements OnInit, OnDestroy {

  private gamesSubscription: Subscription;
  public allGames: Games[] = [];
  private allCategories = [];
  public allMerchants: Merchants[] = [];
  public perPage = 12;
  public page = 1;
  public favouritesGames = [];
  private savedGamesList: Games[] = [];
  public searchString = '';
  public topGames: Games[] = [];

  // private topGamesIds: string[] = ['1566226', '1619143', '1141500', '1516543', '1588528'];


  constructor(
    private gamesService: GamesService,
    private headerStateService: HeaderStateService,
    private merchantStateService: MerchantStateService
  ) {
  }

  ngOnInit(): void {
    this.restoreFavouritesFromStorage();
    this.gamesSubscription = this.gamesService.getAll().subscribe(response => {
      this.allGames = response.games
        .map(game => {
          game.favourites = false;
          game.priority = 0;
          return game;
        });
      // this.setTopGames();
      this.allCategories = response.categories;
      this.allMerchants = Object.values(response.merchants);
      this.dataMerge();
      this.savedGamesList = [...this.allGames];
      this.setHeaderCounters();
    });
  }

  // setTopGames(): void {
  //   this.allGames.map((game, index) => {
  //     this.topGamesIds.forEach(topGameId => {
  //       if (topGameId === game.ID) {
  //         this.allGames.splice(index, 1);
  //         this.allGames.unshift(game);
  //         game.priority = true;
  //       }
  //     });
  //   });
  // }

  ngOnDestroy(): void {
    if (this.gamesSubscription) {
      this.gamesSubscription.unsubscribe();
    }
  }

  get games(): Games[] {
    if (this.searchString.trim().length > 0) {
      return this.allGames;
    } else {
      return this.allGames.slice(0, this.perPage * this.page);
    }
  }

  setHeaderCounters(): void {
    this.headerStateService.setAllGemesCount(this.allGames.length);
    this.headerStateService.setFilteredGemesCount(this.games.length);
  }

  selectSorted(type): void {
    this.page = 1;
    switch (type) {
      case 'default':
        this.sortByDefault();
        break;
      case 'name':
        this.sortByName(this.allGames);
        break;
      case 'reverse':
        this.sortByNameReverse(this.allGames);
        break;
    }
  }

  sortByName(array): any {
    array.sort((a: Games, b: Games) => {
      if (a.Name.en > b.Name.en) {
        return 1;
      }
      if (a.Name.en < b.Name.en) {
        return -1;
      }
      return 0;
    });
    // this.setTopGames();
  }

  sortByNameReverse(array): any {
    array.sort((a: Games, b: Games) => {
      if (a.Name.en > b.Name.en) {
        return -1;
      }
      if (a.Name.en < b.Name.en) {
        return 1;
      }
      return 0;
    });
    // this.setTopGames();
  }

  sortByDefault(): any {
    this.allGames = this.savedGamesList;
    this.savedGamesList = [...this.allGames];
    this.merchantStateService.resetMerchantIds();
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

  restoreFavouritesFromStorage(): void {
    this.favouritesGames = this.getFavouritesFromStorage();
  }

  getFavouritesFromStorage(): Games[] {
    return localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [];
  }

  setFavouritesInStorage(): void {
    localStorage.setItem('favourites', JSON.stringify(this.favouritesGames));
  }

  loadMoreGames(): void {
    this.page++;
    this.setHeaderCounters();
  }

  public changeShowingQuantity(quantity = 100): void {
    this.perPage = quantity;
  }

  setQuntityOnPage(perPage): void {
    this.page = 1;
    this.perPage = perPage;
  }

  onQuntityOnPage(perPage): void {
    this.setQuntityOnPage(perPage);
    this.setHeaderCounters();
  }

  isPriority(game): any {
    const result: any = {
      index: -1, priority: 0
    };

    this.allGames.forEach((item, index) => {
      if (game.ID === item.ID) {
        result.index = index;
        result.priority = item.priority;
        return false;
      }
    });
    return result;
  }

  togglePriorityHandler(game): void {
    const isPriority = this.isPriority(game);
    if (isPriority.index >= 0) {
      if (isPriority.priority) {
        this.allGames[isPriority.index].priority = 0;
        this.topGames.splice(isPriority.index, 1);
      } else {
        this.allGames[isPriority.index].priority = 100;
        this.topGames.unshift(game);
        for (let i = 5; i < this.topGames.length; i++) {
          const isPriorityTop = this.isPriority(this.topGames[i]);
          if (isPriorityTop.index >= 0) {
            this.allGames[isPriorityTop.index].priority = 0;
          }
        }
        this.topGames = this.topGames.slice(0, 5);
      }
    }
    this.togglePriority();
  }

  togglePriority(): void {
    this.allGames = this.savedGamesList;
    this.savedGamesList = [...this.allGames];
    if (this.topGames.length) {
      this.allGames.forEach((game, index) => {
        this.topGames.forEach(topGame => {
          if (topGame.ID === game.ID) {
            this.allGames.splice(index, 1);
            this.allGames.unshift(game);
          }
        });
      });
    }
  }

  toggleFavouritesHandler(game: Games): void {
    this.toggleFavourites(game);
  }

  toggleFavourites(game: Games): void {
    const index = this.isFavourite(game);
    if (index < 0) {
      game.favourites = true;
      this.favouritesGames.unshift(game);
    } else {
      game.favourites = false;
      this.favouritesGames.splice(index, 1);
    }
    this.setFavouritesInStorage();
  }

  isFavourite(game: Games): number {
    let findIndex = -1;
    this.favouritesGames.forEach((favorGame, index) => {
      if (favorGame.ID === game.ID) {
        findIndex = index;
        return false;
      }
    });
    return findIndex;
  }

  toggleMerchantHandler(merchantIds: []): void {
    this.sortByMerchants(merchantIds);
  }

  sortByMerchants(merchantIds): void {
    if (!merchantIds.length) {
      this.allGames = this.savedGamesList;
      this.setHeaderCounters();
      return;
    }
    this.allGames = this.savedGamesList;
    this.allGames = this.allGames.filter(game => {
      return merchantIds.filter(merchantId => {
        if (game.MerchantID === merchantId) {
          return game;
        }
      }).length;
    });
    this.setHeaderCounters();
  }
}
