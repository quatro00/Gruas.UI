import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RequerimientoCatalogoIIService {

  service:string = 'RequerimientoCatalogoII';


  constructor(private http:HttpClient, private cookieService: CookieService) { }

  InsRequerimiento(formData:FormData):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/InsRequerimiento`,formData);
  }

  GetRequerimientos():Observable<any>{
    return this.http.get<any>(`${environment.apiBaseUrl}/api/${this.service}/GetRequerimientos`);
  }

}