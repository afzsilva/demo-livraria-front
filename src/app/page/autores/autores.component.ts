import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutorService } from './autor.service';
import { Autor } from '../../model/autor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autores',  
  imports: [FormsModule, CommonModule],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css',
})
export class AutoresComponent implements OnInit {
  public autorList: Autor[] = [];
  public selectedAutor: Autor = { nome: '' };
  public newAutor: Autor = { nome: '' };

  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    this.loadAutores();
  }

  loadAutores(): void {
    this.autorService.getAll().subscribe({
      next: (data:any) => {
        this.autorList = data;
        console.log('Autores carregados:', this.autorList);
      },
      error: (error: any) => {
        console.error('Erro ao carregar autores:', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível carregar a lista de autores.',
          icon: 'error',
        });
      }
    });
  }

  deleteAutor(): void {
    if (this.selectedAutor?.id) {
      this.autorService.delete(this.selectedAutor.id).subscribe({
        next: () => {
          console.log('Autor excluído com sucesso');
          this.loadAutores();
          Swal.fire({
            title: 'Autor Excluído!',
            text: `O autor '${this.selectedAutor.nome}' foi excluído com sucesso.`,
            icon: 'success',
          });
          this.selectedAutor = { nome: '' };
        },
        error: (error: any) => {
          console.error('Erro ao excluir autor:', error);
          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível excluir o autor.',
            icon: 'error',
          });
        }
      });
    }
  }

  setSelectedAutor(autor: Autor): void {
    this.selectedAutor = { ...autor }; // Cria uma cópia para evitar alterações diretas
    console.log('Autor selecionado:', autor.id);
  }

  saveAutor(): void {
    if (this.selectedAutor?.id && this.selectedAutor.nome.trim()) {
      this.autorService.update(this.selectedAutor.id, this.selectedAutor).subscribe({
        next: (data:any) => {
          console.log('Autor atualizado com sucesso:', data);
          this.loadAutores();
          Swal.fire({
            title: 'Autor Atualizado!',
            text: `O autor '${this.selectedAutor.nome}' foi atualizado com sucesso.`,
            icon: 'success',
          });
          this.selectedAutor = { nome: '' };
        },
        error: (error: any) => {
          console.error('Erro ao atualizar autor:', error);
          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível atualizar o autor.',
            icon: 'error',
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Erro!',
        text: 'Nome do autor é obrigatório.',
        icon: 'error',
      });
    }
  }

  addNewAutor(): void {
    this.newAutor = { nome: '' };
  }

  saveNewAutor(): void {
    if (!this.newAutor.nome || this.newAutor.nome.trim() === '') {
      console.log('Nome do autor é obrigatório:', this.newAutor);
      Swal.fire({
        title: 'Erro!',
        text: 'Por favor, preencha o nome do autor.',
        icon: 'error',
      });
      return;
    }

    console.log('Adicionando novo autor:', this.newAutor);

    this.autorService.create(this.newAutor).subscribe({
      next: (data: any) => {
        this.loadAutores();
        Swal.fire({
          title: 'Novo Autor Adicionado!',
          text: `O autor '${this.newAutor.nome}' foi adicionado com sucesso.`,
          icon: 'success',
        });
        this.newAutor = { nome: '' };
        // Fechar o modal programaticamente
        document.querySelector('[data-bs-dismiss="modal"]')?.dispatchEvent(new Event('click'));
      },
      error: (error: any) => {
        console.error('Erro ao adicionar autor:', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível adicionar o autor.',
          icon: 'error',
        });
      }
    });
  }
}