import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Certification, Technology } from '@core/interface';
import technologies from '@assets/data/technologies.json';
import certifications from '@assets/data/certifications.json';
import { AddAnimationDirective } from '@core/directives';
import { TechnologiesComponent } from '@shared/components';

@Component({
	selector: 'app-about',
	imports: [AddAnimationDirective, NgOptimizedImage, TechnologiesComponent, TranslatePipe],
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent {
	listTechnologies: Technology[] = technologies;
	listCertifications: Certification[] = certifications;
}
