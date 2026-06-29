import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { provideTranslateLoader } from '@ngx-translate/core';
import { TranslateServerLoader } from '@core/config/translate/server';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
	providers: [provideServerRendering(withRoutes(serverRoutes)), provideTranslateLoader(() => new TranslateServerLoader())]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
