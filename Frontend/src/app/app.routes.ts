import { CartComponent } from './cart/cart';
import { StoreDetailComponent } from './store-detail/store-detail';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RetrievePasswordComponent } from './retrieve-password/retrieve-password.component';
import { CodeComponent } from './code/code.component';
import { RessetPasswordComponent } from './resset-password/resset-password.component';
import { ConfirmedNewPasswordComponent } from './confirmed-new-password/confirmed-new-password.component';
import { BlogComponent } from './blog/blog.component';
import { StoreComponent } from './store/store.component';
import { ArteHastaSXIXComponent } from './arte-hasta-s-xix/arte-hasta-s-xix.component';
import { ArteContemporaneoComponent } from './arte-contemporaneo/arte-contemporaneo.component';
import { VanguardiasComponent } from './vanguardias/vanguardias.component';
import { NewBlogEntryComponent } from './new-blog-entry/new-blog-entry.component';
import { BlogContentComponent } from './blog-content/blog-content.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full', // Indica a Angular que esta ruta debe coincidir con la URL raíz
  },
 
  // ------------------------ Rutas de lo que ofrece la web ------------------------
  
  { path: 'cart', component: CartComponent },

  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'store',
    component: StoreComponent,
  },
  {path: 'store/:id', component: StoreDetailComponent},  // ------------------------ Rutas de Arte ------------------------
  {
    path: 'arte-hasta-s-xix',
    component: ArteHastaSXIXComponent,
  },
  {
    path: 'vanguardias',
    component: VanguardiasComponent,
  },
  {
    path: 'arte-contemporaneo',
    component: ArteContemporaneoComponent,
  },

  // ------------------------ Rutas del blog ------------------------
  {
    path: '',
    component: BlogComponent,
  },
  {
    path: 'blog/:id',
    component: BlogContentComponent,
  },
  {
    path: 'new-blog-entry',
    component: NewBlogEntryComponent,
  },
  // ------------------------ Rutas de autenticación ------------------------
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'retrievePassword',
    component: RetrievePasswordComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'code',
    component: CodeComponent,
  },
  {
    path: 'reset-password',
    component: RessetPasswordComponent,
  },
  {
    path: 'confirmed-new-password',
    component: ConfirmedNewPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
