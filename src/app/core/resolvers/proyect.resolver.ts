import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, take } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProyectResolver {
	constructor(private route: ActivatedRoute) {}

	getProyect() {
		this.route.queryParams.pipe(take(2), delay(10)).subscribe(async (res) => {
			const proyect: string = res['proyect'];
			if (proyect) {
				this.clickOnScroll();
			}
		});
	}

	clickOnScroll() {
		document.getElementById('scroll-down').click();
	}
}
