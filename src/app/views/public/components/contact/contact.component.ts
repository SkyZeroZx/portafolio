import { AfterViewInit, Component } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { IntersectionObserverService } from '@core/services';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {
	faWhatsapp = faWhatsapp;
	faEnvelope = faEnvelope;
	faLinkedin = faLinkedinIn;

	constructor(private intersectionObserverService: IntersectionObserverService) {}

	ngAfterViewInit(): void {
		const listElementAnimation = [{ id: 'contact' }];
		this.intersectionObserverService.createAnimation(listElementAnimation);
	}
}
