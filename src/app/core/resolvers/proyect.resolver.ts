import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProyectResolver {
	constructor(private route: ActivatedRoute, @Inject(DOCUMENT) private document: Document) {}

	resolve() {
		this.getProyect();
	}

	getProyect() {
		this.route.queryParams.pipe(take(2)).subscribe((res) => {
			const proyect = res['proyect'];
			if (proyect) {
				this.clickOnScroll();
			}
		});
	}

	clickOnScroll() {
		setTimeout(() => {
			this.document.getElementById('scroll-down').click();
		});
	}
}
