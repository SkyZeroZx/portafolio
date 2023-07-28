import { Component, Output, EventEmitter } from '@angular/core';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	faWhatsApp = faWhatsapp;

	typpingList: string[] = ['Jaime Burgos', 'Software Engineer', 'Developer'];
	@Output() isLoad = new EventEmitter<void>();

	emitLoad(): void {
		this.isLoad.emit();
	}
}
