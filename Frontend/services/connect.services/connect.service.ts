import { Injectable, signal } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import bcrypt from 'bcryptjs'; //sirve para realizar la comparación de contraseñas.
const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/auth',
});
instance.interceptors.request.use(
  //añade el token de autenticación a cada petición
  (config: any) => {
    const token = localStorage.getItem('token'); //obtiene el token guardado en localStorage
    console.log('interceptor');

    if (token) {
      // si existe el token, lo añade al encabezado 'Authorization'
      console.log('Using token for request:', token.substring(0, 10) + '...');
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No token found in localStorage!');
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

@Injectable({
  providedIn: 'root',
})
export class ConnectService {
  saludo = signal('Hello world');
  private saveToken(token: string): void {
    if (token) {
      localStorage.setItem('token', token);
      console.log('Token saved');
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  } // comprueba si existe un token en localStorage y si no existe hará que el boton de la añadir entrada al blog desaparezca

  //---------------------------- Login ------------------------------------------
  async getPostDirect(login: any): Promise<any> {
    //función que recibe el username y password del usuario y lo envía al backend para iniciar sesión
    try {
      const response: AxiosResponse = await instance.post('login', login); //envía el username y password al backend
      console.log('Axios direct response received');
      const token = response.data.token; //obtiene el token del backend
      if (token) {
        this.saveToken(token); //guarda el token en localStorage
      }
      const match = await bcrypt.compare(login.password, response.data.password); //recibe la contraseña del usuario y la compara con la contraseña del backend
      if (match) {
        console.log('Password match');
        return response.data;
      } else {
        console.log('Password does not match');
        return undefined;
      }
    } catch (error) {
      console.error('Error obtaining data:', error);
      return undefined;
    }
  }
  //---------------------------- Registro ------------------------------------------
  async register(user: any): Promise<any> {
    //función que recibe el nombre, username, email y password del usuario y lo envía al backend para registrar al usuario
    try {
      console.log('Register request sent');
      const response: AxiosResponse = await instance.post('register', user);
      console.log('Register response received');
      const token = response.data.token;
      if (token) {
        this.saveToken(token);
      }
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      return undefined;
    }
  }

  //---------------------------- Recuperar Contraseña por Email ------------------------------------------
  async getEmail(verifyEmail: any): Promise<any> {
    //esta función será la que obtenga el email del usuario desde el backend y compruebe si ya existe.
    // En el caso de que exista envía un código de 6 dígitos. (Es para recuperar la contraseña)
    try {
      console.log('Email received:', verifyEmail);
      const response: AxiosResponse = await instance.post('get-email', verifyEmail);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error getting email:', error);
      return undefined;
    }
  }
  //---------------------------- Envío de código ------------------------------------------
  async getCode(checkCode: any): Promise<any> {
    //Esta función recibe el email para que lo compare con el código asignado
    try {
      const response: AxiosResponse = await instance.post('code-check', checkCode);
      return response.data;
    } catch (error: any) {
      console.error('Error getting code:', error);
      return undefined;
    }
  }
  //---------------------------- Resetear Contraseña ------------------------------------------
  async resetPassword(resetPassword: any): Promise<any> {
    //función que recibe el email y la contraseña nueva y la envía al backend para resetear la contraseña
    try {
      const response: AxiosResponse = await instance.post('reset-password', resetPassword); //envía el email y la contraseña nueva al backend
      console.log('Reset password response received');
      const token = response.data.token; //obtiene el token del backend
      if (token) {
        this.saveToken(token); //guarda el token en localStorage
      }
      return response.data;
    } catch (error) {
      console.error('Error resetting password:', error);
      return undefined;
    }
  }

  //------------ LO DEL BLOG (NO QUIERO CREAR OTRA DEPENDENCIA, ME DA PEREZA LOSIENTO) --------------------------
  //---------------------------- Ver los blogs ya creados ------------------------------------------
  async getBlogs(): Promise<any> {
    try {
      const response: AxiosResponse = await instance.get('blog'); //envía la petición al backend
      return response.data;
    } catch (error) {
      console.error('Error getting blogs:', error);
      return undefined;
    }
  }

  //---------------------------- Ver en detalle una entrada en el Blog ------------------------------------------

  async getBlogDetail(id: string): Promise<any> {
    try {
      const response: AxiosResponse = await instance.get(`blog/${id}`); // identifica la entrada a la que queremos acceder en detalle por su id
      return response.data;
    } catch (error) {
      console.error('Error getting blog detail:', error);
      return undefined;
    }
  }
  //---------------------------- Crear Entrada en el Blog ------------------------------------------
  async newBlogEntry(blog: any): Promise<any> {
    try {
      console.log('processing new entry');
      const response: AxiosResponse = await instance.post('blog', blog); // envía la información que se recibe al backend para que se guarde en la base de datos
      console.log('new entry response received');
      return response.data;
    } catch (error) {
      console.error('Error creating new entry:', error);
      return undefined;
    }
  }
}
