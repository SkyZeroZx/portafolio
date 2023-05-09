import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectResolver } from '@core/resolvers';
import { PublicComponent } from './public.component';

export const publicRoutes: Routes = [
	{
		path: '',
		component: PublicComponent,
		resolve: { proyect: () => inject(ProyectResolver).resolve() }
	}
];

@NgModule({
	imports: [RouterModule.forChild(publicRoutes)],
	exports: [RouterModule]
})
export class PublicRoutingModule {}
