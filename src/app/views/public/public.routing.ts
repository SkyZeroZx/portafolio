import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectResolver } from '@core/resolvers';
import { PublicComponent } from './public.component';

export const publicRoutes: Routes = [
  {
    path: '',
    component: PublicComponent,
    resolve: { proyect: ProyectResolver },
    data: {},
  },
];

@NgModule({
  imports: [RouterModule.forChild(publicRoutes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
