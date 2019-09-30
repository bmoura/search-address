import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SendService } from './services/send.service';
import { SharedModule } from '../shared/shared.module';
import localePT from '@angular/common/locales/pt';
import localePTExtra from '@angular/common/locales/extra/pt';

registerLocaleData(localePT, 'pt', localePTExtra);

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    RouterModule,
    HttpClientModule
  ],
  providers: [
    SendService,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
})
export class CoreModule { }