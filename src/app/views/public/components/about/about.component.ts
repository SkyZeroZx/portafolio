import { Component } from '@angular/core';
import { Certification, Technology } from '@core/interface';
import technologies from '@assets/data/technologies.json';
import certifications from '@assets/data/certifications.json';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent {
	listTechnologies: Technology[] = technologies;
	listCertifications: Certification[] = certifications;
}
