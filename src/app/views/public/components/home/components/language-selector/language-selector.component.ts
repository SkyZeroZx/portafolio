import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LANGUAGES, listLanguages } from '@core/constants';

@Component({
	selector: 'app-language-selector',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TranslatePipe],
	templateUrl: './language-selector.component.html',
	styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
	private translate = inject(TranslateService);

	constructor() {
		const translate = this.translate;

		translate.addLangs([...listLanguages]);
		this.setLanguage();
	}

	setLanguage() {
		if (this.translate.getCurrentLang() === LANGUAGES.EN) {
			this.translate.use(LANGUAGES.ES);
		} else {
			this.translate.use(LANGUAGES.EN);
		}
	}
}
