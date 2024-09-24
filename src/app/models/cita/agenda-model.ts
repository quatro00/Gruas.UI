export interface AgendaModel {
  minutos:number;
  bloques:Bloques[];
}

export interface Bloques {
  fecha: string;
  bloquesAndenes: BloquesAndene[];
}
export interface BloquesAndene {
  numBloque: number;
  rielId: string;
  name: string;
  start: string;
  end: string;
  color: string;
}