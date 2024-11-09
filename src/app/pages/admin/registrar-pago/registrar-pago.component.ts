import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PagosService } from 'src/app/services/pagos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';

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
  selector: 'app-registrar-pago',
  templateUrl: './registrar-pago.component.html',
  styleUrls: ['./registrar-pago.component.css']
})
export class RegistrarPagoComponent {

  isVisible = false;
  isLoading = true;
  showContent = false;
  btnLoadingBusqueda = false;
  btnLoadingRegistrarPago = false;
  proveedorSelectedId:string = '';
  validateForm!: UntypedFormGroup;
  validateRegistrarPago!: UntypedFormGroup;
  data:any[]=[];
  proveedores:any[]=[];

  constructor(
    private proveedoresService:ProveedoresService,
    private pagosService:PagosService,
    private msg: NzMessageService,
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit() {
    
    // Simulate loading time
    this.validateRegistrarPago = this.fb.group({
      concepto: [null, [Validators.required]],
    });

    this.validateForm = this.fb.group({
      proveedor: [null, [Validators.required]],
    });

    this.proveedoresService.GetProveedores()
    .subscribe({
      next:(response)=>{
        this.proveedores = response;
      },
      complete:()=>{
        //this.btnLoading = false;
      },
      error:()=>{
        //this.btnLoading = false;
      }
    })

    this.loadData();
  }

  registrarPago(){
    
    if (this.validateRegistrarPago.valid) {
      this.btnLoadingRegistrarPago=true;
      let request:any = 
      {
        proveedorId: this.proveedorSelectedId,
        concepto: this.validateRegistrarPago.value.concepto,
        servicios: this.data.filter(item => item.checked).map(item => ({
          servicioId: item.id,
          subTotal: item.subTotal,
          comision: item.comision,
          total: item.total
        }))
      }
      
      
      this.pagosService.RegistrarPagoServicios(request)
      .subscribe({
        next: (response) => {
          this.buscaPagos();
          this.btnLoadingRegistrarPago=false;
          this.isVisible = false;
        },
        complete:()=>{
          this.btnLoadingRegistrarPago = false;
          this.isVisible = false;
        },
        error:()=>{
          this.btnLoadingRegistrarPago = false;
          this.msg.error('Ocurrio un error al registrar el pago.');
        }
      })
      
    } else {
      Object.values(this.validateRegistrarPago.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  buscaPagos(){

    if (this.validateForm.valid) {
      this.btnLoadingBusqueda=true;
      let proveedorId:string = this.validateForm.value.proveedor;
      this.proveedorSelectedId = this.validateForm.value.proveedor;
      
      this.pagosService.GetServiciosPorPagar(proveedorId)
      .subscribe({
        next: (response) => {
          this.data = response;
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

  showRegistrarPagoModal(){
    this.validateRegistrarPago.reset();
    this.isVisible = true;
  }
  handleCancel(){
    this.isVisible = false;
  }
  printSelectedItems() {
    const selectedItems = this.data.filter(item => item.checked);
    console.log('Elementos seleccionados:', selectedItems);
  }

  isAnySelected(): boolean {
    return this.data.some(item => item.checked);
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
}
