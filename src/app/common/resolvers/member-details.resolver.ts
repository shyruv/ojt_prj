import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { MembersService } from "app/api";
import { environment } from "environments/environment";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MemberDetailsResolver implements Resolve<boolean> {
  constructor(private memberService: MembersService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const memberId = route.params.id;
    console.log(memberId)
    if (!memberId) return of(null);
    return this.memberService
      .apiVversionMembersMembersByIdGet(environment.apiVersion, memberId)
      .pipe(
        catchError((error) => {
          console.log(error)
          this.router.navigate(["/error/internal-server"]);
          return of(null);
        })
      );

   
  }
}
