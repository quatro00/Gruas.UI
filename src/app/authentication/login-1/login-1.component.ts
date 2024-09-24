import { Component } from '@angular/core'
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import  socialIcons  from './../../../assets/data/pages/social-items.json';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../../models/auth/login-request.model';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, concatMap, map, of } from 'rxjs';
import { LoginResponse } from 'src/app/models/auth/login-response.model';

@Component({
    templateUrl: './login-1.component.html'
})

export class Login1Component {
  loginForm: FormGroup;
  isLoading = false;
  error = false;
  socialMediaButtons = socialIcons.socialMediaButtons;
  loadingbtn_Entrar=false;

  validateForm!: UntypedFormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private location: Location,
    private authService: AuthService,
    private cookieService: CookieService) {}

    startShowMessages(): void {
      /*
      this.msg
        .loading('Action in progress', { nzDuration: 2500 })
        .onClose!.pipe(
          concatMap(() => this.msg.success('Loading finished', { nzDuration: 2500 }).onClose!),
          concatMap(() => this.msg.info('Loading finished is finished', { nzDuration: 2500 }).onClose!)
        )
        .subscribe(() => {
          console.log('All completed!');
        });
        */
    }

    habilitaBtn(){
      console.log(this.loadingbtn_Entrar);
    }
  submitForm(): void {
    this.loadingbtn_Entrar = true;
    if (this.validateForm.valid) {
      var request:LoginRequest = {
        Username : this.validateForm.value.username,
        Password : this.validateForm.value.password
      };
      
     this.authService.Login(request)
     .subscribe({
      error:(err)=> {
        console.log('error3',err);
        this.loadingbtn_Entrar=false;
      },
      next:(response:LoginResponse)=>{
        //set auth cookie
        console.log('seteamos el usuario',response);
        this.cookieService.set('Authorization',`Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');
        this.authService.setUser({
          nombre :response.nombre,
          apellidos: response.apellidos,
          email: response.email,
          roles: response.roles,
          username: response.username
        });
        if(response.roles.indexOf('Administrador') != -1){
          this.router.navigateByUrl('/administrador/dashboard').then(() => {
            window.location.reload();
          });; 
        }
        if(response.roles.indexOf('Mercaderia') != -1){
          this.router.navigateByUrl('/mercaderia/dashboard').then(() => {
            window.location.reload();
          });; 
        }

        if(response.roles.indexOf('Servicios') != -1){
          this.router.navigateByUrl('/servicios/dashboard').then(() => {
            window.location.reload();
          });; 
        }

        if(response.roles.indexOf('Agente') != -1){
          this.router.navigateByUrl('/agente/dashboard').then(() => {
            window.location.reload();
          });; 
        }
      }
     });
    } else {
      this.loadingbtn_Entrar = false;
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  passwordVisible = false;
  password?: string;

  ngOnInit(): void {
    //this.startShowMessages();
    
    /*this.authService.TestApi()
    .subscribe({
      next:(response)=>{
        console.log(response);
      }
    });
    */
    this.validateForm = this.fb.group({
      username: ['admin@correo.com', [Validators.required]],
      password: ['password', [Validators.required]],
      remember: [true],
    });
  }
}
