import {NgModule} from '@angular/core';
import {GamesPageComponent} from './games-page/games-page.component';
import {ViewPageComponent} from './view-page/view-page.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {GameCardComponent} from './shared/game-card/game-card.component';
import {GamesService} from './services/games.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
      GamesPageComponent,
      ViewPageComponent,
      GameCardComponent,
    ],
    imports: [
      CommonModule,
      HttpClientModule,
      RouterModule.forChild([
        {
          path: '', children: [
            {path: '', component: GamesPageComponent},
            {path: 'view/:id', component: ViewPageComponent}
          ]
        }
      ])
    ],
    providers: [
      GamesService,
    ]
  }
)

export class GamesModule {
}
