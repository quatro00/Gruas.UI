// Generated by https://quicktype.io

export interface CitaOrdenCompra {
    id:               string;
    ordenCompra:      string;
    centro:           string;
    fechaOrdenCompra: string;
    fechaVencimiento: string;
    departamento:     string;
    totalPiezas:      number;
    montoTotal:       number;
    piezasEntregadas: number;
    tipo: string;
    asn: string;
    detalle:          Detalle[];
    isActive?:string;
}

export interface Detalle {
    id:                 string;
    numeroDocumento:    string;
    posicion:           string;
    material:           string;
    descripcion:        string;
    grupoArticulos:     string;
    cantidadSolicitada: number;
    cantidadEntregada:  number;
    cantidadAgendada:   number;
    cantidadDisponible: number;
    valorNeto:          number;
    valorBruto:         number;
    precio:             number;
    cantidadAEntregar?:number;
    unidadMedida?:string;
}