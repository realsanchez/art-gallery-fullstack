import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InfoCardComponent } from '../info-card/info-card.component';

@Component({
  selector: 'app-body-landingpage',
  standalone: true,
  imports: [CommonModule, RouterLink, InfoCardComponent],
  templateUrl: './body-landingpage.component.html',
  styleUrl: './body-landingpage.component.css',
})
export class BodyLandingpageComponent {
  cards: any[] = [
    // Example data
    {
      ruta: '/arte-hasta-s-xix',
      imagenUrl:
        'https://cdn.culturagenial.com/es/imagenes/cuadro-la-creacion-de-adan-de-miguel-angel-og.jpg?class=ogImageSquare',
      titulo: 'Arte Hasta el siglo XIX',
      descripcion: 'Descubre la riqueza del arte desde la antigüedad hasta el siglo XIX.',
    },
    {
      ruta: '/vanguardias',
      imagenUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
      titulo: 'Vanguardias',
      descripcion: 'Investiga las principales tendencias artísticas del siglo XX.',
    },
    {
      ruta: '/arte-contemporaneo',
      imagenUrl:
        'https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvNWM3MjdhYzc4MGM0Zi5qcGciLCJyZXNpemUsODAwIl19.bjDsiiPgLNsncI9OtjlJKekCjFc2XcEY7zkvjfvnqNk.jpg',
      titulo: 'Arte Contemporáneo',
      descripcion: 'Sumergete en la riqueza del arte contemporáneo.',
    },
  ];
}
