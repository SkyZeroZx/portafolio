import { Component, computed, inject, output } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LANGUAGES, listLanguages } from '@core/constants';

@Component({
	selector: 'app-language-selector',
	imports: [TranslatePipe],
	templateUrl: './language-selector.component.html',
	styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
	private readonly translate = inject(TranslateService);

	readonly languageChanged = output<void>();
	readonly isEnglish = computed(() => this.translate.currentLang() === LANGUAGES.EN);

	constructor() {
		this.translate.addLangs([...listLanguages]);
		this.translate.use(LANGUAGES.ES);
	}

	toggleLanguage(): void {
		const nextLanguage = this.isEnglish() ? LANGUAGES.ES : LANGUAGES.EN;

		this.translate.use(nextLanguage);
		this.languageChanged.emit();
	}
}
