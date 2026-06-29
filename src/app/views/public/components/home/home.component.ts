import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NgxTypedWriterComponent } from 'ngx-typed-writer';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

@Component({
	selector: 'app-home',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LanguageSelectorComponent, NgxTypedWriterComponent, TranslatePipe],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	private readonly translateService = inject(TranslateService);
	private readonly translatedHomeContent = toSignal(this.translateService.stream('home.content'), { initialValue: '' });

	readonly isChangeLanguage = signal(false);
	readonly typingList: string[] = ['Jaime Burgos', 'Software Engineer', 'Developer'];
	readonly homeContent = computed(() => {
		const content = this.translatedHomeContent();

		return content ? [String(content)] : [];
	});

	readonly contentRequested = output<void>();

	requestContent(): void {
		this.contentRequested.emit();
	}

	setChangeLanguage(): void {
		this.isChangeLanguage.set(true);
	}
}
