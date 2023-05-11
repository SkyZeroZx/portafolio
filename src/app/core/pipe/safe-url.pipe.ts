import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
	name: 'safeUrl',
	standalone: true
})
export class SafeUrlPipe implements PipeTransform {
	constructor(protected sanitizer: DomSanitizer) {}

	public transform(value: string, type: string): SafeUrl | SafeResourceUrl {
		switch (type) {
			case 'url':
				return this.sanitizer.bypassSecurityTrustUrl(value);
			case 'resourceUrl':
				return this.sanitizer.bypassSecurityTrustResourceUrl(value);
			default:
				throw new Error(`Invalid safe type specified: ${type}`);
		}
	}
}
