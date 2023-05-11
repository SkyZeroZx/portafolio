import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { IntersectionObserverService } from '../services';

@Directive({
	selector: '[appAddAnimation]',
	standalone: true
})
export class AddAnimationDirective implements OnInit {
	@Input()
	animationOptions: IntersectionObserverInit;

	constructor(private elementRef: ElementRef, private intersectionObserverService: IntersectionObserverService) {}

	ngOnInit(): void {
		const element = this.elementRef.nativeElement as HTMLElement;

		this.intersectionObserverService.createAnimation(element, this.animationOptions);
	}
}
