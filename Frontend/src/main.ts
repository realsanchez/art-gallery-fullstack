import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; //Bootstrap para interacciones y componentes dinamicos (carrouseles, dropdowns, modals, etc)

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
