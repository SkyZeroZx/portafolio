import { httpResource } from '@angular/common/http';
import { Component, computed, linkedSignal, signal } from '@angular/core';
import { AddAnimationDirective } from '@core/directives';
import { AngularPullRequestSearch } from '@core/interface';
import { createAngularPullRequestsRequest, emptyPullRequestSearch, parseAngularPullRequests } from '@core/utils';
import { ChipComponent, ListSkeletonComponent, PaginatorComponent } from '@shared/components';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
	selector: 'app-angular-prs',
	imports: [AddAnimationDirective, ChipComponent, ListSkeletonComponent, PaginatorComponent, TranslatePipe],
	templateUrl: './angular-prs.component.html',
	styleUrls: ['../contributions.shared.scss']
})
export class AngularPrsComponent {
	readonly page = signal(1);
	readonly pageSize = 8;

	readonly pullRequestsResource = httpResource(() => createAngularPullRequestsRequest(this.page(), this.pageSize), {
		defaultValue: emptyPullRequestSearch,
		parse: parseAngularPullRequests,
		debugName: 'angular-merge-label-prs'
	});

	private readonly displayedSearch = linkedSignal<
		{ search: AngularPullRequestSearch; isLoading: boolean; hasError: boolean },
		AngularPullRequestSearch
	>({
		source: () => ({
			search: this.pullRequestsResource.hasValue() ? this.pullRequestsResource.value() : emptyPullRequestSearch,
			isLoading: this.pullRequestsResource.isLoading(),
			hasError: Boolean(this.pullRequestsResource.error())
		}),
		computation: (state, previous) => (state.isLoading || state.hasError ? (previous?.value ?? state.search) : state.search)
	});

	readonly isLoading = computed(() => this.pullRequestsResource.isLoading());
	readonly pullRequests = computed(() => this.displayedSearch().pullRequests);
	readonly totalCount = computed(() => this.displayedSearch().totalCount);
	readonly hasError = computed(() => Boolean(this.pullRequestsResource.error()) && this.pullRequests().length === 0);

	setPage(page: number): void {
		this.page.set(page);
	}

	reload(): void {
		this.pullRequestsResource.reload();
	}
}
