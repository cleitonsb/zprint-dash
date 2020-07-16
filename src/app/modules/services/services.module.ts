import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCreateComponent } from './service-create/service-create.component';
import { ServiceShowComponent } from './service-show/service-show.component';
import { ServiceListComponent } from './service-list/service-list.component';
import {RouterModule} from "@angular/router";
import {ServiceRoutes} from "./services.routing";
import {ComponentsModule} from "../../components/components.module";


@NgModule({
  declarations: [ServiceCreateComponent, ServiceShowComponent, ServiceListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(ServiceRoutes),
        ComponentsModule
    ]
})
export class ServicesModule { }
