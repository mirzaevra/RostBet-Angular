import {Component, OnDestroy, OnInit} from '@angular/core';
import {GamesService} from '../shared/services/games.service';
import {Subscription} from 'rxjs';
import {Games} from '../../shared/interface';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent implements OnInit, OnDestroy {
  private gamesSubscription: Subscription;
  public allGames: Games[] = [];
  private viewGame: Games;
  private favouritesGames = [];
  private viewMId: string | number;
  private viewLId: string | number;

  constructor(
    private gamesService: GamesService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.viewMId = params.mid;
      this.viewLId = params.lid;
    });
    this.restoreFavourites();
    this.gamesSubscription = this.gamesService.getAll().subscribe(response => {
      this.allGames = response.games.map(game => {
        game.favourites = false;
        return game;
      });
      this.dataMerge();
      this.viewGame = this.allGames
        .find(game => game.MerchantID === this.viewMId && game.LaunchCode === this.viewLId);
      if (!this.viewGame) {
        this.route.navigate(['/error']);
      }
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
