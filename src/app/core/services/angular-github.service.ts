import { httpResource } from '@angular/common/http';
import { computed, effect, Service, signal } from '@angular/core';
import { AngularPullRequest, AngularPullRequestSearch } from '@core/interface';
import {
	createAngularPullRequestsRequest,
	emptyPullRequestSearch,
	parseAngularPullRequests,
	sortAngularPullRequests
} from '@core/utils/github-api.utils';

export const PULL_REQUEST_CACHE_PAGE_SIZE = 250;
export const PULL_REQUEST_PAGE_SIZE = 4;

const GITHUB_SEARCH_API_PAGE_SIZE = 100;

interface PullRequestApiPage {
	page: number;
	search: AngularPullRequestSearch;
}

@Service()
export class AngularGithubService {
	private readonly pullRequestPageState = signal(1);
	private readonly pullRequestApiPageCache = signal(new Map<number, AngularPullRequestSearch>());

	readonly pullRequestPage = this.pullRequestPageState.asReadonly();
	readonly pullRequestPageSize = PULL_REQUEST_PAGE_SIZE;

	private readonly requestedPullRequestCachePage = computed(() =>
		Math.max(1, Math.ceil((this.pullRequestPage() * this.pullRequestPageSize) / PULL_REQUEST_CACHE_PAGE_SIZE))
	);
	private readonly requestedPullRequestApiPage = computed(() =>
		Math.max(1, Math.ceil((this.requestedPullRequestCachePage() * PULL_REQUEST_CACHE_PAGE_SIZE) / GITHUB_SEARCH_API_PAGE_SIZE))
	);
	private readonly missingPullRequestApiPage = computed(() => this.getFirstMissingPullRequestApiPage(this.requestedPullRequestApiPage()));

	private readonly pullRequestsResource = httpResource(
		() => {
			const page = this.missingPullRequestApiPage();

			return page ? createAngularPullRequestsRequest(page, GITHUB_SEARCH_API_PAGE_SIZE) : undefined;
		},
		{
			parse: (value): PullRequestApiPage => ({
				page: this.missingPullRequestApiPage() ?? 1,
				search: parseAngularPullRequests(value)
			}),
			debugName: 'angular-merge-label-prs'
		}
	);

	private readonly cachedPullRequestSearch = computed(() => this.getMergedPullRequestsUntilApiPage(this.requestedPullRequestApiPage()));

	readonly pullRequests = computed(() => {
		const start = (this.pullRequestPage() - 1) * this.pullRequestPageSize;

		return this.cachedPullRequestSearch().pullRequests.slice(start, start + this.pullRequestPageSize);
	});
	readonly totalPullRequests = computed(() => this.cachedPullRequestSearch().totalCount);
	readonly isPullRequestsLoading = computed(() => this.pullRequestsResource.isLoading() && this.pullRequests().length === 0);
	readonly hasPullRequestsError = computed(() => Boolean(this.pullRequestsResource.error()) && this.pullRequests().length === 0);

	constructor() {
		effect(() => {
			if (this.pullRequestsResource.isLoading() || !this.pullRequestsResource.hasValue()) {
				return;
			}

			const { page, search } = this.pullRequestsResource.value();

			this.storePullRequestApiPage(page, search);
		});
	}

	setPullRequestPage(page: number): void {
		this.pullRequestPageState.set(normalizePage(page));
	}

	reloadPullRequests(): void {
		this.clearPullRequestCache();
		this.pullRequestsResource.reload();
	}

	private getFirstMissingPullRequestApiPage(apiPage: number): number | undefined {
		const normalizedApiPage = normalizePage(apiPage);
		const cache = this.pullRequestApiPageCache();

		for (let page = 1; page <= normalizedApiPage; page++) {
			if (!cache.has(page)) {
				return page;
			}
		}

		return undefined;
	}

	private getMergedPullRequestsUntilApiPage(apiPage: number): AngularPullRequestSearch {
		const pullRequestMap = new Map<number, AngularPullRequest>();
		const cachedSearches = this.getCachedSearchesUntilApiPage(apiPage);

		for (const pullRequest of cachedSearches.flatMap(({ pullRequests }) => pullRequests)) {
			pullRequestMap.set(pullRequest.number, pullRequest);
		}

		return {
			totalCount: cachedSearches.find(({ totalCount }) => totalCount > 0)?.totalCount ?? emptyPullRequestSearch.totalCount,
			incompleteResults: cachedSearches.some(({ incompleteResults }) => incompleteResults),
			pullRequests: sortAngularPullRequests([...pullRequestMap.values()])
		};
	}

	private storePullRequestApiPage(page: number, search: AngularPullRequestSearch): void {
		const normalizedPage = normalizePage(page);
		const cache = this.pullRequestApiPageCache();
		const cachedSearch = cache.get(normalizedPage);

		if (cachedSearch === search) {
			return;
		}

		this.pullRequestApiPageCache.set(new Map(cache).set(normalizedPage, search));
	}

	private clearPullRequestCache(): void {
		if (this.pullRequestApiPageCache().size === 0) {
			return;
		}

		this.pullRequestApiPageCache.set(new Map());
	}

	private getCachedSearchesUntilApiPage(apiPage: number): AngularPullRequestSearch[] {
		const normalizedApiPage = normalizePage(apiPage);
		const cache = this.pullRequestApiPageCache();

		return Array.from({ length: normalizedApiPage }, (_, index) => cache.get(index + 1)).filter(isDefined);
	}
}

function normalizePage(page: number): number {
	return Math.max(1, Math.trunc(page));
}

function isDefined<TValue>(value: TValue | undefined): value is TValue {
	return value !== undefined;
}
