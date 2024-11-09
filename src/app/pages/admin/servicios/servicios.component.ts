import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ServicioService } from 'src/app/services/servicio.service';

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
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {
  isLoading = true;
  showContent = false;
  validateForm!: UntypedFormGroup;
  data:any[]=[];

  listOfColumn = [
    {
      title: 'Folio',
      compare: (a: any, b: any) => a.folio - b.folio
    },
    {
      title: 'Cliente',
      compare: (a: any, b: any) => a.cliente.localeCompare(b.cliente)
    },
    {
      title: 'Telefono',
      compare: (a: any, b: any) => a.telefono.localeCompare(b.telefono)
    },
    {
      title: 'Estado',
      compare: (a: any, b: any) => a.estado.localeCompare(b.estado)
    },
    {
      title: 'Origen',
      compare: (a: any, b: any) => a.origen.localeCompare(b.origen)
    },
    {
      title: 'Destino',
      compare: (a: any, b: any) => a.destino.localeCompare(b.destino)
    },
    {
      title: 'Costo',
      compare: (a: any, b: any) => a.costo.localeCompare(b.costo)
    },
    {
      title: 'Estatus',
      compare: (a: any, b: any) => a.estatus.localeCompare(b.estatus)
    },
    {
      title: 'Proveedor',
      compare: (a: any, b: any) => a.proveedor.localeCompare(b.proveedor)
    },
    {
      title: 'Grua',
      compare: (a: any, b: any) => a.gruaPlaca.localeCompare(b.gruaPlaca)
    },
    {
      title: 'Tipo',
      compare: (a: any, b: any) => a.gruaTipo.localeCompare(b.gruaTipo)
    }
  ];

  constructor(
    private modalService: NzModalService, 
    private msg: NzMessageService,
    private router: Router, 
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder,
    private servicioService:ServicioService,
    private http: HttpClient) {}

  ngOnInit() {
    // Simulate loading time
    this.validateForm = this.fb.group({
      desde: [null, [Validators.required]],
      hasta: [null, [Validators.required]],
      razonSocial: [null, [Validators.required]],
    });

    this.loadData();
  }

  loadData() {
    this.servicioService.GetAllServicios()
    .subscribe({
      next:(response)=>{
        this.data = response;
        console.log(this.data);
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

  crearServicio(){
    this.router.navigateByUrl(`administrador/crear-servicio`); 
  }

  verServicio(id:string){
    this.router.navigateByUrl(`administrador/solicitud-servicio/${id}`);
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      /*
      let request:GetOrdenCompraRequest = 
      {
        fechaInicio: this.validateForm.value.desde,
        fechaTermino: this.validateForm.value.hasta,
        proveedorId: this.validateForm.value.razonSocial,
      }

      this.ordenesCompraService.GetOrdenesCompra(request)
      .subscribe({
        next:(response)=>{
          this.citas = response;
          //this.razonesSociales = response.razonesSociales;
        },
        complete:()=>{
          this.btnLoading = false;
        },
        error:()=>{
          this.btnLoading = false;
        }
      })
      

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

  orden(){
    console.log(1);
  }
  sortMap: { [key: string]: 'ascend' | 'descend' | null } = {
    folio: null
  };

  // Función para manejar el cambio de orden
  onSortChange(sort): void {
    this.data.sort((a, b) => {
      return a.folio.localeCompare(b.folio);
    });
  }
}
