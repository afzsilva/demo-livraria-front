import { Routes } from '@angular/router';
import { LivrosComponent } from './page/livros/livros.component';
import { AutoresComponent } from './page/autores/autores.component';
import { GenerosComponent } from './page/generos/generos.component';

export const routes: Routes = [
    {
        path: 'livros',
        component: LivrosComponent,
    },
    {
        path: 'autores',
        component: AutoresComponent,
    },
    {
        path: 'generos',
        component: GenerosComponent,
    }
];
