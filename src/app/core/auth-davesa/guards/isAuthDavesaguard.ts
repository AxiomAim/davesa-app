import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import { AuthDavesaApiService } from "../auth-davesa-api.service";

export const isAuthDavesaGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    // const removeUserFromStorage = inject(AuthDavesaApiService).removeUserFromStorage();
    const check = inject(AuthDavesaApiService).check();
    const router = inject(Router);
    if (check) {
      return true;
    }
    else {
      const removeUserFromStorage = inject(AuthDavesaApiService).removeFromStorage();
      const redirectURL =
      state.url === '/sign-out'
          ? ''
          : `redirectURL=${state.url}`;
      const urlTree = router.parseUrl(`sign-in?${redirectURL}`);
       return router.parseUrl('/sign-in')
    }
  }
