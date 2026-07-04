import { Component, inject } from '@angular/core';
import { AddAnimationDirective } from '@core/directives';
import { PullRequestKindTonePipe } from '@core/pipe';
import { AngularGithubService } from '@core/services';
import { ChipComponent, ListSkeletonComponent, PaginatorComponent } from '@shared/components';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
	selector: 'app-angular-prs',
	imports: [AddAnimationDirective, ChipComponent, ListSkeletonComponent, PaginatorComponent, PullRequestKindTonePipe, TranslatePipe],
	templateUrl: './angular-prs.component.html',
	styleUrls: ['../contributions.shared.scss']
})
export class AngularPrsComponent {
	private readonly githubService = inject(AngularGithubService);

	readonly page = this.githubService.pullRequestPage;
	readonly pageSize = this.githubService.pullRequestPageSize;
	readonly pullRequests = this.githubService.pullRequests;
	readonly totalCount = this.githubService.totalPullRequests;
	readonly isLoading = this.githubService.isPullRequestsLoading;
	readonly hasError = this.githubService.hasPullRequestsError;

	setPage(page: number): void {
		this.githubService.setPullRequestPage(page);
	}

	reload(): void {
		this.githubService.reloadPullRequests();
	}
}
