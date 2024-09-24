import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent {

  public address: string = '';
  @ViewChild('addressInput', { static: false }) addressInput: ElementRef;


  isVisible = false;
  isLoading = true;
  showContent = false;
  btnLoading = false;
  tipoVehiculo='';
  validateForm!: UntypedFormGroup;

  constructor(
    private msg: NzMessageService, 
    private fb: FormBuilder,
    //private mapsAPILoader: MapsAPILoader, 
    private ngZone: NgZone) {}

  ngOnInit() {

    this.validateForm = this.fb.group({
      TipoVehiculo: ['',[Validators.required]],
      especifique: ['',[Validators.required]],
      titulo: ['',[Validators.required]],
      fechaCaducidad: ['',[Validators.required]],
      mensaje: ['',[Validators.required]],
      archivo: [''],
      cuentas: [[]],
      //prioridad: ['',[Validators.required]],
      //descripcion: ['',[Validators.required]]
    });

    this.loadData();
  }

  tipoVehiculoChanged(){
    this.tipoVehiculo = this.validateForm.value.TipoVehiculo;
  }

  isDarkMode(): boolean {
    return false;//this.document.body.classList.contains('dark');
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
}
