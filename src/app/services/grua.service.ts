import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/auth/login-request.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../models/auth/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/auth/user-model.models';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GruaService {

  service:string = 'Grua';
  
  constructor(private http:HttpClient, private cookieService: CookieService) { }

  Get():Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  Create(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

  Update(request:any, id:string):Observable<any>{
    return this.http.put<any>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }
}
