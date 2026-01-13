import { Component, signal, OnInit, computed } from '@angular/core';
import { ConnectService } from '../../../services/connect.services/connect.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resset-password',
  imports: [FormsModule, RouterOutlet, CommonModule],
  templateUrl: './resset-password.component.html',
  styleUrl: './resset-password.component.css',
})

//------------ Recibe el email desde el componente CodeComponent--------------------------
export class RessetPasswordComponent implements OnInit {
  constructor(private connectService: ConnectService, private router: Router) {} //inyección de dependencias. Da un servicio para conectarse a internet y para navegar entre las páginas o componentes.
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  nonEqualPassword = computed(() => {
    if (this.password() && this.confirmPassword()) {
      return this.password() !== this.confirmPassword();
    }
    return false;
  });

  ngOnInit(): void {
    const state = history.state;
    console.log(state);
    if (state && state['email']) {
      this.email.set(state['email']);
    } else {
      console.log('No se recibio email en el estado de la navegación o la pagina fue recargada');
    }
  }

  passwordChange($event: any) {
    this.password.set($event);
  }
  confirmPasswordChange($event: any) {
    this.confirmPassword.set($event);
  }

  async onSubmit() {
    if (this.nonEqualPassword()) {
      console.log('Las contraseñas no coinciden. No se enviará el formulario.');
      return;
    }
    const resetPassword = {
      email: this.email(),
      password: this.password(),
    };

    try {
      const response = await this.connectService.resetPassword(resetPassword);
      if (response) {
        this.router.navigate(['/confirmed-new-password']);
      } else {
        console.log('Error al resetear la contraseña (respuesta nula)');
      }
    } catch (error) {
      console.error('Error al resetear la contraseña:', error);
    }
  }
}
