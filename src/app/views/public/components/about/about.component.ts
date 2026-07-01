import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Certification, Technology } from '@core/interface';
import technologiesData from '@assets/data/technologies.json';
import certificationsData from '@assets/data/certifications.json';
import { AddAnimationDirective } from '@core/directives';
import { TechnologiesComponent } from '@shared/components';

@Component({
	selector: 'app-about',
	imports: [AddAnimationDirective, NgOptimizedImage, TechnologiesComponent, TranslatePipe],
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent {
	readonly technologies = signal<Technology[]>(
		technologiesData.filter(({ name }) =>
			[
				'Typescript',
				'Angular',
				'NestJS',
				'Spring Boot',
				'Nx',
				'NodeJS',
				'Docker',
				'AWS',
				'Google Cloud',
				'PostgreSQL',
				'MongoDB',
				'Redis',
				'Cypress',
				'Jest'
			].includes(name)
		)
	);
	readonly certifications = signal<Certification[]>(certificationsData);
}
