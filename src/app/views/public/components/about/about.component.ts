import { Component } from '@angular/core';
import { Technology } from '@core/interface';
import technologies from '@assets/data/technologies.json';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent {
	listTechnologies: Technology[] = technologies;
}
