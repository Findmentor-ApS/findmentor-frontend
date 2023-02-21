import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment'


@Injectable()
export class APIInterceptor implements HttpInterceptor {
  API_URL: string = environment.apiUrl;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `${this.API_URL}${req.url}` });
    return next.handle(apiReq);
  }
}