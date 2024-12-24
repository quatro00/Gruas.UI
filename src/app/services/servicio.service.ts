import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  service:string = 'Servicio';


  constructor(private http:HttpClient, private cookieService: CookieService) { }

  RegistraServicio(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/RegistraServicio`,request);
  }

  GetAllServicios():Observable<any>{
    return this.http.get<any>(`${environment.apiBaseUrl}/api/${this.service}/GetSerrvicios`);
  }

  GetAllServiciosByEstatus(id:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('estatusServicioId', id);


    return this.http.get<any>(`${environment.apiBaseUrl}/api/${this.service}/GetSerrvicios`,{params});
  }

  GetServicio(id:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('servicioId', id);

    return this.http.get<any>(`${environment.apiBaseUrl}/api/${this.service}/GetServicio`,{params});

  }

  GetCotizaciones(id:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('servicioId', id);

    return this.http.get<any>(`${environment.apiBaseUrl}/api/${this.service}/GetCotizaciones`,{params});

  }

  AsignarGrua(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/AsignarGrua`,request);
  }

  AsignarCotizacion(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/AsignarCotizacion`,request);
  }

  CancelarServicio(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/CancelarServicio`,request);
  }

  SolicitarCotizaciones(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/SolicitarCotizaciones`,request);
  }

  ColocarEnPropuesta(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/ColocarEnPropuesta`,request);
  }

  TerminarServicio(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/TerminarServicio`,request);
  }
}