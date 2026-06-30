import { Component, input } from '@angular/core';

export type ChipTone = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger' | 'github';
export type ChipSize = 'sm' | 'md';

@Component({
	selector: 'app-chip',
	templateUrl: './chip.component.html',
	styleUrls: ['./chip.component.scss'],
	host: {
		class: 'chip',
		'[class.chip--accent]': "tone() === 'accent'",
		'[class.chip--danger]': "tone() === 'danger'",
		'[class.chip--github]': "tone() === 'github'",
		'[class.chip--info]': "tone() === 'info'",
		'[class.chip--md]': "size() === 'md'",
		'[class.chip--neutral]': "tone() === 'neutral'",
		'[class.chip--sm]': "size() === 'sm'",
		'[class.chip--success]': "tone() === 'success'",
		'[class.chip--truncate]': 'truncate()',
		'[class.chip--warning]': "tone() === 'warning'"
	}
})
export class ChipComponent {
	readonly tone = input<ChipTone>('neutral');
	readonly size = input<ChipSize>('sm');
	readonly truncate = input(false);
}
