import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ShowProyectService {
	private route = inject(ActivatedRoute);
	private document = inject<Document>(DOCUMENT);

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
