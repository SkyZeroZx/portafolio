import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  AboutComponent,
  CanDoComponent,
  ContactComponent,
  ExperienceComponent,
  FooterComponent,
  PortfolioComponent,
  StudiesComponent,
} from './components';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent {
  @ViewChild('component', { read: ViewContainerRef })
  component: ViewContainerRef;
  isScrolling: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2
  ) {}

  handleScroll() {
    if (!this.isScrolling) {
      this.setBackground();
      this.loadAllComponents();
    }
    this.isScrolling = true;
  }

  private setBackground() {
    const bodyElement = this.document.getElementsByTagName('body')[0];
    const backgroundImage = new Image();
    backgroundImage.src = '/assets/images/home1-bg.jpg';
    backgroundImage.onload = () => {
      this.renderer2.removeClass(bodyElement, 'background-preview');
      this.renderer2.addClass(bodyElement, 'background-body');
    };
  }

  private loadAllComponents() {
    this.loadCanDo();
    this.loadAbout();
    this.loadExperience();
    this.loadStudies();
    this.loadPortfolio();
    this.loadContact();
    this.loadFooter();
  }

  private loadCanDo() {
    this.component.createComponent(CanDoComponent);
  }

  private loadAbout(): void {
    this.component.createComponent(AboutComponent);
  }

  private loadExperience(): void {
    this.component.createComponent(ExperienceComponent);
  }

  private loadStudies(): void {
    this.component.createComponent(StudiesComponent);
  }

  private loadPortfolio(): void {
    this.component.createComponent(PortfolioComponent);
  }

  private loadContact(): void {
    this.component.createComponent(ContactComponent);
  }

  private loadFooter(): void {
    this.component.createComponent(FooterComponent);
  }
}
