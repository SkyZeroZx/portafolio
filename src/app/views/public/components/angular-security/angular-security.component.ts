import { httpResource } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { AddAnimationDirective } from '@core/directives';
import { AngularCve } from '@core/interface';
import { ANGULAR_ADVISORY_PACKAGES, createAngularAdvisoryRequest, parseAngularAdvisories, uniqueAngularCves } from '@core/utils';
import { ChipComponent, ChipTone, ListSkeletonComponent, PaginatorComponent } from '@shared/components';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
	selector: 'app-angular-security',
	imports: [AddAnimationDirective, ChipComponent, ListSkeletonComponent, PaginatorComponent, TranslatePipe],
	templateUrl: './angular-security.component.html',
	styleUrls: ['../contributions.shared.scss']
})
export class AngularSecurityComponent {
	private readonly advisoryResources = ANGULAR_ADVISORY_PACKAGES.map((packageName) =>
		httpResource(() => createAngularAdvisoryRequest(packageName), {
			defaultValue: [],
			parse: parseAngularAdvisories,
			debugName: `angular-advisories-${packageName}`
		})
	);

	readonly page = signal(1);
	readonly pageSize = 4;

	readonly advisories = computed(() => uniqueAngularCves(this.advisoryResources.map((resource) => resource.value())));
	readonly isLoading = computed(() => this.advisoryResources.some((resource) => resource.isLoading()) && this.advisories().length === 0);
	readonly hasError = computed(() => this.advisoryResources.some((resource) => resource.error()) && this.advisories().length === 0);
	readonly pagedAdvisories = computed(() => {
		const start = (this.page() - 1) * this.pageSize;

		return this.advisories().slice(start, start + this.pageSize);
	});

	setPage(page: number): void {
		this.page.set(page);
	}

	reload(): void {
		this.advisoryResources.forEach((resource) => resource.reload());
	}

	severityTone(severity: AngularCve['severity']): ChipTone {
		if (severity === 'critical' || severity === 'high') {
			return 'danger';
		}

		if (severity === 'medium') {
			return 'warning';
		}

		return 'info';
	}
}
