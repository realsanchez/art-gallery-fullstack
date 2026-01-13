import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConnectService } from '../../../services/connect.services/connect.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/connect.services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterOutlet],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

//Incia el componente de inicio de sesión
//Recibe el username y password del usuario y lo envía al backend para iniciar sesión
//Si el usuario es correcto, se redirige a la página de inicio
//Si el usuario no es correcto, se muestra un mensaje de error
export class LoginComponent {
  constructor(
    private connectService: ConnectService,
    private router: Router,
    private authService: AuthService
  ) {}
  username = signal('');
  password = signal('');
  loginError = signal(false); // para que pueda aparecer un mensaje de error
  usernameChange($event: any) {
    this.username.set($event);
  }
  passwordChange($event: any) {
    this.password.set($event);
  }
  async onSubmit() {
    this.loginError.set(false); //rastrea si hay un error antes de intentar el login
    const login = {
      //se crea un objeto con el username y password del usuario
      username: this.username(),
      password: this.password(),
    };
    try {
      const response = await this.connectService.getPostDirect(login); //se llama al servicio para iniciar sesión
      if (response) {
        const userData = {
          name: this.username(),
          username: this.username(),
          image:
            response.profilePicture ||
            'https://cdn.pixabay.com/photo/2016/03/28/10/05/kitten-1285341_640.jpg',
        };
        this.authService.login(userData);
        this.router.navigate(['/']); //si  la contraseña está bien se redirige a la página de inicio
      } else {
        this.loginError.set(true); //si la contraseña no está bien se muestra un mensaje de error
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // this.loginError.set(true); //se muestra un mensaje de error

      // --------------------------------------------------------------------------------
      // MOCK LOGIN IMPLEMENTATION (PARA PRUEBAS SIN EL BACKEND)
      // --------------------------------------------------------------------------------
      // Si el backend está caído, se simula un inicio de sesión exitoso para que se pueda ver el sidebar.
      console.warn('Backend not running? Activating MOCK LOGIN for testing.');

      const mockUser = {
        name: this.username() || 'Test User',
        username: this.username() || 'testuser',
        image: 'https://cdn.pixabay.com/photo/2016/03/28/10/05/kitten-1285341_640.jpg',
      };

      this.authService.login(mockUser);
      this.router.navigate(['/']);
      // --------------------------------------------------------------------------------
    }
  }
}
