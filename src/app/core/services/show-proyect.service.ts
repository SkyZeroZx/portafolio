import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ShowProyectService {
	constructor(private route: ActivatedRoute, @Inject(DOCUMENT) private document: Document) {}

	resolve() {
		this.getProyect();
	}

	getProyect() {
		this.route.queryParams.pipe(take(2)).subscribe((res) => {
			const proyect = res['proyect'];
			if (proyect) {
				this.showProyect(proyect);
			}
		});
	}

	showProyect(proyectId: string) {
		setTimeout(() => {
			this.document.getElementById(proyectId).click();
		}, 100);
	}
}
