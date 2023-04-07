import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, TransferState } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layout';
import { TranslateBrowserLoaderFactory } from '@core/config/translate/translate-browser-loader.config';


@NgModule({
  declarations: [AppComponent, ContentLayoutComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateBrowserLoaderFactory,
        deps: [HttpClient, TransferState],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
