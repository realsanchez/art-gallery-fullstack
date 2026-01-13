import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselItem {
  src: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit, OnDestroy, OnChanges {
  //para definir que este componente va a tener imagenes necesita un array al que le voy a llamar 'images'.
  @Input() images: CarouselItem[] = []; //datos que recibe del componente padre (home.component.ts)
  @Input() interval: number = 5000; //intervalo de 5 segundos entre cada imagen
  currentImageIndex: number = 0;
  private slideInterval: any; //variable que guarda la referencia del intervalo
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    if (this.images.length > 1) {
      this.startAutoSlide();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && this.images.length > 1) {
      this.restartSlideInterval();
    }
  }

  goToSlide(index: number): void {
    //para la navegación por indicadores
    this.currentImageIndex = index;
    this.restartSlideInterval();
  }
  // ------------- CONTROLADOR DE SLIDE -------------
  nextSlide() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    // No reiniciamos el intervalo aquí si es llamado por el intervalo mismo.
    // Pero si es llamado por el botón, deberíamos.
    // Para simplificar, asumiremos que si el usuario interactúa, reiniciamos desde el HTML llamando a una función wrapper o modificaremos esto.
    // Mejor estrategia: nextSlide solo mueve. startAutoSlide sigue corriendo.
    // Si el usuario toca, llamamos a resetTimer().
  }

  // Métodos para botones (interacción manual)
  manualNext() {
    this.nextSlide();
    this.restartSlideInterval();
  }

  manualPrev() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    this.restartSlideInterval();
  }

  // ------------- AUTO SLIDE -------------
  startAutoSlide(): void {
    this.stopAutoSlide();
    this.slideInterval = setInterval(() => {
      //inicia el bucle de slides
      this.nextSlide(); //avanza al siguiente slide
      this.cdr.detectChanges(); // Se asegura de que Angular detecte los cambios y actualice la vista
    }, this.interval); //corresponde al intervalo de tiempo entre cada slide (5 segundos)
  }

  stopAutoSlide(): void {
    //funcion de tipo void: no retorna ningun valor
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  restartSlideInterval(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  // -------------- LIMPIEZA -------------
  // se asegura de que el intervalo se detenga cuando se cambiamos a una página diferente, de esta manera, se mantiene la rapidez de la aplicacion
  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
  }
}
