export interface GuardarLotesModel {
    anio: number;
    numeroAltaContable:string;
    clave:string;
    lote: string;
    caducidad: string;
    cantidad: number;
    tieneCartaCanje?:number;
  }