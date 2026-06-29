import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { AddAnimationDirective } from '@core/directives';
import { TranslatePipe } from '@ngx-translate/core';
import { Timeline } from '@core/interface';

@Component({
	selector: 'app-timeline',
	standalone: true,
	imports: [AddAnimationDirective, NgOptimizedImage, TranslatePipe],
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
	readonly animationOptions = input<IntersectionObserverInit | undefined>(undefined);
	readonly listTimeline = input.required<Timeline[]>();
}
