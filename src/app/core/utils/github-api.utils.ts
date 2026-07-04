import { AngularCve, AngularPullRequest, AngularPullRequestKind, AngularPullRequestLabel, AngularPullRequestSearch } from '@core/interface';

const SKYZEROZX_LOGIN = 'SkyZeroZx';
const GITHUB_REST_URL = 'https://api.github.com';
const DEFAULT_LABEL_COLOR = '3dcafd';
const VISIBLE_PULL_REQUEST_LABELS: readonly string[] = ['action: merge', 'security'];
const VISIBLE_PULL_REQUEST_LABEL_PREFIXES: readonly string[] = ['type:', 'area:', 'target:', 'merge:'];
const SEVERITY_PRIORITY: Record<AngularCve['severity'], number> = {
	critical: 0,
	high: 1,
	medium: 2,
	low: 3
};
const PULL_REQUEST_KIND_PRIORITY: Record<AngularPullRequestKind, number> = {
	feature: 0,
	refactor: 1,
	bugfix: 2,
	docs: 3,
	test: 4,
	other: 5
};
const PULL_REQUEST_KIND_RULES: Array<{
	kind: Exclude<AngularPullRequestKind, 'other'>;
	labelIncludes: readonly string[];
	labels: readonly string[];
	titlePattern: RegExp;
}> = [
	{
		kind: 'feature',
		labels: ['type: feature', 'feature'],
		labelIncludes: ['feature'],
		titlePattern: /(^|\W)(feat|feature)(\(|:|\s)/
	},
	{
		kind: 'refactor',
		labels: ['type: refactor', 'refactor'],
		labelIncludes: ['refactor'],
		titlePattern: /(^|\W)refactor(\(|:|\s)/
	},
	{
		kind: 'bugfix',
		labels: ['type: bug', 'type: fix', 'bug', 'bugfix'],
		labelIncludes: ['bug', 'fix'],
		titlePattern: /(^|\W)(fix|bugfix|bug)(\(|:|\s)/
	},
	{
		kind: 'docs',
		labels: ['type: docs', 'type: documentation', 'docs'],
		labelIncludes: ['documentation'],
		titlePattern: /(^|\W)(docs|doc)(\(|:|\s)/
	},
	{
		kind: 'test',
		labels: ['type: test', 'type: tests', 'test'],
		labelIncludes: ['testing'],
		titlePattern: /(^|\W)(test|tests)(\(|:|\s)/
	}
];

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

export function createAngularAdvisoryRequest(packageNames: readonly string[]) {
	return {
		url: `${GITHUB_REST_URL}/advisories`,
		params: {
			ecosystem: 'npm',
			affects: packageNames.join(','),
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
		.filter(isDefined);
}

export function parseAngularPullRequests(value: unknown): AngularPullRequestSearch {
	if (!isRecord(value)) {
		return emptyPullRequestSearch;
	}

	return {
		totalCount: toNumber(value['total_count']),
		incompleteResults: Boolean(value['incomplete_results']),
		pullRequests: readArray(value['items'])
			.map((item) => mapPullRequest(item))
			.filter(isDefined)
	};
}

export function uniqueAngularCves(advisoryGroups: AngularCve[][]): AngularCve[] {
	const advisoryMap = new Map<string, AngularCve>();

	for (const advisory of advisoryGroups.flat()) {
		advisoryMap.set(advisory.ghsa, advisory);
	}

	return sortAngularCves([...advisoryMap.values()]);
}

export function sortAngularCves(advisories: readonly AngularCve[]): AngularCve[] {
	return [...advisories].sort(
		(first, second) =>
			SEVERITY_PRIORITY[first.severity] - SEVERITY_PRIORITY[second.severity] ||
			second.publishedAt.localeCompare(first.publishedAt) ||
			first.cve.localeCompare(second.cve)
	);
}

export function sortAngularPullRequests(pullRequests: readonly AngularPullRequest[]): AngularPullRequest[] {
	return [...pullRequests].sort(
		(first, second) =>
			PULL_REQUEST_KIND_PRIORITY[first.kind] - PULL_REQUEST_KIND_PRIORITY[second.kind] ||
			second.completedAt.localeCompare(first.completedAt) ||
			second.number - first.number
	);
}

function mapAdvisory(value: unknown): AngularCve | null {
	if (!isRecord(value)) {
		return null;
	}

	const ghsa = toStringValue(value['ghsa_id']);
	const cve = toStringValue(value['cve_id']) || ghsa;
	const vulnerabilities = readArray(value['vulnerabilities']);
	const firstPackage = vulnerabilities.map((entry) => (isRecord(entry) ? entry['package'] : null)).find(isRecord);
	const cwes = readArray(value['cwes'])
		.map((cwe) => (isRecord(cwe) ? toStringValue(cwe['cwe_id']) : ''))
		.filter(Boolean);

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
	const title = toStringValue(value['title']);
	const pullRequest = isRecord(value['pull_request']) ? value['pull_request'] : null;
	const labels = readArray(value['labels'])
		.map((label) => mapLabel(label))
		.filter(isDefined);

	if (!number || !url) {
		return null;
	}

	return {
		number,
		title,
		url,
		completedAt: toDate(pullRequest?.['merged_at'] || value['closed_at'] || value['updated_at']),
		kind: classifyPullRequest(title, labels),
		labels: labels.filter(isVisiblePullRequestLabel).slice(0, 5)
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

function classifyPullRequest(title: string, labels: readonly AngularPullRequestLabel[]): AngularPullRequestKind {
	const normalizedTitle = title.toLowerCase();
	const normalizedLabels = labels.map(({ name }) => name.toLowerCase());
	const matchingRule = PULL_REQUEST_KIND_RULES.find(
		({ labels: ruleLabels, labelIncludes, titlePattern }) =>
			normalizedLabels.some(
				(labelName) => ruleLabels.includes(labelName) || labelIncludes.some((keyword) => labelName.includes(keyword))
			) || titlePattern.test(normalizedTitle)
	);

	return matchingRule?.kind ?? 'other';
}

function isVisiblePullRequestLabel({ name }: AngularPullRequestLabel): boolean {
	const normalizedName = name.toLowerCase();

	return (
		VISIBLE_PULL_REQUEST_LABELS.includes(normalizedName) ||
		VISIBLE_PULL_REQUEST_LABEL_PREFIXES.some((prefix) => normalizedName.startsWith(prefix))
	);
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

	return cleanValue.length === 6 ? cleanValue : DEFAULT_LABEL_COLOR;
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

function readArray(value: unknown): unknown[] {
	return Array.isArray(value) ? value : [];
}

function isDefined<TValue>(value: TValue | null | undefined): value is TValue {
	return value !== null && value !== undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}
