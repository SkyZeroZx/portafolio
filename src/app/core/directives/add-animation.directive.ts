import { Directive, ElementRef, OnInit, inject, input } from '@angular/core';
import { IntersectionObserverService } from '../services';

@Directive({
	selector: '[appAddAnimation]',
	standalone: true
})
export class AddAnimationDirective implements OnInit {
	private elementRef = inject(ElementRef);
	private intersectionObserverService = inject(IntersectionObserverService);

	readonly animationOptions = input<IntersectionObserverInit | undefined>(undefined);

	ngOnInit(): void {
		const element = this.elementRef.nativeElement as HTMLElement;

		this.intersectionObserverService.createAnimation(element, this.animationOptions());
	}
}
