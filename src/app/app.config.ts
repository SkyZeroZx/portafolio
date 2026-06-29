import { APP_ID, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '@core/constants';
import { swRegistrationOptions } from '@core/config/service-worker';
import { TranslateBrowserLoader } from '@core/config/translate/browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, withEnabledBlockingInitialNavigation()),
		provideHttpClient(withFetch()),
		provideClientHydration(),
		provideServiceWorker('ngsw-worker.js', swRegistrationOptions),
		provideTranslateService({
			lang: LANGUAGES.EN,
			fallbackLang: LANGUAGES.EN,
			loader: provideTranslateLoader(() => new TranslateBrowserLoader())
		}),
		{ provide: APP_ID, useValue: 'server-app' }
	]
};
