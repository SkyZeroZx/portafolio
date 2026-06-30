export interface AngularCve {
	ghsa: string;
	cve: string;
	packageName: string;
	severity: 'low' | 'medium' | 'high' | 'critical';
	publishedAt: string;
	summary: string;
	cwes: string[];
	url: string;
}
