import { AfterViewInit, Component } from '@angular/core';
import { Study } from '@core/interface';
import { IntersectionObserverService } from '@core/services';
import studies from '@assets/data/studies.json';

@Component({
	selector: 'app-studies',
	templateUrl: './studies.component.html',
	styleUrls: ['./studies.component.scss']
})
export class StudiesComponent implements AfterViewInit {
	listStudies: Study[] = studies;

	constructor(private intersectionObserverService: IntersectionObserverService) {}

	ngAfterViewInit(): void {
		const options: IntersectionObserverInit = {
			root: null,
			rootMargin: '0px',
			threshold: 0.06
		};

		this.intersectionObserverService.createAnimation(this.listStudies, options);
	}
}
