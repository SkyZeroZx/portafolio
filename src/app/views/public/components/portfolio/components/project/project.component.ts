import { Component, ElementRef, afterNextRender, input, viewChild } from '@angular/core';
import { PortfolioProject } from '@core/interface';
import { SafeUrlPipe } from '@core/pipe';
import { ModalComponent, TechnologiesComponent } from '@shared/components';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
	selector: 'app-project',
	imports: [ModalComponent, SafeUrlPipe, TechnologiesComponent, TranslatePipe],
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
	private readonly closeButton = viewChild.required<ElementRef<HTMLButtonElement>>('closeButton');

	readonly portfolio = input.required<PortfolioProject>();
	readonly closeModal = input.required<() => void>();

	constructor() {
		afterNextRender(() => {
			this.closeButton().nativeElement.focus();
		});
	}

	close(): void {
		this.closeModal()();
	}
}
