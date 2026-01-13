// arte-contemporaneo.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObrasService } from '../services/obras.service';

@Component({
  selector: 'app-arte-hasta-s-xix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arte-hasta-s-xix.component.html',
  styleUrls: ['./arte-hasta-s-xix.component.css'],
})
export class ArteHastaSXIXComponent implements OnInit {
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

  // Declarar obras1 como una señal que contiene un array
  obras1 = signal<any[]>([]);

  // Declarar isLoading como una señal, inicializada en true
  isLoading = signal(true);

  constructor(private obrasService: ObrasService) {}

  ngOnInit(): void {
    this.obrasService.getObras1().subscribe({
      next: (res) => {
        this.obras1.set(res.results);
        console.log('RESPUESTA BACKEND OBRAS1:', res);
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
