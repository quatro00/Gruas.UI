import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { CatalogosService } from '../../../services/catalogos.service';
import { GruaService } from 'src/app/services/grua.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin } from 'rxjs';
import { ReportesService } from 'src/app/services/reportes.service';

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
  selector: 'app-gruas',
  templateUrl: './gruas.component.html',
  styleUrls: ['./gruas.component.css']
})
export class GruasComponent {
  isVisible = false;
  isLoading = true;
  showContent = false;
  btnLoadingBusqueda = false;
  editar =false;
  isLoadingMdl = false;
  validateForm!: UntypedFormGroup;
  busquedaForm!: UntypedFormGroup;
  data:any[]=[];
  filteredData: any[] = [];
  activos: any[] = [{ id: 1, value: 'Si' }, { id: 0, value: 'No' }];
  tiposDeGrua:any[]=[];
  proveedores:any[]=[];
  providerForm: FormGroup;
  idUpdate = '';
  isNew = true;
  searchValue = '';

  constructor(
    private fb: FormBuilder,  
    private proveedoresService:ProveedoresService,
    private catalogosService:CatalogosService,
    private gruaService:GruaService,
    private msg: NzMessageService,
    private reportesService:ReportesService
  ) {

    
  }

  get towTrucks(): FormArray {
    return this.providerForm.get('towTrucks') as FormArray;
  }

  handleCancel(){
    this.isVisible = false;
  }

  showNew() {
    this.validateForm.reset();
    this.editar = false;
    this.isVisible = true;
   
  }

  showEdit(item) {
    this.isNew = false;
    this.idUpdate = item.id;
    this.isVisible = true;

    this.validateForm.patchValue({
      proveedor: item.proveedorId,
      placas: item.placas,
      marca: item.marca,
      modelo: item.modelo,
      anio: item.anio,
      tipoGrua: item.tipoGruaId,
      activo: item.activo,
    });

  }

  ngOnInit() {

    this.busquedaForm = this.fb.group({
      proveedor: [null, []],
      tipoGrua: [null, []],
      placas: [null, []],
    });


    this.validateForm = this.fb.group({
      proveedor: [null, [Validators.required]],
      placas: [null, [Validators.required]],
      marca: [null, [Validators.required]],
      modelo: [null, [Validators.required]],
      anio: [null, [Validators.required]],
      tipoGrua: [null, [Validators.required]],
      activo: [null, [Validators.required]],
    });
    this.loadData();
  }


  loadData() {
    forkJoin([
      this.gruaService.Get(),
      this.proveedoresService.GetProveedores()
    ]).subscribe({
      next: ([gruaResponse, proveedoresResponse]) => {
        this.tiposDeGrua = gruaResponse;
        this.proveedores = proveedoresResponse;

        this.busquedaForm.patchValue({
          proveedor: 0,
          tipoGrua: 0
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

  buscarGruas(){
    this.btnLoadingBusqueda = true;

    let proveedor = null;
    let tipoGrua = null;

    if(this.busquedaForm.value.proveedor != 0){
      proveedor = this.busquedaForm.value.proveedor;
    }
    
    if(this.busquedaForm.value.tipoGrua != 0){
      tipoGrua = this.busquedaForm.value.tipoGrua;
    }

    let request:any = {
      proveedorId:proveedor,
      tipoGruaId:tipoGrua,
      placas:this.busquedaForm.value.placas
    }

    this.reportesService.GetGruas(request)
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

  guardar() {

    if (this.validateForm.valid) {
      this.isLoadingMdl = true;

      var request = {
        proveedorId: this.validateForm.value.proveedor,
        placas: this.validateForm.value.placas,
        marca: this.validateForm.value.marca,
        modelo: this.validateForm.value.modelo,
        anio: this.validateForm.value.anio,
        tipoGruaId: this.validateForm.value.tipoGrua,
        activo: this.validateForm.value.activo,
      }

      if (this.isNew == true) {
        this.gruaService.Create(request)
          .subscribe({
            next: (response) => {
              this.loadData();
              this.msg.success("Grua registrada con éxito.");
              this.isVisible = false;
              this.validateForm.reset();
            },
            complete: () => {
              this.isLoadingMdl = false;
            },
            error: () => {
              this.isLoadingMdl = false;
            }
          })
      }
      else {
        this.gruaService.Update(request, this.idUpdate)
        .subscribe({
          next: (response) => {
            this.loadData();
            this.msg.success("Proveedor actualizado con éxito.");
            this.isVisible = false;
            this.validateForm.reset();
          },
          complete: () => {
            this.isLoadingMdl = false;
          },
          error: () => {
            this.isLoadingMdl = false;
          }
        })
      }


    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  filterItems(): void {
    this.filteredData = this.applyFilters();
  }

  private applyFilters(): any[] {
      
    
    return this.data.filter((data2) =>
      data2.proveedor.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.tipoGrua.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.placas.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.marca.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.modelo.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      data2.anio.toString().toLowerCase().includes(this.searchValue.toLowerCase()) 
    );
  }

}
