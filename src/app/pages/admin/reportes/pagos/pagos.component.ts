import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ExcelService } from 'src/app/services/excel.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { forkJoin } from 'rxjs';
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
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent {

  isLoading = true;
  showContent = false;
  myGroup: FormGroup;
  validateForm!: UntypedFormGroup;
  estatus:any[]=[];
  proveedores:any[]=[];
  data:any[]=[];
  filteredData:any[]=[];

  selectedProveedor: any = 0;
  selectedEstatus: any = 0;
  fechaInicio:any=null;
  fechaTermino:any=null;

  btnLoadingBusqueda=false;
  searchValue = '';

  listOfColumn = [
    {
      title: 'Folio',
      key:'folio',
      compare: (a: any, b: any) => a.folio - b.folio
    },
    {
      title: 'Proveedor',
      key:'proveedor',
      compare: (a: any, b: any) => a.proveedor.localeCompare(b.proveedor)
    },
    {
      title: 'Fecha',
      key:'fechaCreacion',
      compare: (a: any, b: any) => a.fechaCreacion.localeCompare(b.fechaCreacion)
    },
    {
      title: 'Fecha pago',
      key:'fechaPago',
      compare: (a: any, b: any) => a.fechaPago.localeCompare(b.fechaPago)
    },
    {
      title: 'Concepto',
      key:'concepto',
      compare: (a: any, b: any) => a.concepto.localeCompare(b.concepto)
    },
    {
      title: 'Estatus',
      key:'estatusPagoId',
      compare: (a: any, b: any) => a.estatusPago.localeCompare(b.estatusPago)
    },
    {
      title: 'Referencia',
      key:'referencia',
      compare: (a: any, b: any) => a.estatusPago.localeCompare(b.referencia)
    },
    {
      title: 'Total de servicios',
      key:'cantidadServicios',
      compare: (a: any, b: any) => a.cantidadServicios - b.cantidadServicios
    },
    {
      title: 'Subtotal',
      key:'subTotal',
      compare: (a: any, b: any) =>  a.subTotal - b.subTotal
    },
    {
      title: 'Comision',
      key:'comision',
      compare: (a: any, b: any) =>  a.comision - b.comision
    },
    {
      title: 'Total',
      key:'total',
      compare: (a: any, b: any) =>  a.total - b.total
    }
  ];

  constructor(
    private modalService: NzModalService, 
    private msg: NzMessageService, 
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder,
    private reportesService:ReportesService,
    private catalogosService:CatalogosService,
    private proveedoresService:ProveedoresService,
    private excelService:ExcelService,) {}

  buscarPagos() {
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
      estatusPagoId:estatusId,
      fechaInicio:this.fechaInicio,
      fechaTermino:this.fechaTermino
    }

    this.reportesService.GetPagos(request)
      .subscribe({
        next: (response) => {
          this.data = response;
          this.filteredData = response;
          this.btnLoadingBusqueda = false;
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

  ngOnInit() {
    
    this.validateForm = this.fb.group({
      proveedorId: [null, []],
      estatusPagoId: [null, []],
      fechaInicio: [null, []],
      fechaTermino: [null, []],
    });

    //reportesService
    this.loadData();
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

    this.excelService.exportTableToExcel(formattedData,'Pagos');
  }

  loadData() {
    forkJoin([
      this.catalogosService.GetEstatusPago(),
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

  private applyFilters(): any[] {
      
    return this.data.filter((data2) =>
      data2.folio.toString().toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.proveedor.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.fechaCreacion.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.fechaPago.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.concepto.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.estatusPago.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.referencia.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.cantidadServicios.toString().toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.subTotal.toString().toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.comision.toString().toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.total.toString().toLowerCase().includes(this.searchValue.toLowerCase()) 
    );
  }

  filterItems(): void {
    this.filteredData = this.applyFilters();
  }

}
