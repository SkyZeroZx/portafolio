import { Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout';

export const routes: Routes = [
	{
		path: '',
		component: ContentLayoutComponent,
		children: [
			{
				path: '',
				loadComponent: () => import('./views/public/public.component').then((m) => m.PublicComponent),
				title: 'Jaime Burgos Tejada'
			}
		]
	},
	{
		path: '**',
		redirectTo: ''
	}
];
