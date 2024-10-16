import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authAdminGuard } from 'src/app/guard/auth-admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PagosComponent } from './reportes/pagos/pagos.component';
import { CrearServicioComponent } from './crear-servicio/crear-servicio.component';
import { ServiceRequestComponent } from './service-request/service-request.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
        title: 'Dashboard',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'servicios',
    component: ServiciosComponent,
    data: {
        title: 'Servicios',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'crear-servicio',
    component: CrearServicioComponent,
    data: {
        title: 'Crear servicio',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'solicitud-servicio/:id',
    component: ServiceRequestComponent,
    data: {
        title: 'Solicitud de servicio',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'proveedores',
    component: ProveedoresComponent,
    data: {
        title: 'Proveedores',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    data: {
        title: 'Clientes',
    },
    
    //canActivate: [authAdminGuard]
  },
  {
    path: 'reporte-pagos',
    component: PagosComponent,
    data: {
        title: 'Reporte pagos',
    },
    
    //canActivate: [authAdminGuard]
  },
  {
    path: 'reporte-servicios',
    component: ServiciosComponent,
    data: {
        title: 'Reporte pagos',
    },
    
    //canActivate: [authAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
