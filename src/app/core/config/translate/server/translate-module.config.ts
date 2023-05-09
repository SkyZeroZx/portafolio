import { TransferState } from '@angular/core';
import { TranslateLoader, TranslateModuleConfig } from '@ngx-translate/core';
import { translateServerLoaderFactory } from './translate-server-loader.config';

export const translateModuleConfigServer: TranslateModuleConfig = {
	loader: {
		provide: TranslateLoader,
		useFactory: translateServerLoaderFactory,
		deps: [TransferState]
	}
};
