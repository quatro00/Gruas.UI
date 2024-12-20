import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { CatalogosService } from '../../../services/catalogos.service';
import { GruaService } from 'src/app/services/grua.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin } from 'rxjs';
import { ReportesService } from 'src/app/services/reportes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
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
  tipo:any[]=[{ id: 'Administrador', value: 'Administrador' }, { id: 'Cliente', value: 'Cliente' },{ id: 'Colaborador', value: 'Colaborador' }];
  providerForm: FormGroup;
  idUpdate = '';
  isNew = true;
  searchValue = '';

  constructor(
    private fb: FormBuilder,  
    private proveedoresService:ProveedoresService,
    private catalogosService:CatalogosService,
    private usuariosService:UsuariosService,
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
      correoElectronico: item.placas,
      nombreUsuario: item.marca,
      nombre: item.modelo,
      apellidos: item.anio,
      telefono: item.tipoGruaId,
      password: item.activo,
    });

  }

  ngOnInit() {

    this.busquedaForm = this.fb.group({
      tipo: [null, []],
      correoElectronico: [null],
      telefono: [null]
    });


    this.validateForm = this.fb.group({

      proveedor: [null, [Validators.required]],//
      correoElectronico: [null, [Validators.required]],//
      nombreUsuario: [null, [Validators.required]],
      nombre: [null, [Validators.required]],//
      apellidos:[null, [Validators.required]],//
      telefono: [null, [Validators.required]],//
      password: [null, [Validators.required]],//

    });
    this.loadData();
  }


  loadData() {

    this.isLoading = false;
    this.showContent = true;

    

    forkJoin([
      this.proveedoresService.GetProveedores()
    ]).subscribe({
      next: ([ proveedoresResponse]) => {
        this.proveedores = proveedoresResponse;

        this.busquedaForm.patchValue({
          tipo: 0
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

    let tipo = null;

    if(this.busquedaForm.value.tipo != 0){
      tipo = this.busquedaForm.value.tipo;
      console.log(tipo);
    }
    

    let request:any = {
      tipo:tipo,
      correoElectronico:this.busquedaForm.value.correoElectronico,
      telefono:this.busquedaForm.value.telefono
    }
/*
    console.log(tipo);
    console.log(request);
*/
    this.usuariosService.GetUsuarios(request)
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
        this.msg.error('Ocurrio un error inesperado.');
      }
    })
  }

  guardar() {

    console.log(this.validateForm.valid);

    if (this.validateForm.valid) {
      this.isLoadingMdl = true;

      var request = {
        correoElectronico: this.validateForm.value.correoElectronico,
        nombreUsuario: this.validateForm.value.nombreUsuario,
        nombre: this.validateForm.value.nombre,
        apellidos: this.validateForm.value.apellidos,
        telefono: this.validateForm.value.telefono,
        password: this.validateForm.value.password,
        proveedorId: this.validateForm.value.proveedor,
      }

      
      if (this.isNew == true) {
        this.usuariosService.CreateUsuarioProveedor(request)
          .subscribe({
            next: (response) => {
              this.loadData();
              this.msg.success("Usuario registrado con éxito.");
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
      }/*
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
*/

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
