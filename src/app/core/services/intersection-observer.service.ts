import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { CreateIntersectionObserver, ElementAnimation } from '@core/interface';
import { DEFAULT_OPTIONS_OBSERVER } from '@core/constants';
import { DOCUMENT } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class IntersectionObserverService {
	private readonly renderer2: Renderer2;
	constructor(@Inject(DOCUMENT) private document: Document, rendererFactory: RendererFactory2) {
		this.renderer2 = rendererFactory.createRenderer(null, null);
	}

	private createIntersectionObserver(createIntersectionObserver: CreateIntersectionObserver) {
		const { callback, options, element } = createIntersectionObserver;
		const interceptionObserverOptions = options ?? DEFAULT_OPTIONS_OBSERVER;
		const observer = new IntersectionObserver(callback, interceptionObserverOptions);

		return observer.observe(element);
	}

	createAnimation(listElementAnimation: ElementAnimation[], options = DEFAULT_OPTIONS_OBSERVER) {
		for (const elementAnimation of listElementAnimation) {
			const element = this.document.querySelector<HTMLElement>(`#${elementAnimation.id}`);

			const callback = (entries: IntersectionObserverEntry[]) => {
				entries.forEach(({ isIntersecting }) => {
					if (isIntersecting) {
						setTimeout(() => {
							this.renderer2.removeClass(element, 'visibility-hidden');
							this.renderer2.addClass(element, 'slideInUp');
							this.renderer2.addClass(element, 'animated');
						}, 100);
					}
				});
			};

			this.createIntersectionObserver({
				callback,
				element,
				options
			});
		}
	}
}
