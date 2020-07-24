import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {SharedModule} from './shared/shared.module';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
