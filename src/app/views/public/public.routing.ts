import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

export const publicRoutes: Routes = [
  {
    path: '',
    component: PublicComponent,
    data: {},
  },
];

@NgModule({
  imports: [RouterModule.forChild(publicRoutes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
