import { Component, computed, input } from '@angular/core';

type ListSkeletonVariant = 'row' | 'card';

@Component({
	selector: 'app-list-skeleton',
	templateUrl: './list-skeleton.component.html',
	styleUrls: ['./list-skeleton.component.scss']
})
export class ListSkeletonComponent {
	readonly rows = input(4);
	readonly variant = input<ListSkeletonVariant>('row');
	readonly ariaLabel = input('Loading content');

	readonly placeholders = computed(() => Array.from({ length: this.rows() }, (_, index) => index));
}
