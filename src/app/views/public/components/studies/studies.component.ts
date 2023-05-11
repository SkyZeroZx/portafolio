import { Component } from '@angular/core';
import { Study } from '@core/interface';
import studies from '@assets/data/studies.json';

@Component({
	selector: 'app-studies',
	templateUrl: './studies.component.html',
	styleUrls: ['./studies.component.scss']
})
export class StudiesComponent {
	listStudies: Study[] = studies;
	animationOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: '0px',
		threshold: 0.06
	};
}
