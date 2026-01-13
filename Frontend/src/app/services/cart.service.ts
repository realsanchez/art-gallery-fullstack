
import { Injectable, computed, effect, signal } from '@angular/core';

// Acá importo Obra para usarlo en el carrito
import { Obra } from '../models/obra';

// Cada item del carrito guarda: la obra + la cantidad
export interface CartItem {
  obra: Obra;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  // Acá lo que les explicaba, la clave para persistir en localStorage
  private readonly storageKey = 'cart_items_v1';

  // =======================
  // ESTADO PRINCIPAL (Signal)
  // =======================
  // items es el estado central del carrito.
  // Se inicializa llamando a load() para recuperar lo guardado en localStorage
  items = signal<CartItem[]>(this.load());

  // =======================
  // DERIVADOS (Computed)
  // =======================
  // count: cantidad total de productos sumando sus qty
  // (ej: 2 items de una obra + 1 de otra => count = 3)
  count = computed(() => this.items().reduce((acc, it) => acc + it.qty, 0));

  // voy a usar ?? 0 para evitar errores si alguna obra no tiene precio
  total = computed(() =>
    this.items().reduce((acc, it) => acc + (it.obra.precio ?? 0) * it.qty, 0)
  );

  constructor() {

    // effect se ejecuta cada vez que cambia this.items()
    // y guarda el carrito actualizado en localStorage sin que el componente haga nada
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items()));
    });
  }


  // Agrega una obra al carrito.
  // Si ya existe, suma cantidad. Si no existe, la agrega como nuevo item.
  add(obra: Obra, qty = 1) {
    const current = this.items();

    // Buscamos si la obra ya estaba en el carrito por su _id
    const idx = current.findIndex((x) => x.obra._id === obra._id);

    if (idx >= 0) {
      // Si ya existe: actualizamos la cantidad
      const copy = [...current];
      copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
      this.items.set(copy); // actualiza el signal => se recalculan computeds + se persiste
      return;
    }

    // Si no existe: lo agregamos al final
    this.items.set([...current, { obra, qty }]);
  }

  // Elimina una obra del carrito por su ID
  remove(obraId: string) {
    this.items.set(this.items().filter((x) => x.obra._id !== obraId));
  }

  // Acá asigna una cantidad específica para una obra del carrito
  setQty(obraId: string, qty: number) {
    // Convertimos a número, redondeamos, y evitamos valores inválidos:
    // mínimo 1 para que no existan cantidades 0 o negativas
    const safeQty = Math.max(1, Math.floor(Number(qty) || 1));

    // Recorremos el carrito y reemplazamos solo el item que coincide
    this.items.set(
      this.items().map((x) =>
        x.obra._id === obraId ? { ...x, qty: safeQty } : x
      )
    );
  }

  
  // Subir cantidad en 1 (para botón +)
  inc(obraId: string) {
    // Buscamos item
    const item = this.items().find((x) => x.obra._id === obraId);
    if (!item) return;

    // Delegamos en setQty para mantener una sola lógica de validación
    this.setQty(obraId, item.qty + 1);
  }

  // Bajar cantidad en 1 (para botón -)
  // Si la cantidad llega a 0, eliminamos el item del carrito
  dec(obraId: string) {
    const item = this.items().find((x) => x.obra._id === obraId);
    if (!item) return;

    const nextQty = item.qty - 1;
    if (nextQty <= 0) {
      // Si baja de 1: borramos el item directamente
      this.remove(obraId);
      return;
    }

    // Si sigue siendo válido: actualizamos
    this.setQty(obraId, nextQty);
  }

  // Vacía el carrito completo
  clear() {
    this.items.set([]);
  }

  // =======================
  // CARGA DESDE localStorage
  // =======================
  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.storageKey);

      // Si no existe nada guardado, empezamos con carrito vacío
      if (!raw) return [];

      return JSON.parse(raw) as CartItem[];
    } catch {
      return [];
    }
  }
}
