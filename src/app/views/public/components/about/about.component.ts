import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Technology } from '@core/interface';
import { IntersectionObserverService } from '@core/services';
import technologies from '../../../../../assets/data/technologies.json';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('about')
  about: ElementRef;

  listTechnologies: Technology[] = technologies;

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {}

  ngAfterViewInit(): void {
    const aboutElement = this.about.nativeElement as HTMLElement;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutElement.classList.remove('visibility-hidden');
          aboutElement.classList.add('slideInUp');
          aboutElement.classList.add('animated');
        }
      });
    };

    this.intersectionObserverService.create({
      callback,
      element: aboutElement,
    });
  }
}
