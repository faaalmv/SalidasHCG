export interface Article {
  id: string;
  codigo: string;
  descripcion: string;
  presentacion: string;
  cantidadMaxima: number;
}

export interface FormRow {
  id: number;
  articulo?: Article;
  cantidadPedida: string;
  cantidadSurtida: string;
  observaciones: string;
}