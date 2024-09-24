import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { GetColaboradoresModel } from '../models/colaboradores/get-colabores-model';
import { CreateColaboradorModel } from '../models/colaboradores/create-colaborador-model';
import { UpdateColaboradorModel } from '../models/colaboradores/update-colaborador-model';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  service:string = 'Proveedor';


  constructor(private http:HttpClient, private cookieService: CookieService) { }

  GetProveedores():Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetProveedores`);
  }

  GetProveedor(id:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<any>(`${environment.apiBaseUrl}/api/${this.service}/GetProveedor`,{params});
  }

  InsProveedor(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/InsProveedor`,request);
  }

  UpdateProveedor(id:string, request:any):Observable<any>{
    return this.http.put<any>(`${environment.apiBaseUrl}/api/${this.service}/UpdateProveedor/${id}`,request);
  }

  ActivarDesactivarProveedor(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/ActivarDesactivarProveedor`,request);
  }
}