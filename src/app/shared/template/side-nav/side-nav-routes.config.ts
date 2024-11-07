import {
  SideNavInterface
} from '../../interfaces/side-nav.type';

export const AdminRoutes: SideNavInterface[] = [
  
  {
    path: 'administrador/dashboard',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: 'administrador/servicios',
    title: 'Servicios',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: 'administrador/proveedores',
    title: 'Proveedores',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: 'administrador/gruas',
    title: 'Gruas',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: 'administrador/usuarios',
    title: 'Usuarios',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: 'administrador/clientes',
    title: 'Clientes',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: 'administrador/reportes',
    title: 'Reportes',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[
      {
        path: 'administrador/reporte-pagos',
        title: 'Pagos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      },
      {
      path: 'administrador/reporte-servicios',
      title: 'Servicios',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: '',
      submenu:[]
    },]
  }
]

export const MercaderiaRoutes: SideNavInterface[] = [
  
  {
    path: 'mercaderia/dashboard',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
},
{
  path: 'mercaderia/ordenes-compra',
  title: 'Ordenes de compra',
  iconType: 'nzIcon',
  iconTheme: 'outline',
  icon: '',
  submenu:[]
},
{
  path: 'mercaderia/citas',
  title: 'Citas',
  iconType: 'nzIcon',
  iconTheme: 'outline',
  icon: '',
  submenu:[
    {
      path: 'mercaderia/citas',
      title: 'Agenda',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: '',
      submenu:[]
    },
    {
    path: 'mercaderia/citas/nueva-cita',
    title: 'Registrar cita',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },]
}
]

  export const ClienteRoutes: SideNavInterface[] = [
  
    {
      path: 'cliente/dashboard',
      title: 'Dashboard',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'home',
      submenu:[]
    },
   
]

  export const SupervisorRoutes: SideNavInterface[] = [

    {
      path: 'supervisor/dashboard',
      title: 'Dashboard',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'appstore-add',
      submenu:[]
    },
]
