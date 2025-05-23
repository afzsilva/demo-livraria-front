import { Autor } from "./autor";
import { Genero } from "./genero";

export interface Livro {
    id?: number; 
    titulo: string;
    autor: Autor;
    genero: Genero;
}
