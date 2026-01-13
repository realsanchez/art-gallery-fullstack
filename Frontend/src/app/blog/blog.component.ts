import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from '../info-card/info-card.component';
import { Router } from '@angular/router';
import { ConnectService } from '../../../services/connect.services/connect.service';
import { AuthService } from '../../../services/connect.services/auth.service';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, InfoCardComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  blogs: any[] = []; // Array para almacenar los blogs obtenidos del backend

  constructor(
    private router: Router,
    public connectService: ConnectService, //permite que se vean las entradas del blog a todo el mundo incluso si no estás logueado
    public authService: AuthService, //permite que el boton de añadir una entrada al blog solo aparezca si el usuario está logueado
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    // Se llama al servicio para obtener los blogs cuando se inicializa el componente
    const response = await this.connectService.getBlogs();
    if (response) {
      this.blogs = response.sort((a: any, b: any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Ordena los blogs por fecha de creación, siendo el más reciente el primero
      });
      // Forzamos la detección de cambios para asegurar que la vista se actualice con los datos asíncronos
      this.cdr.detectChanges();
    } else {
      this.blogs = [];
    }
  }

  newBlogEntry() {
    // Navega a la página para crear una nueva entrada de blog
    this.router.navigate(['/new-blog-entry']);
  }
}
