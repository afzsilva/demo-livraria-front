import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from '../../model/genero';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private _URL = environment.urls.generos;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Genero[]> {
    return this.http.get<Genero[]>(this._URL);
  }

  getById(id: number): Observable<Genero> {
    return this.http.get<Genero>(`${this._URL}/${id}`);
  }

  create(genero: Genero): Observable<Genero> {
    return this.http.post<Genero>(this._URL, genero);
  }

  update(id: number, genero: Genero): Observable<Genero> {
    return this.http.put<Genero>(`${this._URL}/${id}`, genero);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this._URL}/${id}`);
  }
}
