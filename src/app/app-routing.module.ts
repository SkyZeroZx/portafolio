import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/views/public/public.module').then(
            (m) => m.PublicModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
