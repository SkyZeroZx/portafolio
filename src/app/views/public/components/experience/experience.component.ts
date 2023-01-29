import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { Experience } from '@core/interface';
import { IntersectionObserverService } from '@core/services';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements AfterViewInit {
  listExperience: Experience[] = [
    {
      id: 'experience-1',
      company: 'Novatronic',
      period: 'Octubre 2021 - Actualidad',
      jobTitle: 'Ingeniero de Software I',
      activities: [
        '▪ Creación de Pruebas Unitarias para productos Java',
        '▪ Cumplimiento de métricas de pruebas unitarias en SonarQube con Java',
        '▪ Automatización de dispositivo externos mediante Cypress para FrontEnd Angular',
        '▪ Creación Prototipo PWA en Angular para aplicación OnBoarding',
        '▪ Afiliación exitosa Meta Developers para consumo de API Facebook/WhatsApp',
        '▪ Piloto ChatBot WhatsApp con integración API Meta Developers',
        '▪ Elaboración WebHook para interactuar con eventos de WhatsApp Bussiness',
        '▪ Creación API Rest NestJS para simulación de transacciones y registro mediante WhatsApp',
      ],
    },
    {
      id: 'experience-2',
      company: 'Independiente',
      period: 'Julio 2022 - Actualidad',
      jobTitle: 'Developer FrontEnd Angular',
      activities: [
        '▪ Creación de portal de seguimiento y registro de boletas/facturas de empresa de transportes',
        '▪ Finalización y mantenimiento Portal Gestión de Notas Escolares , corrección de bugs menores',
        '▪ Corrección de bugs en portal de gestión de muestra medicas integrado con Auth0',
      ],
    },
    {
      id: 'experience-3',
      company: 'Novatronic',
      period: 'Enero 2021 - Octubre 2021',
      jobTitle: 'Practicante Ingeniero de Software',
      activities: [
        '▪ Refactorización y Actualización FrontEnd Angular 8 a 12',
        '▪ Creación de Pruebas Unitarias con Jasmine/Karma para cobertura de código en SonarQube',
        '▪ Piloto Automatización Pruebas E2E en FrontEnd Angular con Cypress',
      ],
    },
  ];

  constructor(
    private intersectionObserverService: IntersectionObserverService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    for (const experience of this.listExperience) {
      const element = this.document.querySelector(`#${experience.id}`);
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
