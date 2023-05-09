import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES, listLanguages } from '@core/constants';

@Component({
	selector: 'app-language-selector',
	templateUrl: './language-selector.component.html',
	styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
	constructor(private translate: TranslateService) {
		translate.addLangs([...listLanguages]);
		this.setLanguage();
	}

	setLanguage() {
		if (this.translate.currentLang === LANGUAGES.EN) {
			this.translate.use(LANGUAGES.ES);
		} else {
			this.translate.use(LANGUAGES.EN);
		}
	}
}
