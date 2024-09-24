import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [

   
    {
        path: 'administrador',
        loadChildren: () => import('../../pages/admin/admin.module').then(m => m.AdminModule),
    },
    /*{
        path: 'responsable',
        loadChildren: () => import('../../pages/responsable/responsable.module').then(m => m.ResponsableModule),
    }
    {
        path: 'solicitante',
        loadChildren: () => import('../../pages/solicitante/solicitante.module').then(m => m.SolicitanteModule),
    },
    */
    //Component
   
    
];
