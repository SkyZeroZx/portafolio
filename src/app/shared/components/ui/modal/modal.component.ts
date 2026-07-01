import { Component, input, output } from '@angular/core';

@Component({
	selector: 'app-modal',
	host: {
		'(document:keydown.escape)': 'closeFromEscape($event)'
	},
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
	readonly open = input(false);
	readonly closed = output<void>();

	closeFromEscape(event: Event): void {
		if (!this.open()) {
			return;
		}

		event.preventDefault();
		this.closed.emit();
	}
}
