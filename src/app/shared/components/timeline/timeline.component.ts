import { Component, Input } from '@angular/core';
import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { AddAnimationDirective } from '@core/directives';
import { TranslateModule } from '@ngx-translate/core';
import { Timeline } from '@core/interface';

@Component({
	selector: 'app-timeline',
	standalone: true,
	imports: [NgFor, NgIf, AddAnimationDirective, TranslateModule, NgOptimizedImage],
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
	@Input()
	animationOptions: IntersectionObserverInit;
	@Input({ required: true })
	listTimeline: Timeline[];
}
