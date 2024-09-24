export interface InsAltasPendientesRequest {
    id: string;
    anio: number;
    numeroAltaContable:string;
    gpo:string;
    gen: string;
    esp: string;
    dif: string;
    var: string;
    descripcionArticulo: string;
    
    tieneCartaCanje?:number;
    cantidadRecibida: number;
    lote:string;
    fechaCaducidad?:string;
  }