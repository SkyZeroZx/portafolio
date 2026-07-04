export interface AngularPullRequestLabel {
	name: string;
	color: string;
	textColor: string;
	backgroundColor: string;
	borderColor: string;
}

export type AngularPullRequestKind = 'feature' | 'refactor' | 'bugfix' | 'docs' | 'test' | 'other';

export interface AngularPullRequest {
	number: number;
	title: string;
	url: string;
	completedAt: string;
	kind: AngularPullRequestKind;
	labels: AngularPullRequestLabel[];
}

export interface AngularPullRequestSearch {
	totalCount: number;
	incompleteResults: boolean;
	pullRequests: AngularPullRequest[];
}
