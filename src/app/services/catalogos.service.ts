import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { EstadoModel } from '../models/catalogos/estado-model';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  service:string = 'Catalogo';


  constructor(private http:HttpClient, private cookieService: CookieService) { }

  GetTipoGrua():Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetTipoGrua`);
  }

  GetEstatusServicio():Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetEstatusServicio`);
  }

  GetEstatusPago():Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetEstatusPago`);
  }

  GetEstados():Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetEstados`);
  }
}