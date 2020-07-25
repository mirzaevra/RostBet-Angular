import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {GamesService} from './services/games.service';
import {GamesPageComponent} from './games-page/games-page.component';
import {ViewPageComponent} from './view-page/view-page.component';
import {GameCardComponent} from './shared/components/game-card/game-card.component';
import {ControlsBarComponent} from './shared/components/controls-bar/controls-bar.component';
import {SortListComponent} from './shared/components/sort-list/sort-list.component';

@NgModule({
    declarations: [
      GamesPageComponent,
      ViewPageComponent,
      GameCardComponent,
      ControlsBarComponent,
      SortListComponent,
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
