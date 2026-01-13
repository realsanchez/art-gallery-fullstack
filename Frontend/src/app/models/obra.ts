export interface Artista {
  _id: string;
  nombre: string;
  nacionalidad?: string;
  fechaNacimiento?: string;
  biografia?: string;
}

export interface Obra {
  _id: string;
  titulo: string;
  artista: Artista;
  anio?: number;
  tipo?: string;
  precio?: number;
  disponible?: boolean;

  // ✅ NUEVO (opcional): URL de imagen para mostrar en Marketplace / detalle
  // No rompe nada porque es opcional.
  imagenUrl?: string;
}
