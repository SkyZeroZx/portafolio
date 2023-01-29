import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { IntersectionObserverService } from '@core/services';
import { PortfolioProject } from '@core/interface';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import portFolioProjects from '../../../../../assets/data/portfolio-proyects.json';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements AfterViewInit {
  @ViewChild('swalPortfolio')
  readonly swalPortfolio: SwalComponent;
  @ViewChild('portfolioElement')
  portfolioElement: ElementRef;
  safeURL: SafeResourceUrl;
  portfolioSelected: PortfolioProject;
  listPorfolio: PortfolioProject[] = portFolioProjects;

  constructor(
    public readonly swalPortalTargets: SwalPortalTargets,
    private intersectionObserverService: IntersectionObserverService,
    private domSanitizer: DomSanitizer
  ) {}

  openModal(portfolio: PortfolioProject) {
    this.portfolioSelected = portfolio;
    this.safeURL = this.domSanitizer.bypassSecurityTrustResourceUrl(
      portfolio.preview
    );

    this.swalPortfolio.title = portfolio.name;
    this.swalPortfolio.fire();
  }

  closeModal() {
    this.swalPortfolio.close();
  }

  ngAfterViewInit(): void {
    const element = this.portfolioElement.nativeElement as HTMLElement;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

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
      options,
    });
  }
}
