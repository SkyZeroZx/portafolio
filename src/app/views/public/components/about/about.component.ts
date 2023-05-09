import { AfterViewInit, Component } from '@angular/core';
import { Technology } from '@core/interface';
import { IntersectionObserverService } from '@core/services';
import technologies from '@assets/data/technologies.json';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {
	listTechnologies: Technology[] = technologies;

	constructor(private intersectionObserverService: IntersectionObserverService) {}

	ngAfterViewInit(): void {
		const listElementAnimation = [{ id: 'about' }];
		this.intersectionObserverService.createAnimation(listElementAnimation);
	}
}
