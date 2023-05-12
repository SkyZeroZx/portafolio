import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DEFAULT_OPTIONS_OBSERVER } from '@core/constants';

@Injectable({
	providedIn: 'root'
})
export class IntersectionObserverService {
	private readonly renderer2: Renderer2;
	private readonly ANIMATION_DELAY = 100;

	constructor(rendererFactory: RendererFactory2) {
		this.renderer2 = rendererFactory.createRenderer(null, null);
	}

	createAnimation(element: HTMLElement, options = DEFAULT_OPTIONS_OBSERVER) {
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
			setTimeout(() => {
				this.renderer2.removeClass(element, 'visibility-hidden');
				this.renderer2.setAttribute(element, 'class', 'slideInUp animated');
				intersectionObserver.unobserve(element);
			}, this.ANIMATION_DELAY);
		}
	}
}
