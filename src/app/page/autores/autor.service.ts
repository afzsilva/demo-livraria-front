import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../../model/autor';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  
  private _URL = environment.urls.autores;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this._URL);
  }

  getById(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${this._URL}/${id}`);
  }

  create(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this._URL, autor);
  }

  update(id: number, autor: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this._URL}/${id}`, autor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this._URL}/${id}`);
  }
}
