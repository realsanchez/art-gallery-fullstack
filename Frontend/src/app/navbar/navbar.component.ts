import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para usar *ngIf en el HTML
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../services/connect.services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  user: any = null; // Variable para guardar la información del usuario logueado

  constructor(
    private authService: AuthService,
    private router: Router,
    public cart: CartService // público para usar cart.count() en el HTML
  ) {}

  ngOnInit(): void {
    // Sirve para saber cuándo el usuario inicia o cierra sesión
    this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  // ✅ Buscador por ARTISTA 
  // OJO: deje anioMinRaw y anioMaxRaw como OPCIONALES para no romper
  // el código si alguien vuelve a usar años en el navbar en el futuro
  onSearchSubmit(
    event: Event,
    artistaRaw: string,
    anioMinRaw?: string,
    anioMaxRaw?: string
  ) {
    event.preventDefault();

    const artista = (artistaRaw ?? '').trim();

    // Si está vacío, limpiamos query params (vuelve a /store sin filtros)
    const queryParams: any = artista ? { artista } : {};

    // (Opcional) Si algún día vuelves a usar años en el navbar, ya queda listo:
    const anioMin = (anioMinRaw ?? '').trim();
    const anioMax = (anioMaxRaw ?? '').trim();
    if (anioMin) queryParams.anioMin = anioMin;
    if (anioMax) queryParams.anioMax = anioMax;

    this.router.navigate(['/store'], { queryParams });
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
  }
}
