import { AfterViewInit, Component } from '@angular/core';
import { faMobile, faLaptop, faVialCircleCheck, faInfinity } from '@fortawesome/free-solid-svg-icons';
import { IntersectionObserverService } from '@core/services';

@Component({
	selector: 'app-can-do',
	templateUrl: './can-do.component.html',
	styleUrls: ['./can-do.component.scss']
})
export class CanDoComponent implements AfterViewInit {
	faMobile = faMobile;
	faLaptop = faLaptop;
	faVialCircleCheck = faVialCircleCheck;
	faInfinity = faInfinity;

	constructor(private intersectionObserverService: IntersectionObserverService) {}

	ngAfterViewInit(): void {
		const listElementAnimation = [{ id: 'can-do' }];
		this.intersectionObserverService.createAnimation(listElementAnimation);
	}
}
