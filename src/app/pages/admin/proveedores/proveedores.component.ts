import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  styles: [`
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
  btnLoadingBusqueda = false;
  editar = false;
  id: any = '';
  searchValue = '';
  data: any[] = [];
  filteredData: any[] = [];
  estados: any[] = [];
  validateForm!: UntypedFormGroup;
  busquedaForm!: UntypedFormGroup;
  bancos: any[] = [
    { id: 'BBVA', nombre: 'BBVA' },
    { id: 'Banorte', nombre: 'Banorte' },
    { id: 'HSBC', nombre: 'HSBC' }
  ];

  listOfColumn = [
    {
      title: 'No.',
      key:'noProveedor',
      compare: (a: any, b: any) => a.folio - b.folio
    },
    {
      title: 'Razón social',
      key:'razonSocial',
      compare: (a: any, b: any) => a.cliente.localeCompare(b.cliente)
    },
    {
      title: 'RFC',
      key:'rfc',
      compare: (a: any, b: any) => a.origen.localeCompare(b.origen)
    },
    {
      title: 'Dirección',
      key:'direccion',
      compare: (a: any, b: any) => a.telefono.localeCompare(b.telefono)
    },
    {
      title: 'Teléfono 1',
      key:'telefono_1',
      compare: (a: any, b: any) => a.estado.localeCompare(b.estado)
    },
    {
      title: 'Banco',
      key:'banco',
      compare: (a: any, b: any) => a.destino.localeCompare(b.destino)
    },
    {
      title: 'Cuenta',
      key:'cuenta',
      compare: (a: any, b: any) => a.costo.localeCompare(b.costo)
    },
    {
      title: 'Comisión(%)',
      key:'comision',
      compare: (a: any, b: any) => a.estatus.localeCompare(b.estatus)
    },
    {
      title: 'Estado',
      key:'estado',
      compare: (a: any, b: any) => a.proveedor.localeCompare(b.proveedor)
    },
    {
      title: 'Activo',
      key:'activo',
      compare: (a: any, b: any) => a.gruaPlaca.localeCompare(b.gruaPlaca)
    }
  ];

  constructor(
    private proveedoresService: ProveedoresService,
    private modalService: NzModalService,
    private msg: NzMessageService,
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder,
    private catalogosService: CatalogosService,
    private reportesService:ReportesService,
    private excelService:ExcelService,
    private http: HttpClient) { }

  ngOnInit() {
    // Simulate loading time
    this.busquedaForm = this.fb.group({
      razonSocial: [null, []],
      estado: [null, []],
    });

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

  log(check, id) {
    var request: any = {
      activo: check.length > 0,
      id: id
    }
    
    this.proveedoresService.ActivarDesactivarProveedor(request)
      .subscribe({
        next: (response) => {
          //this.loadData();
        },
        complete: () => {
          //this.btnLoading = false;
        },
        error: () => {
          //this.btnLoading = false;
        }
      })
  }

  showNew() {
    this.validateForm.reset();
    this.editar = false;
    this.isVisible = true;

  }

  EditarProveedor(proveedor) {
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

    this.catalogosService.GetEstados()
      .subscribe({
        next: (response) => {
          this.estados = response;
          //this.razonesSociales = response.razonesSociales;
          this.isLoading = false;
          this.showContent = true;

          this.busquedaForm.patchValue({
            estado: 0
          });

        },
        complete: () => {
          //this.btnLoading = false;
        },
        error: () => {
          //this.btnLoading = false;
        }
      })

  }

  handleCancel() {
    this.isVisible = false;
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

    this.excelService.exportTableToExcel(formattedData,'Proveedores');
  }

  private applyFilters(): any[] {
      
    return this.data.filter((data2) =>
      data2.noProveedor.toString().toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.razonSocial.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.rfc.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.direccion.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.telefono_1.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.banco.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.cuenta.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.comision.toString().toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.estado.toLowerCase().includes(this.searchValue.toLowerCase()) 
    );
  }

  filterItems(): void {
    this.filteredData = this.applyFilters();
  }

  buscarProveedores(){
    this.btnLoadingBusqueda = true;

    let estadoId = null;

    if(this.busquedaForm.value.estado != 0){
      estadoId = this.busquedaForm.value.estado;
    }
    
    let request:any = {
      estadoId:estadoId,
      descripcion:this.busquedaForm.value.razonSocial
    }

    this.reportesService.GetProveedores(request)
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
          this.msg.error('Ocurrio un error inesperado.');
        }
      })
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.btnLoading = true;
      let request: any =
      {
        razonSocial: this.validateForm.value.razonSocial,
        direccion: this.validateForm.value.direccion,
        telefono_1: this.validateForm.value.telefono_1,
        telefono_2: this.validateForm.value.telefono_2,
        rfc: this.validateForm.value.rfc,
        cuenta: this.validateForm.value.cuenta,
        banco: this.validateForm.value.banco,
      }

      if (this.editar == false) {
        this.proveedoresService.InsProveedor(request)
          .subscribe({
            next: (response) => {
              this.loadData();
            },
            complete: () => {
              this.btnLoading = false;
            },
            error: () => {
              this.btnLoading = false;
            }
          })
      }
      else {
        this.proveedoresService.UpdateProveedor(this.id, request)
          .subscribe({
            next: (response) => {
              this.loadData();
            },
            complete: () => {
              this.btnLoading = false;
            },
            error: () => {
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
