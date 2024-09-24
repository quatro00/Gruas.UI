import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CrearInventarioRequestModel } from '../models/inventario/crear-inventario-request-model';
import { RegistraConteoRequestModel } from '../models/inventario/registra-conteo-request-model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  service:string = 'Inventario';


  constructor(private http:HttpClient, private cookieService: CookieService) { }

  GetInventarios(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetInventarios`);
  }

  GetInventario(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetInventario`,{params});

    //return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetInventario/`);
  }

  CrearInventario(request:CrearInventarioRequestModel): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/CrearInventario`,request);
  }

  RegistraConteo(request:RegistraConteoRequestModel[]): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/RegistraConteo`,request);
  }

  UploadControlInventarios(formData:FormData):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/UploadControlInventarios`,formData);
  }
}