import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ClockListComponent } from './clock-list/clock-list.component';
import { ClockSelComponent } from './clock-sel/clock-sel.component';
import { RouterModule } from '@angular/router';
import { ClockRoutes } from './clocks.routing';
import {NgxMaskModule} from 'ngx-mask';
import {FormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [ClockListComponent, ClockSelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ClockRoutes),
    NgxMaskModule.forRoot(),
    FormsModule,
    ComponentsModule,
    NgbModule,
    SweetAlert2Module,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHkmXlJNZI5xnzSnvvG9n5HAM4JnFwPRA'
    }),
  ],
  providers: [
    DatePipe,
  ]
})
export class ClocksModule { }
