import { Component, input } from '@angular/core';
import { AddAnimationDirective } from '@core/directives';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';
import { Timeline } from '@core/interface';

@Component({
	selector: 'app-timeline',
	imports: [AddAnimationDirective, FontAwesomeModule, TranslatePipe],
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
	readonly animationOptions = input<IntersectionObserverInit | undefined>(undefined);
	readonly compact = input(false);
	readonly listTimeline = input.required<Timeline[]>();
	readonly markerIcon = input<IconDefinition>(faCalendarDays);
}
