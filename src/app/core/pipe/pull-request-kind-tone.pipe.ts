import { Pipe, PipeTransform } from '@angular/core';
import { AngularPullRequestKind } from '@core/interface';
import { ChipTone } from '@shared/components';

const PULL_REQUEST_KIND_TONES: Record<AngularPullRequestKind, ChipTone> = {
	feature: 'accent',
	refactor: 'info',
	bugfix: 'warning',
	docs: 'github',
	test: 'success',
	other: 'neutral'
};

@Pipe({
	name: 'pullRequestKindTone'
})
export class PullRequestKindTonePipe implements PipeTransform {
	transform(kind: AngularPullRequestKind): ChipTone {
		return PULL_REQUEST_KIND_TONES[kind];
	}
}
