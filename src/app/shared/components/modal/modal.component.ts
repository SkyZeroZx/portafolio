import { Component } from '@angular/core';

@Component({
	selector: 'app-modal',
	standalone: true,
	imports: [],
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
	display = true;

	open() {
		this.display = true;
	}

	close() {
		this.display = false;
	}
}
