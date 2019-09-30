import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { MapsComponent } from '../modules/maps/maps.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MapsComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class CoreRoutingModule { }