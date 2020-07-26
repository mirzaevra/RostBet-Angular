import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {GamesService} from './shared/services/games.service';
import {GamesPageComponent} from './games-page/games-page.component';
import {ViewPageComponent} from './view-page/view-page.component';
import {GameCardComponent} from './shared/components/game-card/game-card.component';
import {ControlsBarComponent} from './shared/components/controls-bar/controls-bar.component';
import {SortListComponent} from './shared/components/sort-list/sort-list.component';
import {SearchPipe} from './shared/pipes/search.pipe';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
      GamesPageComponent,
      ViewPageComponent,
      GameCardComponent,
      ControlsBarComponent,
      SortListComponent,
      SearchPipe,
    ],
    imports: [
      CommonModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forChild([
        {
          path: '', children: [
            {path: '', component: GamesPageComponent},
            {path: 'view/:mid/:lid', component: ViewPageComponent}
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
