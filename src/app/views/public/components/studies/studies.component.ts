import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Study, Timeline } from '@core/interface';
import studiesData from '@assets/data/studies.json';
import { TimelineComponent } from '@shared/components';

@Component({
	selector: 'app-studies',
	imports: [TimelineComponent, TranslatePipe],
	templateUrl: './studies.component.html',
	styleUrls: ['./studies.component.scss']
})
export class StudiesComponent {
	readonly studies = signal<Timeline[]>(
		studiesData.map((study: Study) => {
			return {
				id: study.id,
				title: study.name,
				subTitle: study.institution,
				period: study.period,
				descriptions: study.description
			};
		})
	);
}
