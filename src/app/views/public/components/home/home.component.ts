import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, PLATFORM_ID, afterNextRender, computed, inject, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NgxTypedWriterComponent } from 'ngx-typed-writer';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

@Component({
	selector: 'app-home',
	imports: [FontAwesomeModule, LanguageSelectorComponent, NgxTypedWriterComponent, TranslatePipe],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	private readonly fallbackRoleWords = ['Software Engineer', 'Angular Contributor'];
	private readonly translate = inject(TranslateService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
	private readonly translatedRoleWords = toSignal(this.translate.stream('home.roleWords'), { initialValue: this.fallbackRoleWords });

	readonly faGithub = faGithub;
	readonly faWhatsapp = faWhatsapp;
	readonly prefersReducedMotion = signal(!this.isBrowser);
	readonly roleWords = computed(() => {
		const translatedRoleWords = this.translatedRoleWords();

		if (!Array.isArray(translatedRoleWords)) {
			return this.fallbackRoleWords;
		}

		const roleWords = translatedRoleWords.filter((roleWord): roleWord is string => typeof roleWord === 'string' && roleWord.trim().length > 0);

		return roleWords.length > 0 ? roleWords : this.fallbackRoleWords;
	});

	readonly contentRequested = output<void>();

	constructor() {
		if (!this.isBrowser) {
			return;
		}

		afterNextRender(() => {
			const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
			const syncMotionPreference = () => this.prefersReducedMotion.set(motionPreference.matches);

			syncMotionPreference();
			motionPreference.addEventListener('change', syncMotionPreference);
			this.destroyRef.onDestroy(() => motionPreference.removeEventListener('change', syncMotionPreference));
		});
	}

	requestContent(): void {
		this.contentRequested.emit();
	}
}
