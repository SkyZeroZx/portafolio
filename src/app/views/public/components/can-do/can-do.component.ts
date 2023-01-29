import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  faMobile,
  faLaptop,
  faVialCircleCheck,
  faInfinity,
} from '@fortawesome/free-solid-svg-icons';
import { IntersectionObserverService } from '@core/services';

@Component({
  selector: 'app-can-do',
  templateUrl: './can-do.component.html',
  styleUrls: ['./can-do.component.scss'],
})
export class CanDoComponent implements AfterViewInit {
  faMobile = faMobile;
  faLaptop = faLaptop;
  faVialCircleCheck = faVialCircleCheck;
  faInfinity = faInfinity;
  @ViewChild('canDo')
  canDo: ElementRef;

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {}

  ngAfterViewInit(): void {
    const conDoElement = this.canDo.nativeElement as HTMLElement;
    const callbackCanDo = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          conDoElement.classList.remove('visibility-hidden');
          conDoElement.classList.add('slideInUp');
          conDoElement.classList.add('animated');
        }
      });
    };

    this.intersectionObserverService.create({
      callback: callbackCanDo,
      element: conDoElement,
    });
  }
}
