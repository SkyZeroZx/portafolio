import { Component } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
	faWhatsapp = faWhatsapp;
	faEnvelope = faEnvelope;
	faLinkedin = faLinkedinIn;
}
