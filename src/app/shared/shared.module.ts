import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from '../core/not-found/not-found.component';
import { MapsComponent } from '../modules/maps/maps.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    MapsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
  ],
  entryComponents: [
  ]
})
export class SharedModule { }