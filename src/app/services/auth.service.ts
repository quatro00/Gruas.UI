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
export class AuthService {

  $user = new BehaviorSubject<UserModel | undefined>(undefined);

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  Login(request:LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/Auth/login`,{
      Username: request.Username,
      Password: request.Password
    });
  }

  logout():void{
    localStorage.clear();
    this.cookieService.delete('Authorization','/');
    this.$user.next(undefined);
  }
  
  setUser(user:UserModel):void{
    console.log('guardamos usuario',user);
    this.$user.next(user);
    localStorage.setItem('user-email',user.email);
    localStorage.setItem('user-username',user.username);
    localStorage.setItem('user-nombre',user.nombre);
    localStorage.setItem('user-apellidos',user.apellidos);
    localStorage.setItem('user-roles',user.roles.join(','));
  }
   
  getUser():UserModel | undefined{

 
    const email = localStorage.getItem('user-email');
    const username = localStorage.getItem('user-username');
    const nombre = localStorage.getItem('user-nombre');
    const apellidos = localStorage.getItem('user-apellidos');
    const roles = localStorage.getItem('user-roles');

    if(username){
      const user:UserModel = {
        email: email,
        username: username,
        nombre: nombre,
        apellidos: apellidos,
        roles: roles.split(',')
      }

      return user;
      
    }

    return undefined;
  }

  user():Observable<UserModel | undefined>{
    return this.$user.asObservable();
  }

  TestApi():Observable<any>{
    return this.http.get<any>(`${environment.apiBaseUrl}/WeatherForecast`);
  }
  
}
