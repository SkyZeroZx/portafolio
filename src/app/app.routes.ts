import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ProyectResolver } from '@core/resolvers';
import { ContentLayoutComponent } from './layout';

export const routes: Routes = [
	{
		path: '',
		component: ContentLayoutComponent,
		children: [
			{
				path: '',
				loadComponent: () => import('./views/public/public.component').then((m) => m.PublicComponent),
				resolve: { proyect: () => inject(ProyectResolver).getProyect() },
				title: 'Jaime Burgos Tejada'
			}
		]
	},
	{
		path: '**',
		redirectTo: ''
	}
];
