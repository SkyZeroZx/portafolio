import { Component } from '@angular/core';
import { Study, Timeline } from '@core/interface';
import studies from '@assets/data/studies.json';

@Component({
	selector: 'app-studies',
	templateUrl: './studies.component.html',
	styleUrls: ['./studies.component.scss']
})
export class StudiesComponent {
	listStudies: Timeline[] = studies.map((study: Study) => {
		return {
			id: study.id,
			title: study.name,
			subTitle: study.institution,
			period: study.period,
			descriptions: study.description
		};
	});
}
