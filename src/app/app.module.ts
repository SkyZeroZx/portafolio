import { NgModule, APP_ID } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';

import { swRegistrationOptions } from '@core/config/service-worker';
import { translateModuleConfigBrowser } from '@core/config/translate/browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layout';

@NgModule({
	declarations: [AppComponent, ContentLayoutComponent],
	imports: [
		BrowserModule,
		TransferHttpCacheModule,
		AppRoutingModule,
		HttpClientModule,
		TranslateModule.forRoot(translateModuleConfigBrowser),
		ServiceWorkerModule.register('ngsw-worker.js', swRegistrationOptions)
	],
	providers: [provideClientHydration(), { provide: APP_ID, useValue: 'server-app' }],
	bootstrap: [AppComponent]
})
export class AppModule {}
