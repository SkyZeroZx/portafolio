import { join } from 'path';
import { Observable } from 'rxjs';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import { TranslateLoader } from '@ngx-translate/core';
import { makeStateKey, StateKey, TransferState } from '@angular/core';

export class TranslateServerLoader implements TranslateLoader {
	private readonly prefix: string = 'i18n';
	private readonly suffix: string = '.json';

	constructor(private transferState: TransferState) {}

	getTranslation(lang: string): Observable<unknown> {
		return new Observable((observer) => {
			const assets_folder = join(
				cwd(),
				'dist',
				'portafolio', // proyect name in dist folder
				'browser',
				'assets',
				this.prefix
			);

			const jsonData = JSON.parse(readFileSync(`${assets_folder}/${lang}${this.suffix}`, 'utf8'));

			// Here we save the translations in the transfer-state
			const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
			this.transferState.set(key, jsonData);

			observer.next(jsonData);
			observer.complete();
		});
	}
}

export function translateServerLoaderFactory(transferState: TransferState) {
	return new TranslateServerLoader(transferState);
}
