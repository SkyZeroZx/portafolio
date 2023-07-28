import { Component, OnInit, ViewChild } from '@angular/core';
import { PortfolioProject } from '@core/interface';
import { Subject } from 'rxjs';
import { ModalComponent } from '@shared/components';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
	@ViewChild('modalComponent')
	readonly modalComponent: ModalComponent;
	portfolioSelected: PortfolioProject;
	private readonly isLoadProject = new Subject<boolean>();
	private readonly isCloseModal = new Subject<boolean>();

	ngOnInit(): void {
		this.isLoadProject.next(true);
		this.isLoadProject.complete();
	}

	get isLoadProject$() {
		return this.isLoadProject.asObservable();
	}
	get isCloseModal$() {
		return this.isCloseModal.asObservable();
	}

	openModal(portfolio: PortfolioProject) {
		this.portfolioSelected = portfolio;
		setTimeout(() => {
			this.modalComponent.open();
		}, 100);
	}

	closeModal() {
		this.modalComponent.close();
		this.isCloseModal.next(true);
		this.isCloseModal.complete();
	}
}
