import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConnectService } from '../../../services/connect.services/connect.service';

@Component({
  selector: 'app-retrieve-password',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './retrieve-password.component.html',
  styleUrl: './retrieve-password.component.css',
})

//Es el primer componente que inicia el proceso de recuperar contraseña.
//Recibe el email del usuario y lo envía al backend para que compare el email con el de la base de datos y redirige a la página de meter el código
//Si el email es correcto, se envía un codigo de verificación al correo del usuario.
//Si el email no es correcto, se muestra un mensaje de error.
export class RetrievePasswordComponent {
  constructor(private connectService: ConnectService, private router: Router) {}

  email = signal(''); //signal guarda el email que el usuario introduce

  emailChange($event: any) {
    //es necesario para que el email se actualice cuando el usuario escribe en el input
    this.email.set($event);
  }
  //es el onSubmit del botón "recuperar contraseña"
  async onSubmit() {
    const verifyEmail = {
      email: this.email(),
    }; //crea un objeto temporal para enviar el email al backend y verificarlo
    const response = await this.connectService.getEmail(verifyEmail); //solo para verificar email
    const emailToPass = response.email || this.email(); //envía el email que el usuario introdujo
    this.router.navigate(['/code'], {
      //indica a Angular que redirija a la página donde se ingresa el código
      state: {
        //state es como una nota adhesiva en la que pone la información "email: emailToPass"
        email: emailToPass,
      }, // navega a la página /code y le entrego el valor de email.
    });
    console.log(response);
  }
}
