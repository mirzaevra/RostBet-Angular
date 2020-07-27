import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [RouterModule, CommonModule],
  exports: [
    HeaderComponent
  ],
  declarations: [HeaderComponent]
})

export class SharedModule {
}
