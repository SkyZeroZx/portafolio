import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '@core/constants';
import { TranslateBrowserLoader } from '@core/config/translate/browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideTranslateService({
			lang: LANGUAGES.EN,
			fallbackLang: LANGUAGES.EN,
			loader: provideTranslateLoader(() => new TranslateBrowserLoader())
		})
	]
};
