import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GruaService } from 'src/app/services/grua.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent {
  id: string;
  isLoading = true;
  btnLoadingCancelacion = false;
  btnLoadingSolicitarCotizacion = false;
  btnLoadingEnviarPropuesta = false;
  btnLoadingTerminarServicio = false;

  showContent = false;
  showContentGallery = false;
  
  isVisible = false;
  isVisibleCotizacion = false;
  isVisibleCancelacion = false;
  isVisibleSolicitarCotizacion = false;
  isVisibleEnviarPropuesta = false;
  isVisibleTerminarServicio = false;

  searchValue = '';
  data:any[]=[];
  filteredData: any[] = [];
  validateForm!: UntypedFormGroup;
  validateFormCancelacion!: UntypedFormGroup;
  validateFormSolicitarCotizacion!: UntypedFormGroup;

  btnLoadingCotizacion = false;
  listItemClass: string = 'cursor-pointer relative inline-flex px-3 text-light dark:text-white/60 py-4 [&.active]:text-primary [&.active]:after:absolute [&.active]:ltr:after:left-0 [&.active]:rtl:after:right-0 [&.active]:after:bottom-0 [&.active]:after:w-full [&.active]:after:h-0.5 [&.active]:after:bg-primary [&.active]:after:rounded-10';
  gruaId:any;
  servicioId:any;

  //informacion del vehiculo
  estatusId;
  tipo;
  placas;
  marca;
  modelo;
  anio;
  numPersonas;

  //informacion del traslado
  origen;
  destino;
  estado;
  municipio;
  kilometros;
  tiempoEstimado;

  //informacion adicional
  fugaCombustible;
  llantasGiran;
  neutral;
  personasEnVehiculo;
  lugar;
  carril;
  kilometro;
  tipoEstacionamiento;
  pisoEstacionamiento;
  vehiculoAccidentado;

  costoKilometro;
  tarifaInicial;
  tarifaDinamica;
  maniobras;
  totalSugerido;

  constructor(
    private route: ActivatedRoute,
    private servicioService:ServicioService,
    private gruaService:GruaService,
    private fb: UntypedFormBuilder,
    private msg: NzMessageService
  ) {}

  showEdit(item){

  }

  showGruas(){
    this.isVisible = true;
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      razonSocial: [null, [Validators.required]],
      marca: [null, [Validators.required]],
      modelo: [null, [Validators.required]],
      placas: [null, [Validators.required]],
      anio: [null, [Validators.required]],
      tiempo: [null, [Validators.required]],
      costo: [null, [Validators.required]],
    });

    this.validateFormCancelacion = this.fb.group({
      motivo: [null, [Validators.required]],
    });

    this.id =this.route.snapshot.paramMap.get('id');

    // Simulate loading time
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


    
    
    this.servicioService.GetServicio(this.id)
    .subscribe({
      next:(response)=>{
        console.log(response);
        this.estatusId = response.estatusServicio;
        this.costoKilometro = response.costoPorKm;
        this.tarifaInicial = response.tarifaInicial;
        this.tarifaDinamica = response.tarifaDinamica;
        this.maniobras = response.maniobras;
        this.totalSugerido = response.totalSugerido;

        this.tipo = response.tipo;
        this.placas = response.placas;
        this.marca = response.marca;
        this.anio = response.anio;
        this.numPersonas = response.numPersonas;
        this.modelo = response.modelo;

        this.origen = response.origen;
        this.destino = response.destino;
        this.estado = response.estado;
        this.municipio = response.municipio;
        this.kilometros = response.kilometros;
        this.tiempoEstimado = response.tiempoEstimado;

        this.fugaCombustible = response.fugaCombustible;
        this.llantasGiran = response.llantasGiran;
        this.neutral= response.esPosibleNeutral;
        this.personasEnVehiculo = response.personasEnVehiculo;
        this.lugar = response.lugar;
        this.carril = response.carril;
        this.kilometro = response.kilometro;
        this.tipoEstacionamiento = response.tipoEstacionamiento;
        this.pisoEstacionamiento = response.pidoEstacionamiento;
        this.vehiculoAccidentado = response.vehiculoAccidentado;
        //this.data = response;
        //this.razonesSociales = response.razonesSociales;
        this.loadData();
      },
      complete:()=>{
        //this.btnLoading = false;
      },
      error:()=>{
        //this.btnLoading = false;
      }
    })
    
  }

  LoadData2(){
    // Simulate loading time
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


    
    
    this.servicioService.GetServicio(this.id)
    .subscribe({
      next:(response)=>{
        console.log(response);
        this.estatusId = response.estatusServicio;
        this.costoKilometro = response.costoPorKm;
        this.tarifaInicial = response.tarifaInicial;
        this.tarifaDinamica = response.tarifaDinamica;
        this.maniobras = response.maniobras;
        this.totalSugerido = response.totalSugerido;

        this.tipo = response.tipo;
        this.placas = response.placas;
        this.marca = response.marca;
        this.anio = response.anio;
        this.numPersonas = response.numPersonas;
        this.modelo = response.modelo;

        this.origen = response.origen;
        this.destino = response.destino;
        this.estado = response.estado;
        this.municipio = response.municipio;
        this.kilometros = response.kilometros;
        this.tiempoEstimado = response.tiempoEstimado;

        this.fugaCombustible = response.fugaCombustible;
        this.llantasGiran = response.llantasGiran;
        this.neutral= response.esPosibleNeutral;
        this.personasEnVehiculo = response.personasEnVehiculo;
        this.lugar = response.lugar;
        this.carril = response.carril;
        this.kilometro = response.kilometro;
        this.tipoEstacionamiento = response.tipoEstacionamiento;
        this.pisoEstacionamiento = response.pidoEstacionamiento;
        this.vehiculoAccidentado = response.vehiculoAccidentado;
        //this.data = response;
        //this.razonesSociales = response.razonesSociales;
        this.loadData();
      },
      complete:()=>{
        //this.btnLoading = false;
      },
      error:()=>{
        //this.btnLoading = false;
      }
    })
  }

  showTerminarServicio(){
    this.isVisibleTerminarServicio = true;
  }

  handleCancelTerminarServicio(){
    this.isVisibleTerminarServicio = false;
  }

  enviarTerminarServicio(){
    this.btnLoadingTerminarServicio = true;
    let request:any = 
      {
        servicioId: this.id
      }

      this.servicioService.TerminarServicio(request)
      .subscribe({
        next:(response)=>{
          this.loadData();
        },
        complete:()=>{
          this.btnLoadingTerminarServicio = false;
          this.isVisibleTerminarServicio = false;
          this.msg.success('Servicio actualizado correctamente.');
          this.loadData();
        },
        error:()=>{
          this.msg.error('Ocurrio un error al cancelar el servicio.');
          this.btnLoadingTerminarServicio = false;
          this.isVisibleTerminarServicio = false;
          this.loadData();
        }
      })
  }

  showEnviarPropuesta(){
    this.isVisibleEnviarPropuesta =true;
  }

  handleCancelEnviarPropuesta(){
    this.isVisibleEnviarPropuesta = false;
  }

  showCancelacion(){
    this.validateFormCancelacion.reset();
    this.isVisibleCancelacion = true;
  }

  enviarEnviarPropuesta(){
    this.btnLoadingEnviarPropuesta = true;

    let request:any = 
      {
        servicioId: this.id
      }

      this.servicioService.ColocarEnPropuesta(request)
      .subscribe({
        next:(response)=>{
          this.loadData();
        },
        complete:()=>{
          this.btnLoadingEnviarPropuesta = false;
          this.isVisibleEnviarPropuesta = false;
          this.msg.success('Servicio actualizado correctamente.');
          this.loadData();
        },
        error:()=>{
          this.msg.error('Ocurrio un error al cancelar el servicio.');
          this.btnLoadingEnviarPropuesta = false;
          this.isVisibleEnviarPropuesta = false;
          this.loadData();
        }
      })
  }

  showSolicitarCotizaciones(){
    this.isVisibleSolicitarCotizacion = true;
  }

  handleCancelSolicitarCotizacion(){
    this.isVisibleSolicitarCotizacion = false;
  }

  enviarSolicitarCotizacion(){
    this.btnLoadingSolicitarCotizacion = true;

    let request:any = 
      {
        servicioId: this.id
      }

      this.servicioService.SolicitarCotizaciones(request)
      .subscribe({
        next:(response)=>{
          this.loadData();
        },
        complete:()=>{
          this.btnLoadingSolicitarCotizacion = false;
          this.isVisibleSolicitarCotizacion = false;
          this.msg.success('Servicio actualizado correctamente.');
          this.loadData();
        },
        error:()=>{
          this.msg.error('Ocurrio un error al cancelar el servicio.');
          this.btnLoadingSolicitarCotizacion = false;
          this.isVisibleSolicitarCotizacion = false;
          this.loadData();
        }
      })

  }

  submitFormCancelacion(){

  }

  cancelarServicio(){
    
    if (this.validateFormCancelacion.valid) {
      this.btnLoadingCancelacion = true;
      let request:any = 
      {
        servicioId: this.id,
        motivo: this.validateFormCancelacion.value.motivo
      }

      this.servicioService.CancelarServicio(request)
      .subscribe({
        next:(response)=>{
          this.loadData();
        },
        complete:()=>{
          this.btnLoadingCancelacion = false;
          this.isVisibleCancelacion = false;
          this.msg.success('Servicio cancelado correctamente.');
          this.loadData();
        },
        error:()=>{
          this.msg.error('Ocurrio un error al cancelar el servicio.');
          this.btnLoadingCancelacion = false;
        }
      })
    } else {
      Object.values(this.validateFormCancelacion.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({
            onlySelf: true
          });
        }
      });
    }
  }

  guardarCotizacion(){
    if (this.validateForm.valid) {
      this.btnLoadingCotizacion = true;
      let request:any = 
      {
        gruaId: this.gruaId,
        servicioId: this.id,
        costo: this.validateForm.value.costo,
        tiempo: this.validateForm.value.tiempo
      }

      this.servicioService.AsignarGrua(request)
      .subscribe({
        next:(response)=>{
          this.loadData();
        },
        complete:()=>{
          this.btnLoadingCotizacion = false;
          this.isVisibleCotizacion = false;
          this.isVisible = false;
        },
        error:()=>{
          this.btnLoadingCotizacion = false;
          this.isVisibleCotizacion = false;
          this.isVisible = false;
        }
      })
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

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
      this.showContentGallery = true;
    }, 500);
  }

  

  showEditCotizacion(item){

    this.gruaId = item.id;
    this.validateForm.setValue({
      razonSocial: item.proveedor,
      marca: item.marca,
      modelo: item.modelo,
      placas: item.placas,
      anio: item.anio,
      tiempo: '',
      costo: '',
  });

    this.isVisibleCotizacion = true;
  }
  handleCancelCotizacion(){
    this.isVisibleCotizacion = false;
  }
  handleCancel(){
    this.isVisible = false;
  }

  handleCancelCancelacion(){
    this.isVisibleCancelacion = false;
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

  // Function to handle tab selection
  gallery = [
    { url: '../../../assets/images/gallery/g1.png', caption: 'presentation web-design', title: 'Presentation Web Design', description: 'A collection of web design images for presentations.' },
    { url: '../../../assets/images/gallery/g2.png', caption: 'web-design', title: 'Web Design', description: 'Various web design examples and inspirations.' },
    { url: '../../../assets/images/gallery/g3.png', caption: 'ui-design web-design', title: 'UI Design Web Design', description: 'Examples of UI design for web applications and websites.' },
    { url: '../../../assets/images/gallery/g4.png', caption: 'wireframe', title: 'Wireframe', description: 'Wireframe designs for planning and prototyping.' },
    { url: '../../../assets/images/gallery/g5.png', caption: 'presentation', title: 'Presentation', description: 'Images and graphics for presentations.' },
    { url: '../../../assets/images/gallery/g6.png', caption: 'web-design wireframe', title: 'Web Design Wireframe', description: 'Combining web design and wireframe concepts.' },
    { url: '../../../assets/images/gallery/g7.png', caption: 'ui-design', title: 'UI Design', description: 'User interface design examples and ideas.' },
    { url: '../../../assets/images/gallery/g8.png', caption: 'wireframe', title: 'Wireframe', description: 'Wireframe designs for planning and prototyping.' },
    { url: '../../../assets/images/gallery/g9.png', caption: 'web-design', title: 'Web Design', description: 'Various web design examples and inspirations.' },
    { url: '../../../assets/images/gallery/g10.png', caption: 'ui-design presentation', title: 'UI Design Presentation', description: 'UI design examples for presentations.' },
    { url: '../../../assets/images/gallery/g11.png', caption: 'web-design', title: 'Web Design', description: 'Various web design examples and inspirations.' },
    { url: '../../../assets/images/gallery/g12.png', caption: 'presentation wireframe', title: 'Presentation Wireframe', description: 'Wireframe designs for presentations.' }
];


  filteredGallery = this.gallery;
  activeFilter = 'all';


}
