
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';


import { RouterLink } from '@angular/router';

// Importamos el servicio del carrito, que contiene toda la lógica del estado
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',

  standalone: true,

  imports: [CommonModule, RouterLink],

  // Archivo HTML asociado al carrito
  templateUrl: './cart.html',

  styleUrls: ['./cart.css'],
})
export class CartComponent {

  // Inyectamos el CartService como público para poder usarlo directamente en el HTML
  // Ejemplo: cart.items(), cart.total(), cart.clear(), etc.
  constructor(public cart: CartService) {}

  // Helper para calcular el total por línea (precio * cantidad)
  // Se usa para mostrar el subtotal de cada obra en el carrito
  lineTotal(precio: number | undefined | null, qty: number): number {
    // Uso el operador ?? para evitar errores si el precio es null o undefined
    return (precio ?? 0) * (qty ?? 0);
  }
}