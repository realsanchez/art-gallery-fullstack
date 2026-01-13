import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectService } from '../../../services/connect.services/connect.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})

//Inicia el componente de registro
//Recibe el nombre, username, email y password del usuario y lo envía al backend para registrar al usuario
//Si el usuario es correcto,
//Si el usuario no es correcto, se muestra un mensaje de error
export class RegisterComponent {
  constructor(private connectService: ConnectService, private router: Router) {}

  name = signal('');
  username = signal('');
  email = signal('');
  password = signal('');

  nameChange($event: any) {
    this.name.set($event);
  }

  usernameChange($event: any) {
    this.username.set($event);
  }

  emailChange($event: any) {
    this.email.set($event);
  }

  passwordChange($event: any) {
    this.password.set($event);
  }

  async onSubmit() {
    const user = {
      //aquí se crea un objeto con los datos del usuario
      name: this.name(),
      username: this.username(),
      email: this.email(),
      password: this.password(),
    };
    console.log('Register submitted', user);
    await this.connectService.register(user);
    this.router.navigate(['/login']);
  }
}
