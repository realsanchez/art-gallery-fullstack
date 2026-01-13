import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectService } from '../../../services/connect.services/connect.service';
import { RouterOutlet, Router } from '@angular/router';
@Component({
  selector: 'app-code',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css',
})

//requiere el código enviado y el email del usuario para compararlo con el código asignado
export class CodeComponent implements OnInit {
  //OnInit es un lifecycle hook que se ejecuta cuando el componente de la página /code se carga y está listo
  constructor(private connectService: ConnectService, private router: Router) {}
  code = signal('');
  email = signal('');
  ngOnInit() {
    const state = history.state; //obtiene la "nota adhesiva" que se adjuntó a la navegación que contiene {email: emailToPass}

    if (state && state['email']) {
      this.email.set(state['email']); //si existe el email en la "nota adhesiva", lo asigna a la variable email
      console.log('Email recibido en CodeComponent: ', this.email());
    } else {
      console.log('No se recibio email en el estado de la navegación o la pagina fue recargada');
    }
  }
  codeChange($event: any) {
    this.code.set($event);
  }
  async onSubmit() {
    const verifyEmailAndCode = {
      checkCode: this.code(),
      email: this.email(),
    };
    console.log('El código es: ', verifyEmailAndCode);
    console.log('El email es: ', this.email());
    const response = await this.connectService.getEmail(verifyEmailAndCode);
    const emailToPass = response.email || this.email();
    this.router.navigate(['/reset-password'], {
      state: {
        email: emailToPass,
      },
    });
  }
}
