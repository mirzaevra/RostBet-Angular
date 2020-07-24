import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrorPageComponent} from './error-page/error-page.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {GamesModule} from './games/games.module';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/games', pathMatch: 'full'},
    ]
  },
  {path: 'games', loadChildren: './games/games.module#GamesModule'},
  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: 'error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
