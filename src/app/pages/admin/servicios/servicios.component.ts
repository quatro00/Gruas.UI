import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ExcelService } from 'src/app/services/excel.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { forkJoin } from 'rxjs';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ReportesService } from 'src/app/services/reportes.service';

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
  estatus:any[]=[];
  proveedores:any[]=[];
  data:any[]=[];
  filteredData:any[]=[];  
  searchValue = '';
  btnLoadingBusqueda = false;
  
  fechaInicio:any=null;
  fechaTermino:any=null;

  listOfColumn = [
    {
      title: 'Folio',
      key:'folio',
      compare: (a: any, b: any) => a.folio - b.folio
    },
    {
      title: 'Cliente',
      key:'cliente',
      compare: (a: any, b: any) => a.cliente.localeCompare(b.cliente)
    },
    {
      title: 'Telefono',
      key:'telefono',
      compare: (a: any, b: any) => a.telefono.localeCompare(b.telefono)
    },
    {
      title: 'Estado',
      key:'estado',
      compare: (a: any, b: any) => a.estado.localeCompare(b.estado)
    },
    {
      title: 'Origen',
      key:'origen',
      compare: (a: any, b: any) => a.origen.localeCompare(b.origen)
    },
    {
      title: 'Destino',
      key:'destino',
      compare: (a: any, b: any) => a.destino.localeCompare(b.destino)
    },
    {
      title: 'Costo',
      key:'total',
      compare: (a: any, b: any) => a.costo.localeCompare(b.costo)
    },
    {
      title: 'Estatus',
      key:'estatus',
      compare: (a: any, b: any) => a.estatus.localeCompare(b.estatus)
    },
    {
      title: 'Proveedor',
      key:'proveedor',
      compare: (a: any, b: any) => a.proveedor.localeCompare(b.proveedor)
    },
    {
      title: 'Grua',
      key:'grua',
      compare: (a: any, b: any) => a.gruaPlaca.localeCompare(b.gruaPlaca)
    },
    {
      title: 'Tipo',
      key:'tipo',
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
    private proveedoresService:ProveedoresService,
    private reportesService:ReportesService,
    private catalogosService:CatalogosService,
    private excelService:ExcelService,
    private http: HttpClient) {}

  ngOnInit() {
    // Simulate loading time
    this.validateForm = this.fb.group({
      proveedorId: [null, []],
      estatusPagoId: [null, []],
      fechaInicio: [null, []],
      fechaTermino: [null, []],
    });

    this.loadData();
  }

  buscaServicios(){
    if (this.validateForm.valid) {
      this.btnLoadingBusqueda = true;
      this.servicioService.GetAllServiciosByEstatus(this.validateForm.value.estatus)
      .subscribe({
        next: (response) => {
          this.data = response;
        this.filteredData = response;
          console.log(response);
          this.btnLoadingBusqueda=false;
        },
        complete:()=>{
          this.btnLoadingBusqueda = false;
        },
        error:()=>{
          this.btnLoadingBusqueda = false;
        }
      })
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  exportToExcel(){
    const formattedData = this.filteredData.map(item => {
      const formattedItem = {};
      this.listOfColumn.forEach(column => {
        // Usa la propiedad `key` para acceder al valor en `item`
        formattedItem[column.title] = item[column.key];
      });
      return formattedItem;
    });

    this.excelService.exportTableToExcel(formattedData,'Servicios');
  }

  loadData() {

    forkJoin([
      this.catalogosService.GetEstatusServicio(),
      this.proveedoresService.GetProveedores()
    ]).subscribe({
      next: ([estatusResponse, proveedoresResponse]) => {
        this.estatus = estatusResponse;
        this.proveedores = proveedoresResponse;

        this.validateForm.patchValue({
          proveedorId: 0,
          estatusPagoId: 0
        });
      },
      complete: () => {
        this.isLoading = false;
        this.showContent = true;
      },
      error: () => {
        this.isLoading = false;
        // Maneja el error si es necesario
        this.msg.error("Ocurrio un error inesperado.");
      }
    });
  }

  buscarServicios() {
    this.btnLoadingBusqueda = true;

    let proveedorId = null;
    let estatusId = null;

    if(this.validateForm.value.proveedorId != 0){
      proveedorId = this.validateForm.value.proveedorId;
    }

    if(this.validateForm.value.estatusPagoId != 0){
      estatusId = this.validateForm.value.estatusPagoId;
    }

    let request:any = {
      proveedorId:proveedorId,
      estatusServicioId:estatusId,
      fechaInicio:this.fechaInicio,
      fechaTermino:this.fechaTermino
    }

    this.reportesService.GetServicios(request)
      .subscribe({
        next: (response) => {
          this.data = response;
          this.filteredData = response;
          this.btnLoadingBusqueda = false;
          console.log(response);
        },
        complete:()=>{
          this.btnLoadingBusqueda = false;
        },
        error:()=>{
          this.btnLoadingBusqueda = false;
          this.msg.error('Ocurrio un error al registrar el pago.');
        }
      })
    
  }

  private applyFilters(): any[] {
      
    return this.data.filter((data2) =>
      data2.folio.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.cliente.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.telefono.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.estado.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.origen.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.destino.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.costo.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.estatus.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.proveedor.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.gruaPlaca.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.gruaTipo.toLowerCase().includes(this.searchValue.toLowerCase()) 
    );
  }

  filterItems(): void {
    this.filteredData = this.applyFilters();
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
