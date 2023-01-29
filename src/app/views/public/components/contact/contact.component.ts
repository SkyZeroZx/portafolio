import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { IntersectionObserverService } from '@core/services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit {
  faWhatsapp = faWhatsapp;
  faEnvelope = faEnvelope;
  faLinkedin = faLinkedinIn;

  @ViewChild('contact')
  contact: ElementRef;

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {}

  ngAfterViewInit(): void {
    const element = this.contact.nativeElement as HTMLElement;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.classList.remove('visibility-hidden');
          element.classList.add('slideInUp');
          element.classList.add('animated');
        }
      });
    };

    this.intersectionObserverService.create({
      callback,
      element,
    });
  }
}
