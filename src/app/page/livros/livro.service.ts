import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../../model/livro';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private _URL = environment.urls.livros;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this._URL);
  }

  getById(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this._URL}/${id}`);
  }

  create(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this._URL, livro);
  }

  update(id: number, livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this._URL}/${id}`, livro);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this._URL}/${id}`);
  }

  findByAutor(autorId: number): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this._URL}/autor/${autorId}`);
  }

  findByGenero(generoId: number): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this._URL}/genero/${generoId}`);
  }
  
}
