import { Component, Input } from '@angular/core';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { Technology } from '@core/interface';

@Component({
	selector: 'app-technologies',
	standalone: true,
	imports: [NgFor, NgOptimizedImage],
	templateUrl: './technologies.component.html',
	styleUrls: ['./technologies.component.scss']
})
export class TechnologiesComponent {
	@Input({ required: true })
	technologies: Technology[];
	@Input()
	class = '';
}
