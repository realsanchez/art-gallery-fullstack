import { Component, OnInit, signal, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ObrasService } from '../services/obras.service';
import { CartService } from '../services/cart.service';
import { Obra } from '../models/obra';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  obras = signal<Obra[]>([]);
  isLoading = signal(true);
  errorMsg = signal<string | null>(null);

  // Inyección para escuchar cambios de query params
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // El cart es público para usar cart.count() en el HTML
  constructor(
    private obrasService: ObrasService,
    public cart: CartService
  ) {}

  //  Base URL del backend (donde está Express sirviendo /ImagenesDeObras)
  private readonly backendBaseUrl = 'http://localhost:3000';

    // Aca hice un map para las imagenes que no coincidian bien

  private readonly imageMap: Record<string, string> = {
    'Guernica': 'Guernica.jpg',
    'Máscara funeraria de Tutankamon': 'MascaraTutan-Kamon.jpg',
    'La creacion de Adán (Capilla Sixtina)': 'LaCreacionDeAdan.jpg',
    'Las Meninas': 'LasMeninas.jpg',
    'Pinturas rupestres de la Cueva de Altamira': 'altamira.jpg',
    'Laocoonte y sus hijos': 'Laocoonte.jpg',
    'Mosaico del Emperador Justiniano y su séquito (San Vital, Rávena)': 'MosaicoJustiniano.jpg',

    'David': 'David.jpg',
    'La Piedad de Villeneuve-les-Avignon': 'LaPiedadDeVilleneuve-les-Avignon.jpg',
    'El 3 de Mayo en Madrid (Los fusilamientos)': 'Fusilamiento.jpg',
    'La Libertad guiando al pueblo': 'LibertadGuiandoAlPueblo.jpg',

    // (si los tengo en el seed)
    'La persistencia de la memoria': 'LaPersistenciaDeLaMemoria.jpg',
    'El grito': 'ElGrito.jpg',
    'La noche estrellada': 'LaNocheEstrellada.jpg',
    'Impresión, sol naciente': 'ImpresionSolNaciente.jpg',
    'Fuente': 'Fountain.jpg',
    'Cena': 'DinnerParty.jpg',
    'Cindy Sherman': 'CindySherman.jpg',
    'Lo imposible': 'ElCorderoImposible.jpg',
    'Niña con globo': 'GirlWithBallon.jpg',
  };


  ngOnInit(): void {
    // Cada vez que cambian los filtros del buscador
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const artista = (params.get('artista') ?? '').trim();
        const anioMin = (params.get('anioMin') ?? '').trim();
        const anioMax = (params.get('anioMax') ?? '').trim();

        const query: any = {};

        if (artista) query.artista = artista;
        if (anioMin) query.anioMin = anioMin;
        if (anioMax) query.anioMax = anioMax;

        this.fetchObras(query);
      });
  }

  // Carga de obras con o sin filtros
  fetchObras(params?: Record<string, any>) {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    this.obrasService
      .getObras(params)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          this.obras.set(res.results ?? []);
        },
        error: (err) => {
          console.error('Error al cargar obras:', err);
          this.errorMsg.set('No se pudieron cargar las obras.');
          this.obras.set([]);
        },
      });
  }

  // Añadir obra al carrito
  addToCart(obra: Obra) {
    this.cart.add(obra, 1);
  }

  // Helper visual (tipo / colección)
  getTipoLabel(tipo?: string): string {
    return (tipo ?? 'Sin tipo').trim();
  }

  //  URL de imagen para cada obra (con fallback)
  getImageUrl(obra: Obra): string {
    const file =
      this.imageMap[obra.titulo] ??
      this.slugifyFileName(obra.titulo) + '.jpg';

    return `${this.backendBaseUrl}/ImagenesDeObras/${file}`;
  }

  // Aca corregimos mascara de tutancamon (tiraba error) (aprox)
  
  private slugifyFileName(input: string): string {
    return (input ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // saca acentos
      .replace(/[^a-zA-Z0-9]+/g, '') // saca espacios y símbolos
      .trim();
  }
}
