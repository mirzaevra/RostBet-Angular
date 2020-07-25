import {NgModule} from '@angular/core';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  exports: [
    HeaderComponent
  ],
  declarations: [HeaderComponent]
})

export class SharedModule {
}
