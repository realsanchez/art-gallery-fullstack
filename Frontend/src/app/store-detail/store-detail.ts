import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';

import { ObrasService } from '../services/obras.service';
import { Obra } from '../models/obra';

@Component({
  selector: 'app-store-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './store-detail.html',
  styleUrls: ['./store-detail.css'],
})
export class StoreDetailComponent {

  // ActivatedRoute lo uso para parámetros dinámicos de la URL
  // En este caso, vamos a leer el :id de /store/:id
  private route = inject(ActivatedRoute);

  // Servicio que se comunica con el backend para traer las obras
  private obrasService = inject(ObrasService);

  obra = signal<Obra | null>(null);

  isLoading = signal(true);

  errorMsg = signal<string | null>(null);

  constructor() {

    // effect se ejecuta automáticamente cuando el componente se crea
    // Lo uso como punto de entrada para cargar la obra por ID
    effect(() => {

      //  Leemos el ID directamente desde la URL
      const id = this.route.snapshot.paramMap.get('id');

      //  Si no hay ID en la ruta, mostramos error y frenamos todo
      if (!id) {
        this.errorMsg.set('No se recibió un ID en la ruta.');
        this.isLoading.set(false);
        return;
      }

      //  Arranca la carga del detalle
      this.isLoading.set(true);
      this.errorMsg.set(null);

      //  Llamamos al backend para traer UNA obra por su ID
      // GET /api/obras/:id
      this.obrasService
        .getObraById(id)

        // Esto usé para probar el error desde el frontend
        .pipe(finalize(() => this.isLoading.set(false)))

        //  Nos suscribimos a la respuesta del backend
        .subscribe({

          //  Si sale bien, guardamos la obra en el signal
          next: (data) => this.obra.set(data),

          //  Si hay error, lo logueamos y mostramos mensaje amigable
          error: (err) => {
            console.error('Error al cargar obra por ID:', err);
            this.errorMsg.set('Error al cargar la obra.');
          },
        });
    });
  }
}