import { Component, computed, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

type PageItem = number | 'ellipsis-left' | 'ellipsis-right';

@Component({
	selector: 'app-paginator',
	imports: [TranslatePipe],
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
	readonly ariaLabel = input('Pagination');
	readonly page = input.required<number>();
	readonly pageSize = input.required<number>();
	readonly total = input.required<number>();

	readonly pageChange = output<number>();

	readonly pageCount = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));
	readonly isFirst = computed(() => this.page() <= 1);
	readonly isLast = computed(() => this.page() >= this.pageCount());
	readonly pageItems = computed<PageItem[]>(() => this.createPageItems(this.page(), this.pageCount()));

	isPageNumber(item: PageItem): item is number {
		return typeof item === 'number';
	}

	setPage(page: number): void {
		const nextPage = Math.min(Math.max(page, 1), this.pageCount());

		if (nextPage !== this.page()) {
			this.pageChange.emit(nextPage);
		}
	}

	private createPageItems(page: number, pageCount: number): PageItem[] {
		if (pageCount <= 7) {
			return Array.from({ length: pageCount }, (_, index) => index + 1);
		}

		const pages = new Set([1, pageCount, page - 1, page, page + 1]);

		if (page <= 3) {
			pages.add(2).add(3).add(4);
		}

		if (page >= pageCount - 2) {
			pages
				.add(pageCount - 3)
				.add(pageCount - 2)
				.add(pageCount - 1);
		}

		const sortedPages = [...pages].filter((item) => item >= 1 && item <= pageCount).sort((first, second) => first - second);
		const items: PageItem[] = [];

		for (const currentPage of sortedPages) {
			const previousPage = items.at(-1);

			if (typeof previousPage === 'number' && currentPage - previousPage > 1) {
				items.push(previousPage === 1 ? 'ellipsis-left' : 'ellipsis-right');
			}

			items.push(currentPage);
		}

		return items;
	}
}
