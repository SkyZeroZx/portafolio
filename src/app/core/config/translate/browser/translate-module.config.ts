import { HttpClient } from '@angular/common/http';
import { TransferState } from '@angular/core';
import { TranslateLoader, TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateBrowserLoaderFactory } from './translate-browser-loader.config';

export const translateModuleConfigBrowser: TranslateModuleConfig = {
	loader: {
		provide: TranslateLoader,
		useFactory: TranslateBrowserLoaderFactory,
		deps: [HttpClient, TransferState]
	}
};
