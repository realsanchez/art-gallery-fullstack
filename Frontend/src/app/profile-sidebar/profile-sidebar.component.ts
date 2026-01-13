import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; //que no me olvide utilizar commonModule, que es el que permite usar *ngIf, *ngFor, etc.
import { AuthService } from '../../../services/connect.services/auth.service';

@Component({
  selector: 'app-profile-sidebar',
  imports: [CommonModule],
  standalone: true, //componente autónomo que no se necesita declarar dentro de la propiedad declarations de ningún modulo de angular. Se puede importar donde sea necesario.
  templateUrl: './profile-sidebar.component.html',
  styleUrl: './profile-sidebar.component.css',
})
export class ProfileSidebarComponent implements OnInit {
  isExpanded: boolean = false; //variable que controla si el sidebar está expandido o no
  user: any; //variable que almacena el usuario actual
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    console.log('ProfileSidebar initialized');
    this.authService.currentUser.subscribe((user) => {
      console.log('ProfileSidebar received user update:', user);
      this.user = user;
    });
  }
}
