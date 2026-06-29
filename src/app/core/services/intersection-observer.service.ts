import { Injectable, Renderer2, RendererFactory2, inject } from '@angular/core';
import { DEFAULT_OPTIONS_OBSERVER } from '@core/constants';

@Injectable({
	providedIn: 'root'
})
export class IntersectionObserverService {
	private readonly renderer2: Renderer2;

	constructor() {
		const rendererFactory = inject(RendererFactory2);

		this.renderer2 = rendererFactory.createRenderer(null, null);
	}

	createAnimation(element: HTMLElement, options = DEFAULT_OPTIONS_OBSERVER) {
		if (typeof IntersectionObserver === 'undefined') {
			this.showElement(element);
			return;
		}

		const callback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(({ isIntersecting }) => {
				this.addAnimation(isIntersecting, element, intersectionObserver);
			});
		};

		const intersectionObserver = new IntersectionObserver(callback, options);
		intersectionObserver.observe(element);
	}

	private addAnimation(isIntersecting: boolean, element: HTMLElement, intersectionObserver: IntersectionObserver) {
		if (isIntersecting) {
			this.showElement(element);
			intersectionObserver.unobserve(element);
		}
	}

	private showElement(element: HTMLElement): void {
		this.renderer2.removeClass(element, 'visibility-hidden');
		this.renderer2.addClass(element, 'slideInUp');
		this.renderer2.addClass(element, 'animated');
	}
}
