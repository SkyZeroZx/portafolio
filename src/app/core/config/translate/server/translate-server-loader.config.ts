import { inject, makeStateKey, StateKey, TransferState } from '@angular/core';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { Observable } from 'rxjs';

export class TranslateServerLoader implements TranslateLoader {
	private readonly prefix: string = 'i18n';
	private readonly suffix: string = '.json';
	private readonly transferState = inject(TransferState);

	getTranslation(lang: string): Observable<TranslationObject> {
		return new Observable((observer) => {
			const distAssetsFolder = join(cwd(), 'dist', 'portafolio', 'browser', 'assets', this.prefix);
			const sourceAssetsFolder = join(cwd(), 'src', 'assets', this.prefix);
			const assetsFolder = existsSync(sourceAssetsFolder) ? sourceAssetsFolder : distAssetsFolder;

			const jsonData = JSON.parse(readFileSync(`${assetsFolder}/${lang}${this.suffix}`, 'utf8')) as TranslationObject;

			const key: StateKey<TranslationObject> = makeStateKey<TranslationObject>('transfer-translate-' + lang);
			this.transferState.set(key, jsonData);

			observer.next(jsonData);
			observer.complete();
		});
	}
}

export function translateServerLoaderFactory() {
	return new TranslateServerLoader();
}
