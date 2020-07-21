import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth/auth.service";
import {map, take, tap} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router,
              private toastr: ToastrService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if(!loggedIn){
          this.toastr.error("Sing in to see your appointments!");
          this.router.navigate(['/home']);
        }
      })
    );
  }

}
