export interface ProductType {
  id: number;
  nombre: string;
  descripcion: string;
  precioPequena: number;
  precioMediana: number;
  precioFamiliar: number;
  imagen: string | null;
  categoria: {
    id: number;
    nombre: string;
  };
}

export type Size = "Pequena" | "Mediana" | "Familiar";

export interface CartItem extends ProductType {
  quantity: number;
  tamañoSeleccionado: Size;
}