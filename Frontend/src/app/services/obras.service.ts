import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obra } from '../models/obra';

export interface ObrasResponse {
  results: Obra[];
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ObrasService {
  private apiUrl = 'http://localhost:3000/api/obras';

  // Constructor del servicio
// Angular inyecta HttpClient para poder hacer peticiones HTTP (GET, POST, etc.)
constructor(private http: HttpClient) {}


// ================================
// OBTENER LISTADO DE OBRAS
// ================================
// Devuelve un listado general de obras
// Puede recibir filtros opcionales (page, search, categoria, etc.)
getObras(params?: Record<string, any>): Observable<ObrasResponse> {

  // Creamos un objeto vacío para los parámetros de la URL
  // Ejemplo final: ?page=1&search=arte
  let httpParams = new HttpParams();

  // Si nos pasan parámetros...
  if (params) {

    // Recorremos cada parámetro recibido
    Object.entries(params).forEach(([key, value]) => {

      // Si el valor es null o undefined, lo ignoramos
      if (value === null || value === undefined) return;

      // Convertimos el valor a string y quitamos espacios
      const v = String(value).trim();

      // Si queda vacío, no lo agregamos
      if (!v) return;

      // Agregamos el parámetro a la URL
      // Ejemplo: ?page=1
      httpParams = httpParams.set(key, v);
    });
  }

  // Hacemos la petición GET al backend
  // Enviamos los parámetros construidos
  // Esperamos una respuesta tipo ObrasResponse
  return this.http.get<ObrasResponse>(this.apiUrl, {
    params: httpParams,
  });
}


// ================================
// OBTENER UNA OBRA POR ID
// ================================
// Se usa para ver el detalle de una obra concreta
// Ejemplo de URL: /obras/123
getObraById(id: string): Observable<Obra> {

  // Llamada GET pasando el id en la URL
  return this.http.get<Obra>(`${this.apiUrl}/${id}`);
}


// ================================
// OBRAS POR COLECCIÓN
// ================================
// Permite pedir colecciones específicas (1, 2 o 3)
// El tipo evita que se pasen otros números
getObrasColeccion(n: 1 | 2 | 3): Observable<ObrasResponse> {

  // Llamada GET a /obras1, /obras2 o /obras3
  return this.http.get<ObrasResponse>(`${this.apiUrl}${n}`);
}


// ================================
// MÉTODOS ALIAS (ATAJOS)
// ================================
// Estos métodos existen para no romper código viejo
// Simplemente llaman al método general

getObras1(): Observable<ObrasResponse> {
  return this.getObrasColeccion(1);
}

getObras2(): Observable<ObrasResponse> {
  return this.getObrasColeccion(2);
}

getObras3(): Observable<ObrasResponse> {
  return this.getObrasColeccion(3);
}

}
