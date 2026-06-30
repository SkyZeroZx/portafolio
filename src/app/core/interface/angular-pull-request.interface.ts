export interface AngularPullRequestLabel {
	name: string;
	color: string;
	textColor: string;
	backgroundColor: string;
	borderColor: string;
}

export interface AngularPullRequest {
	number: number;
	title: string;
	url: string;
	completedAt: string;
	labels: AngularPullRequestLabel[];
}

export interface AngularPullRequestSearch {
	totalCount: number;
	incompleteResults: boolean;
	pullRequests: AngularPullRequest[];
}
