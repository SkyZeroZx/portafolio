import { Component, ViewChild, ViewContainerRef } from '@angular/core';
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

  handleScroll() {
    if (!this.isScrolling) {
      this.loadAllComponents();
    }
    this.isScrolling = true;
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
