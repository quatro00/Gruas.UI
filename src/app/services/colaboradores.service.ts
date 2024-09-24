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
export class ColaboradoresService {

  service:string = 'Colaborador';


  constructor(private http:HttpClient, private cookieService: CookieService) { }

  GetColaboradores():Observable<GetColaboradoresModel[]>{
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetColaboradores`);
  }

  GetColaborador(colaboradorId:string):Observable<GetColaboradoresModel>{
    let params = new HttpParams();
    params = params.append('id', colaboradorId);

    return this.http.get<GetColaboradoresModel>(`${environment.apiBaseUrl}/api/${this.service}/GetColaborador`,{params});
  }

  Create(request:CreateColaboradorModel):Observable<CreateColaboradorModel>{
    return this.http.post<CreateColaboradorModel>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

  Update(id:string, request:UpdateColaboradorModel):Observable<UpdateColaboradorModel>{
    return this.http.put<UpdateColaboradorModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }
}