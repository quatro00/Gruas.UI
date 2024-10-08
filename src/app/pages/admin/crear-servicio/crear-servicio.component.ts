import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent implements OnInit, AfterViewInit {
  @ViewChild('searchOrigen', { static: true }) searchElementOrigenRef!: ElementRef; // Referencia al input de búsqueda
  latOrigen:any;
  lngOrigen:any;
  municipioOrigen:any='';

  @ViewChild('searchDestino', { static: true }) searchElementDestinoRef!: ElementRef; // Referencia al input de búsqueda
  latDestino:any;
  lngDestino:any;
  municipioDestino:any='';

  public address: string = ''; // Dirección seleccionada

  lugarUbicuidad:any;
  isVisible = false;
  isLoading = true;
  showContent = false;
  btnLoading = false;
  tipoVehiculo='';
  validateForm!: UntypedFormGroup;


  constructor(
    private msg: NzMessageService, 
    private fb: FormBuilder,
    private servicioService:ServicioService,
    //private mapsAPILoader: MapsAPILoader, 
    private ngZone: NgZone) {}

    ngAfterViewInit(): void {
      /*
      console.log('inicio');
      console.log('inicio', this.searchElementRef);
      console.log('inicio', this.searchElementRef.nativeElement);
      // Mueve la lógica de autocompletado a ngAfterViewInit para asegurarte de que el DOM esté listo
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address'], // Filtra los resultados a direcciones
        componentRestrictions: { country: 'MX' } // Limita las búsquedas a México (puedes ajustarlo)
      });
  
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry && place.formatted_address) {
            this.address = place.formatted_address; // Almacena la dirección formateada
          } else {
            this.address = ''; // Maneja casos donde no se selecciona una dirección válida
          }
        });
      });
      */
    }

    submitForm(){

     

      if (this.validateForm.valid) {
        this.btnLoading = true;
        
        let request:any = 
        {
          telefono: this.validateForm.value.telefono,
          correoElectronico: this.validateForm.value.correoElectronico,
          nombre: this.validateForm.value.nombre,
          apellidos: this.validateForm.value.apellidos,
          tipoVehiculo: this.validateForm.value.tipoVehiculo,
          fecha: this.validateForm.value.fecha,
          tipoVehiculoEspecificacion: this.validateForm.value.especifique,
          origen: this.validateForm.value.origen,
          referenciaOrigen: this.validateForm.value.referenciaOrigen,
          destino: this.validateForm.value.destino,
          referenciaDestino: this.validateForm.value.referenciaDestino,
          accidente: this.validateForm.value.accidente,//
          fugaCombustible: this.validateForm.value.fugaCombustible,//
          llantasGiran: this.validateForm.value.llantasGiran,//
          puedeNeutral: this.validateForm.value.puedeNeutral,//
          lugarUbicuidad: this.validateForm.value.lugarUbicuidad,
          cantidadPersonas: this.validateForm.value.cantidadPersonas,
          carril: this.validateForm.value.carril,
          km: this.validateForm.value.km,
          ciudad: this.validateForm.value.ciudad,
          tipoEstacionamiento: this.validateForm.value.tipoEstacionamiento,
          piso: this.validateForm.value.piso,
          marca: this.validateForm.value.marca,
          modelo: this.validateForm.value.modelo,
          anio: this.validateForm.value.anio,
          color: this.validateForm.value.color,
          permiso: this.validateForm.value.permiso,//
          placaPermiso: this.validateForm.value.placaPermiso,
          modificaciones: this.validateForm.value.modificaciones,//
          modificacionesEspecificacion: this.validateForm.value.modificacionesEspecificacion,
          LatOrigen: this.latOrigen,
          LatDestino: this.latDestino,
          lngOrigen: this.lngOrigen,
          lngDestino: this.lngDestino,
          municipioOrigen: this.municipioOrigen,
          municipioDestino: this.municipioDestino,
        }
        console.log(request);
        this.servicioService.RegistraServicio(request)
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

    lugarUbicuidadChanged(){
      this.lugarUbicuidad = this.validateForm.value.lugarUbicuidad;
    }

    validateInput(event: KeyboardEvent): void {
      const inputChar = String.fromCharCode(event.keyCode);
      
      // Solo permitir números
      if (!/^\d+$/.test(inputChar)) {
        event.preventDefault();
      }
    }

    ngOnInit() {

      this.validateForm = this.fb.group({
        telefono: ['',[Validators.required]],
        correoElectronico: ['',[Validators.required]],
        nombre: ['',[Validators.required]],
        apellidos: ['',[Validators.required]],

        tipoVehiculo: ['',[Validators.required]],
        especifique: [''],
        origen: ['',[Validators.required]],
        referenciaOrigen: ['',[Validators.required]],
        destino: ['',[Validators.required]],
        referenciaDestino: ['',[Validators.required]],
        accidente: ['',[Validators.required]],
        fugaCombustible: ['',[Validators.required]],
        llantasGiran: ['',[Validators.required]],
        puedeNeutral: ['',[Validators.required]],
        lugarUbicuidad: ['',[Validators.required]],
        cantidadPersonas: ['',[Validators.required]],
        fecha: ['',[Validators.required]],
        carril: [''],
        km: [''],
        ciudad: [''],

        tipoEstacionamiento: [''],
        piso: [''],

        marca: ['',[Validators.required]],
        modelo: ['',[Validators.required]],
        anio: ['',[Validators.required]],
        color: ['',[Validators.required]],
        permiso: ['',[Validators.required]],
        placaPermiso: ['',[Validators.required]],
        modificaciones: ['',[Validators.required]],
        modificacionesEspecificacion: ['',[Validators.required]],

        //observaciones: ['',[Validators.required]],
        //prioridad: ['',[Validators.required]],
        //descripcion: ['',[Validators.required]]
      });



      if (this.searchElementDestinoRef) {
        const autocompleteDestino = new google.maps.places.Autocomplete(this.searchElementDestinoRef.nativeElement, {
          types: ['address'], // Solo sugerencias de direcciones
          componentRestrictions: { country: 'MX' } // Restringe a México
        });

        autocompleteDestino.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocompleteDestino.getPlace();
            if (place.geometry && place.formatted_address) {
              this.address = place.formatted_address; // Actualiza la dirección
             
              // Guardar las coordenadas
              this.latDestino = place.geometry.location.lat();
              this.lngDestino = place.geometry.location.lng();

              const addressComponents = place.address_components;
              // Busca el componente que corresponde al municipio
              addressComponents.forEach(component => {
                if (component.types.includes("locality") || component.types.includes("administrative_area_level_2")) {
                  this.municipioDestino = component.long_name; // Guarda el nombre del municipio
                }
              });
            } else {
              this.address = ''; // Limpia si no hay una dirección válida
            }
          });
        });
      } else {
        console.error('El campo de búsqueda no está disponible');
      }

      if (this.searchElementOrigenRef) {
        const autocompleteOrigen = new google.maps.places.Autocomplete(this.searchElementOrigenRef.nativeElement, {
          types: ['address'], // Solo sugerencias de direcciones
          componentRestrictions: { country: 'MX' } // Restringe a México
        });

        autocompleteOrigen.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocompleteOrigen.getPlace();
            if (place.geometry && place.formatted_address) {
              this.address = place.formatted_address; // Actualiza la dirección
              console.log(place);

              // Guardar las coordenadas
              this.latOrigen = place.geometry.location.lat();
              this.lngOrigen = place.geometry.location.lng();
              
              const addressComponents = place.address_components;
              // Busca el componente que corresponde al municipio
              addressComponents.forEach(component => {
                if (component.types.includes("locality") || component.types.includes("administrative_area_level_2")) {
                  this.municipioOrigen = component.long_name; // Guarda el nombre del municipio
                }
              });

            } else {
              this.address = ''; // Limpia si no hay una dirección válida
            }
          });
        });
      } else {
        console.error('El campo de búsqueda no está disponible');
      }

    }

  loadGooglePlacesAutocomplete() {
    
  }


  tipoVehiculoChanged(){
    this.tipoVehiculo = this.validateForm.value.tipoVehiculo;
  }

  isDarkMode(): boolean {
    return false;//this.document.body.classList.contains('dark');
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    this.isLoading = false;
    this.showContent = true;
    this.loadGooglePlacesAutocomplete();
  }
}
