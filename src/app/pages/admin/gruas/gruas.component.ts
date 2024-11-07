import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { CatalogosService } from '../../../services/catalogos.service';
import { GruaService } from 'src/app/services/grua.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-gruas',
  templateUrl: './gruas.component.html',
  styleUrls: ['./gruas.component.css']
})
export class GruasComponent {
  isVisible = false;
  isLoading = true;
  showContent = false;
  editar =false;
  isLoadingMdl = false;
  validateForm!: UntypedFormGroup;
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
    this.gruaService.Get()
    .subscribe({
      next:(response)=>{
        this.data = response;
        this.filteredData = response;
      },
      complete:()=>{
        //this.btnLoading = false;
      },
      error:()=>{
        //this.btnLoading = false;
      }
    })

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


    this.catalogosService.GetTipoGrua()
    .subscribe({
      next:(response)=>{
        this.tiposDeGrua = response;
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
