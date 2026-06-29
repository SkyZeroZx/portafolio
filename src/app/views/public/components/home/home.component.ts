import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class HomeComponent implements OnInit {
	private readonly destroyRef = inject(DestroyRef);
	private readonly translateService = inject(TranslateService);

	isMobile = false;
	isChangeLanguage = false;
	typpingList: string[] = ['Jaime Burgos', 'Software Engineer', 'Developer'];
	homeContent = signal<string[]>([]);

	@Output() isLoad = new EventEmitter<void>();

	ngOnInit() {
		this.setTranslateTextToWriter();
	}

	emitLoad(): void {
		this.isLoad.emit();
	}

	setChangeLanguage() {
		this.isChangeLanguage = true;
	}

	setTranslateTextToWriter() {
		this.translateService
			.get('home.content')
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((data) => {
				this.homeContent.set([String(data)]);
			});
	}
}
