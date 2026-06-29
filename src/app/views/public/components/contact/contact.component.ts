import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { TranslatePipe } from '@ngx-translate/core';
import { AddAnimationDirective } from '@core/directives';

@Component({
	selector: 'app-contact',
	imports: [AddAnimationDirective, FontAwesomeModule, TranslatePipe],
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
	faWhatsapp = faWhatsapp;
	faEnvelope = faEnvelope;
	faLinkedin = faLinkedinIn;
}
