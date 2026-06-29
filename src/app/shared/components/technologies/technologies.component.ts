import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Technology } from '@core/interface';

@Component({
	selector: 'app-technologies',
	imports: [NgOptimizedImage],
	templateUrl: './technologies.component.html',
	styleUrls: ['./technologies.component.scss']
})
export class TechnologiesComponent {
	readonly technologies = input.required<Technology[]>();
	readonly tooltipClass = input('');
}
