import {NgModule} from '@angular/core';
import {GamesPageComponent} from './games-page/games-page.component';
import {ViewPageComponent} from './view-page/view-page.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
      GamesPageComponent,
      ViewPageComponent,
    ],
    imports: [
      CommonModule,
      RouterModule.forChild([
        {
          path: '', children: [
            {path: '', component: GamesPageComponent},
            {path: 'view/:id', component: ViewPageComponent}
          ]
        }
      ])
    ]
  }
)

export class GamesModule {
}
