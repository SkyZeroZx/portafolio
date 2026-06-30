import { AngularCve, AngularPullRequest, AngularPullRequestLabel, AngularPullRequestSearch } from '@core/interface';

const SKYZEROZX_LOGIN = 'SkyZeroZx';
const GITHUB_REST_URL = 'https://api.github.com';

export const ANGULAR_ADVISORY_PACKAGES = [
	'@angular/core',
	'@angular/common',
	'@angular/compiler',
	'@angular/platform-server',
	'@angular/service-worker'
];

export const ANGULAR_MERGE_LABEL_PULL_REQUESTS_QUERY = 'repo:angular/angular author:SkyZeroZx is:pr label:"action: merge"';

export const emptyPullRequestSearch: AngularPullRequestSearch = {
	totalCount: 0,
	incompleteResults: false,
	pullRequests: []
};

export function createAngularAdvisoryRequest(packageName: string) {
	return {
		url: `${GITHUB_REST_URL}/advisories`,
		params: {
			ecosystem: 'npm',
			affects: packageName,
			per_page: 100
		},
		timeout: 2_000
	};
}

export function createAngularPullRequestsRequest(page: number, pageSize: number) {
	return {
		url: `${GITHUB_REST_URL}/search/issues`,
		params: {
			q: ANGULAR_MERGE_LABEL_PULL_REQUESTS_QUERY,
			sort: 'updated',
			order: 'desc',
			per_page: pageSize,
			page
		},
		timeout: 2_000
	};
}

export function parseAngularAdvisories(value: unknown): AngularCve[] {
	if (!Array.isArray(value)) {
		return [];
	}

	return value
		.filter(hasSkyZeroZxCredit)
		.map((advisory) => mapAdvisory(advisory))
		.filter((advisory): advisory is AngularCve => advisory !== null);
}

export function parseAngularPullRequests(value: unknown): AngularPullRequestSearch {
	if (!isRecord(value)) {
		return emptyPullRequestSearch;
	}

	return {
		totalCount: toNumber(value['total_count']),
		incompleteResults: Boolean(value['incomplete_results']),
		pullRequests: Array.isArray(value['items'])
			? value['items'].map((item) => mapPullRequest(item)).filter((pullRequest): pullRequest is AngularPullRequest => pullRequest !== null)
			: []
	};
}

export function uniqueAngularCves(advisoryGroups: AngularCve[][]): AngularCve[] {
	const advisoryMap = new Map<string, AngularCve>();

	for (const advisory of advisoryGroups.flat()) {
		advisoryMap.set(advisory.ghsa, advisory);
	}

	return [...advisoryMap.values()].sort(
		(first, second) => second.publishedAt.localeCompare(first.publishedAt) || first.cve.localeCompare(second.cve)
	);
}

function mapAdvisory(value: unknown): AngularCve | null {
	if (!isRecord(value)) {
		return null;
	}

	const ghsa = toStringValue(value['ghsa_id']);
	const cve = toStringValue(value['cve_id']) || ghsa;
	const vulnerabilities = Array.isArray(value['vulnerabilities']) ? value['vulnerabilities'] : [];
	const firstPackage = vulnerabilities.map((entry) => (isRecord(entry) ? entry['package'] : null)).find(isRecord);
	const cwes = Array.isArray(value['cwes'])
		? value['cwes'].map((cwe) => (isRecord(cwe) ? toStringValue(cwe['cwe_id']) : '')).filter(Boolean)
		: [];

	if (!ghsa || !cve) {
		return null;
	}

	return {
		ghsa,
		cve,
		packageName: firstPackage ? toStringValue(firstPackage['name']) || 'Angular' : 'Angular',
		severity: normalizeSeverity(value['severity']),
		publishedAt: toDate(value['published_at']),
		summary: toStringValue(value['summary']),
		cwes,
		url: toStringValue(value['html_url']) || `https://github.com/advisories/${ghsa}`
	};
}

function mapPullRequest(value: unknown): AngularPullRequest | null {
	if (!isRecord(value)) {
		return null;
	}

	const number = toNumber(value['number']);
	const url = toStringValue(value['html_url']);
	const pullRequest = isRecord(value['pull_request']) ? value['pull_request'] : null;
	const labels = Array.isArray(value['labels'])
		? value['labels'].map((label) => mapLabel(label)).filter((label): label is AngularPullRequestLabel => label !== null)
		: [];

	if (!number || !url) {
		return null;
	}

	return {
		number,
		title: toStringValue(value['title']),
		url,
		completedAt: toDate(pullRequest?.['merged_at'] || value['closed_at'] || value['updated_at']),
		labels: labels
			.filter(
				(label) =>
					label.name === 'action: merge' ||
					label.name.startsWith('area:') ||
					label.name.startsWith('target:') ||
					label.name === 'security' ||
					label.name.startsWith('merge:')
			)
			.slice(0, 5)
	};
}

function mapLabel(value: unknown): AngularPullRequestLabel | null {
	if (!isRecord(value)) {
		return null;
	}

	const name = toStringValue(value['name']);
	const color = normalizeHex(toStringValue(value['color']));
	const [red, green, blue] = hexToRgb(color);
	const textColor = createReadableLabelText([red, green, blue]);

	if (!name) {
		return null;
	}

	return {
		name,
		color: `#${color}`,
		textColor,
		backgroundColor: `rgba(${red}, ${green}, ${blue}, 0.16)`,
		borderColor: `rgba(${red}, ${green}, ${blue}, 0.44)`
	};
}

function hasSkyZeroZxCredit(value: unknown): boolean {
	if (!isRecord(value) || !Array.isArray(value['credits'])) {
		return false;
	}

	return value['credits'].some((credit) => isRecord(credit) && isRecord(credit['user']) && credit['user']['login'] === SKYZEROZX_LOGIN);
}

function createReadableLabelText([red, green, blue]: [number, number, number]): string {
	const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

	if (luminance > 0.52) {
		return `rgb(${red}, ${green}, ${blue})`;
	}

	return `rgb(${Math.round(red + (255 - red) * 0.58)}, ${Math.round(green + (255 - green) * 0.58)}, ${Math.round(blue + (255 - blue) * 0.58)})`;
}

function normalizeHex(value: string): string {
	const cleanValue = value.replace(/[^0-9a-f]/gi, '').slice(0, 6);

	return cleanValue.length === 6 ? cleanValue : '3dcafd';
}

function hexToRgb(hex: string): [number, number, number] {
	return [Number.parseInt(hex.slice(0, 2), 16), Number.parseInt(hex.slice(2, 4), 16), Number.parseInt(hex.slice(4, 6), 16)];
}

function normalizeSeverity(value: unknown): AngularCve['severity'] {
	return value === 'low' || value === 'medium' || value === 'high' || value === 'critical' ? value : 'medium';
}

function toDate(value: unknown): string {
	return toStringValue(value).slice(0, 10);
}

function toStringValue(value: unknown): string {
	return typeof value === 'string' ? value.trim() : '';
}

function toNumber(value: unknown): number {
	return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}
