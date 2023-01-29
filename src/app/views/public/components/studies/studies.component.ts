import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { Study } from '@core/interface';
import { IntersectionObserverService } from '@core/services';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss'],
})
export class StudiesComponent implements AfterViewInit {
  listStudies: Study[] = [
    {
      id: 'study-1',
      grade: 'Bachiller',
      institution: 'Universidad Nacional del Callao',
      name: 'Ingenieria de Sistemas',
      duration: 'Julio 2016 - Agosto 2021',
      description:
        'Egresado en primeros primeros puestos en cuadro de honor de la universidad',
    },
    {
      id: 'study-2',
      institution: 'Sistemas UNI',
      name: 'Administración en Oracle DB',
      duration: 'Enero 2019 - Marzo 2019',
    },
    {
      id: 'study-3',
      institution: 'Sistemas UNI',
      name: 'Excel Basico - Avanzado',
      duration: 'Octubre 2019 - Diciembre 2019',
    },
    {
      id: 'study-4',
      institution: 'Sistemas UNI',
      name: 'Angular Developer',
      duration: 'Septiembre 2020 - Octubre 2020',
    },
    {
      id: 'study-5',
      institution: 'PUCP',
      name: 'MS Project Basado en el PMBOK',
      duration: 'Septiembre 2020 - Octubre 2020',
    },
    {
      id: 'study-6',
      institution: 'Sistemas UNI',
      name: 'Business Intelligence MS SQL Server 2016',
      duration: 'Junio 2021 - Noviembre 2021',
    },
    {
      id: 'study-7',
      institution: 'Sistemas UNI',
      name: 'Gestion de Proyectos',
      duration: 'Mayo 2022 - Agosto 2022',
    },
  ];

  constructor(
    private intersectionObserverService: IntersectionObserverService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    for (const study of this.listStudies) {
      const element = this.document.querySelector(`#${study.id}`);
      const callback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.remove('visibility-hidden');
              element.classList.add('slideInUp');
              element.classList.add('animated');
            }, 200);
          }
        });
      };

      this.intersectionObserverService.create({
        callback,
        element,
      });
    }
  }
}
