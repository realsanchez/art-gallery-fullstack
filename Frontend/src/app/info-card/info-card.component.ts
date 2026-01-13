import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css',
})
export class InfoCardComponent {
  @Input() route!: any; // para poder acceder a la ruta del contenido del blog
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() description?: string; // ? indica que es opcional y así el texto no se muestra
  @Input() username?: string;
  @Input() likes?: string;
  @Input() date?: string;
}
