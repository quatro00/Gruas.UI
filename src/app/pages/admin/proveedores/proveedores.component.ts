import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  styles:  [`
    :host ::ng-deep .basic-select .ant-select-selector{
      @apply h-[50px] rounded-4 border-normal px-[20px] flex items-center dark:bg-white/10 dark:border-white/10 dark:text-white/60 dark:hover:text-white/100;
    }
    :host ::ng-deep .basic-select.ant-select-multiple .ant-select-selection-item{
        @apply bg-white dark:bg-white/10 border-normal dark:border-white/10;
      }
      ::ng-deep .ant-upload {
        @apply w-full;
      }
      :host ::ng-deep .basic-select .ant-select-multiple.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector{
        @apply dark:bg-white/10 dark:border-white/10 dark:text-white/60 dark:hover:text-white/100;
      }
    `],
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  isVisible = false;
  isLoading = true;
  showContent = false;
  btnLoading = false;
  editar =false;
  id:any='';
  data:any[]=[];
  validateForm!: UntypedFormGroup;
  bancos:any[]=[
    {id:'BBVA',nombre:'BBVA'},
    {id:'Banorte',nombre:'Banorte'},
    {id:'HSBC',nombre:'HSBC'}
  ];

  constructor(
    private proveedoresService:ProveedoresService,
    private modalService: NzModalService, 
    private msg: NzMessageService,
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder,
    private http: HttpClient) {}

  ngOnInit() {
    // Simulate loading time
    this.validateForm = this.fb.group({
      razonSocial: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      telefono_1: [null, [Validators.required]],
      telefono_2: [null, [Validators.required]],
      rfc: [null, [Validators.required]],
      cuenta: [null, [Validators.required]],
      banco: [null, [Validators.required]],
    });

    this.loadData();
  }

  log(check, id){
    var request:any = {
      activo:check.length > 0,
      id:id
    }
    console.log(request);
    this.proveedoresService.ActivarDesactivarProveedor(request)
    .subscribe({
      next:(response)=>{
        //this.loadData();
      },
      complete:()=>{
        //this.btnLoading = false;
      },
      error:()=>{
        //this.btnLoading = false;
      }
    })
  }
  
  showNew() {
    this.validateForm.reset();
    this.editar = false;
    this.isVisible = true;
   
  }

  EditarProveedor(proveedor){
    this.id = proveedor.id;
    this.isVisible = true;
    this.editar = true;
    this.validateForm.setValue({
      razonSocial: proveedor.razonSocial,
      direccion: proveedor.direccion,
      telefono_1: proveedor.telefono_1,
      telefono_2: proveedor.telefono_2,
      rfc: proveedor.rfc,
      cuenta: proveedor.cuenta,
      banco: proveedor.banco,
  });

  this.isVisible = true;
  }
  loadData() {
    this.proveedoresService.GetProveedores()
    .subscribe({
      next:(response)=>{
        this.data = response;
        //this.razonesSociales = response.razonesSociales;
      },
      complete:()=>{
        //this.btnLoading = false;
      },
      error:()=>{
        //this.btnLoading = false;
      }
    })
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }

  handleCancel(){
    this.isVisible = false;
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.btnLoading = true;
      let request:any = 
      {
        razonSocial: this.validateForm.value.razonSocial,
        direccion: this.validateForm.value.direccion,
        telefono_1: this.validateForm.value.telefono_1,
        telefono_2: this.validateForm.value.telefono_2,
        rfc: this.validateForm.value.rfc,
        cuenta: this.validateForm.value.cuenta,
        banco: this.validateForm.value.banco,
      }

      if(this.editar == false){
        this.proveedoresService.InsProveedor(request)
        .subscribe({
          next:(response)=>{
            this.loadData();
          },
          complete:()=>{
            this.btnLoading = false;
          },
          error:()=>{
            this.btnLoading = false;
          }
        })
      }
     else{
      this.proveedoresService.UpdateProveedor(this.id,request)
      .subscribe({
        next:(response)=>{
          this.loadData();
        },
        complete:()=>{
          this.btnLoading = false;
        },
        error:()=>{
          this.btnLoading = false;
        }
      })
     }
      
/*
      this.btnLoading = true;
      */
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({
            onlySelf: true
          });
        }
      });
    }
  }
}
