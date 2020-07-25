import {Component, OnDestroy, OnInit} from '@angular/core';
import {GamesService} from '../services/games.service';
import {Observable, Subscription} from 'rxjs';
import {Games} from '../../shared/interface';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent implements OnInit, OnDestroy {
  private gamesSubscription: Subscription;
  private allGames: Games[] = [];
  private viewGame: Games;
  private favouritesGames = [];
  private viewId: number;

  constructor(
    private gamesService: GamesService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.viewId = +params.id;
    });
    this.restoreFavourites();
    this.gamesSubscription = this.gamesService.getAll().subscribe(response => {
      this.allGames = response.games.map(game => {
        game.favourites = false;
        return game;
      });
      this.dataMerge();
      this.viewGame = this.allGames.find(game => +game.ID === this.viewId);
      console.log(this.viewGame);
    });
  }

  ngOnDestroy(): void {
    if (this.gamesSubscription) {
      this.gamesSubscription.unsubscribe();
    }
  }

  get view(): Games {
    return this.viewGame;
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

  restoreFavourites(): void {
    this.favouritesGames = this.getFavouritesFromStorage();
  }

  getFavouritesFromStorage(): Games[] {
    return localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [];
  }

}
