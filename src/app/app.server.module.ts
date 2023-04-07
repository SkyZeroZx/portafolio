import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { TransferState } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { translateServerLoaderFactory } from '@core/config/translate/translate-server-loader.config';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
