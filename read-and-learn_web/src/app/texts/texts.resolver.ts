import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {TextsService} from "./texts.service";

@Injectable({
  providedIn: 'root'
})
export class TextsResolver implements Resolve<boolean> {

  constructor(private textService:TextsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.textService.getTexts();
  }
}
