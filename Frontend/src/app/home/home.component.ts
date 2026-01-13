import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselComponent, CarouselItem } from '../carousel/carousel.component'; // <-- Importa la interfaz
import { FooterComponent } from '../footer/footer.component';
import { BodyLandingpageComponent } from '../body-landingpage/body-landingpage.component';

interface Cards {
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  ruta: string;
}
@Component({
  selector: 'app-home',
  imports: [CarouselComponent, FooterComponent, BodyLandingpageComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // ------------------------- CAROUSEL -------------------------
  // Ahora el array debe ser de tipo CarouselItem[] con los detalles de cada slide
  imageUrls: CarouselItem[] = [
    {
      src: 'https://content-historia.nationalgeographic.com.es/medio/2022/10/07/bisontes-de-color-pintados-en-las-paredes-de-la-cueva-de-altamira_f4efc53e_1200x630.jpeg',
      title: 'Pinturas Rupestres de Altamira',
      description: 'Paleolítico. Cueva de Altamira, Santillana del Mar.',
    },
    {
      src: 'https://content-historia.nationalgeographic.com.es/medio/2024/05/02/fusilamientos_81c82b04_240502155817_1200x630.jpg',
      title: 'Los Fusilamientos del 3 de Mayo',
      description: 'Francisco de Goya y Lucientes, 1814. Museo del Prado, Madrid.',
    },
    {
      src: 'https://es.normandie-tourisme.fr/wp-content/uploads/sites/7/2022/05/claude-monet-Impression-soleil-levant-1872-Musee-Marmottan-Monet-Paris-%C2%A9-SLB-Christian-Baraja-1200x914-1.jpeg',
      title: 'Impresión: Sol Naciente',
      description: 'Claude Monet, 1872. Museo Marmottan, París.',
    },
    {
      src: 'https://recursos.museoreinasofia.es/styles/large_landscape/public/Obra/DE00050_2.jpg.webp',
      title: 'El Guernica',
      description: 'Pablo Picasso, 1937. Museo Reina Sofía, Madrid.',
    },
    {
      src: 'https://www.singulart.com/blog/wp-content/uploads/2023/10/Untitled-Film-Stills.jpg',
      title: 'Untitled Film Stills',
      description: 'Cindy Sherman, 1977-1980. MoMA, Nueva York.',
    },
    {
      src: 'https://images.euronews.com/articles/stories/07/18/81/96/1536x864_cmsv2_2d3120d5-0e42-506c-a194-6d986d6bc7be-7188196.jpg',
      title: 'Unsupervised Machine Hallucinations',
      description: 'Refik Anadol, 2022. MoMA, Nueva York.',
    },
  ];
  // ------------------------- CARDS -------------------------
  cards: Cards[] = [
    {
      imagenUrl: '',
      titulo: 'Arte Hasta el siglo XIX',
      descripcion: 'Descubre la riqueza del arte desde la antigüedad hasta el siglo XIX.',
      ruta: '/arte-hasta-s-xix',
    },
    {
      imagenUrl: '',
      titulo: 'Vanguardias',
      descripcion: 'Investiga las principales tendencias artísticas del siglo XX.',
      ruta: '/vanguardias',
    },
    {
      imagenUrl: '',
      titulo: 'Arte Contemporáneo',
      descripcion: 'Sumergete en la riqueza del arte contemporáneo.',
      ruta: '/arte-contemporaneo',
    },
  ];

  ngOnInit(): void {}
}
