export interface GetColaboradoresModel {
    id: string;
    noColaborador: number;
    nombre: string;
    apellidos: string;
    estado:string;
    fechaNacimiento:string;
    sexo:string;
    telefono:string;
    correo:string;
    estatus:string;
    formacionAcademica:[{
      id:string;
      colaboradorId:string;
      fechaInicio:string;
      fechaTermino:string;
      institucion:string;
      cedula:string;
      descripcion:string;
      nombre:string;
    }]
  }