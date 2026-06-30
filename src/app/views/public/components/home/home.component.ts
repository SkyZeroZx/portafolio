import { Component, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

@Component({
	selector: 'app-home',
	imports: [FontAwesomeModule, LanguageSelectorComponent, TranslatePipe],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	readonly faGithub = faGithub;

	readonly contentRequested = output<void>();

	requestContent(): void {
		this.contentRequested.emit();
	}
}
