import { Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { IntersectionObserverService } from '../services';

@Directive({
	selector: '[appAddAnimation]'
})
export class AddAnimationDirective {
	private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	private intersectionObserverService = inject(IntersectionObserverService);

	readonly animationOptions = input<IntersectionObserverInit | undefined>(undefined);

	constructor() {
		afterNextRender(() => {
			const element = this.elementRef.nativeElement;
			this.intersectionObserverService.createAnimation(element, this.animationOptions());
		});
	}
}
