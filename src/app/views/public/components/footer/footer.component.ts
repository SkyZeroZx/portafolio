import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { AddAnimationDirective } from '@core/directives';

@Component({
	selector: 'app-footer',
	imports: [AddAnimationDirective, DatePipe, FontAwesomeModule],
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
	faGithub = faGithub;
	faLinkedinIn = faLinkedin;
	date = new Date();
}
