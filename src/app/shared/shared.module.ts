import {NgModule} from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [RouterModule],
  exports: [
    HeaderComponent
  ],
  declarations: [HeaderComponent]
})

export class SharedModule {
}
