// arte-contemporaneo.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObrasService } from '../services/obras.service';

@Component({
  selector: 'app-vanguardias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vanguardias.component.html',
  styleUrls: ['./vanguardias.component.css'],
})
export class VanguardiasComponent implements OnInit {
  obraSeleccionada: any = null;
  mostrarModal = false;

  abrirModal(obra: any) {
    this.obraSeleccionada = obra;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.obraSeleccionada = null;
  }

  // Declarar obras2 como una señal que contiene un array
  obras2 = signal<any[]>([]);

  // Declarar isLoading como una señal, inicializada en true
  isLoading = signal(true);

  constructor(private obrasService: ObrasService) {}

  ngOnInit(): void {
    this.obrasService.getObras2().subscribe({
      next: (res) => {
        this.obras2.set(res.results);
        console.log('RESPUESTA BACKEND OBRAS2:', res);
      },
      error: (err) => {
        console.error('Error al cargar obras:', err);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
