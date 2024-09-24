import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);

  let user = authService.getUser();

  if(user){

    if(user.roles.includes('Administrador')){
      return true;
    }
    else{
      authService.logout();
      return router.createUrlTree(['/login'],{ queryParams : { returnUrl: state.url }});
    }
  }
  else{
    authService.logout();
    return router.createUrlTree(['/login'],{ queryParams : { returnUrl: state.url }});
  }
  
};
