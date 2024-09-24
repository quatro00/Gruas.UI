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

  service:string = 'Catalogos';


  constructor(private http:HttpClient, private cookieService: CookieService) { }

  UploadReporteAltas(formData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/UploadReporteAltas`, formData);
  }
}