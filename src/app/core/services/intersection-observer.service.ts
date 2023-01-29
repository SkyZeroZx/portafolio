import { Injectable } from '@angular/core';
import { CreateIntersectionObserver } from '@core/interface';
import { DEFAULT_OPTIONS_OBSERVER } from '@core/constants';

@Injectable({
  providedIn: 'root',
})
export class IntersectionObserverService {
  create(createIntersectionObserver: CreateIntersectionObserver) {
    const { callback, options, element } = createIntersectionObserver;
    const interceptionObserverOptions = options ?? DEFAULT_OPTIONS_OBSERVER;
    const observer = new IntersectionObserver(
      callback,
      interceptionObserverOptions
    );

    return observer.observe(element);
  }
}
