import { HttpClient } from '@angular/common/http';
import { inject, makeStateKey, StateKey, TransferState } from '@angular/core';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

export class TranslateBrowserLoader implements TranslateLoader {
	private readonly http = inject(HttpClient);
	private readonly transferState = inject(TransferState);

	getTranslation(lang: string): Observable<TranslationObject> {
		const key: StateKey<TranslationObject> = makeStateKey<TranslationObject>('transfer-translate-' + lang);
		const data = this.transferState.get(key, null);

		if (data) {
			return of(data);
		}

		return this.http.get<TranslationObject>(`assets/i18n/${lang}.json`);
	}
}

export function TranslateBrowserLoaderFactory() {
	return new TranslateBrowserLoader();
}
