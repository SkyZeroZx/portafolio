import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { PortfolioProject } from '@core/interface';
import { SafeUrlPipe } from '@core/pipe';
import { ModalComponent, TechnologiesComponent } from '@shared/components';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
	selector: 'app-project',
	imports: [ModalComponent, NgTemplateOutlet, SafeUrlPipe, TechnologiesComponent, TranslatePipe],
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
	readonly portfolio = input.required<PortfolioProject>();
	readonly closeModal = input.required<() => void>();

	close(): void {
		this.closeModal()();
	}
}
