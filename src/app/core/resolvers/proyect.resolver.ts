import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Resolve } from '@angular/router';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProyectResolver implements Resolve<void> {
  constructor(
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {}

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

  showProyect(proyect: string) {
    setTimeout(() => {
      this.document.getElementById('scroll-down').click();
    });

    setTimeout(() => {
      this.document.getElementById(proyect).click();
    }, 100);
  }
}
