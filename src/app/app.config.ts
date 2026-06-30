import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '@core/constants';
import { swRegistrationOptions } from '@core/config/service-worker';
import { TranslateBrowserLoader } from '@core/config/translate/browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideServiceWorker('ngsw-worker.js', swRegistrationOptions),
		provideTranslateService({
			lang: LANGUAGES.EN,
			fallbackLang: LANGUAGES.EN,
			loader: provideTranslateLoader(() => new TranslateBrowserLoader())
		})
	]
};
