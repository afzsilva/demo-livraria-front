import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { GeneroService} from './genero.service'; // Ajuste o caminho conforme necessário
import { Genero } from '../../model/genero';

@Component({
  selector: 'app-generos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './generos.component.html',
  styleUrl: './generos.component.css',
})
export class GenerosComponent implements OnInit {
  public generoList: Genero[] = [];
  public selectedGenero: Genero = { nome: '' };
  public newGenero: Genero = { nome: '' };

  constructor(private generoService: GeneroService) {}

  ngOnInit(): void {
    this.loadGeneros();
  }

  loadGeneros(): void {
    this.generoService.getAll().subscribe({
      next: (data: Genero[]) => {
        this.generoList = data;
        console.log('Gêneros carregados:', this.generoList);
      },
      error: (error) => {
        console.error('Erro ao carregar gêneros:', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível carregar a lista de gêneros.',
          icon: 'error',
        });
      }
    });
  }

  deleteGenero(): void {
    if (!this.selectedGenero?.id) {
      Swal.fire({
        title: 'Erro!',
        text: 'Nenhum gênero selecionado para exclusão.',
        icon: 'error',
      });
      return;
    }

    this.generoService.delete(this.selectedGenero.id).subscribe({
      next: () => {
        console.log('Gênero excluído com sucesso');
        this.loadGeneros();
        Swal.fire({
          title: 'Gênero Excluído!',
          text: `O gênero '${this.selectedGenero.nome}' foi excluído com sucesso.`,
          icon: 'success',
        });
        this.selectedGenero = { nome: '' };
      },
      error: (error) => {
        console.error('Erro ao excluir gênero:', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível excluir o gênero.',
          icon: 'error',
        });
      }
    });
  }

  setSelectedGenero(genero: Genero): void {
    // Criar uma cópia para evitar modificações diretas no objeto original
    this.selectedGenero = { ...genero };
    console.log('Gênero selecionado:', genero.id);
  }

  updateGenero(): void {
    if (!this.selectedGenero?.id) {
      Swal.fire({
        title: 'Erro!',
        text: 'Nenhum gênero selecionado para atualização.',
        icon: 'error',
      });
      return;
    }

    if (!this.selectedGenero.nome?.trim()) {
      Swal.fire({
        title: 'Erro!',
        text: 'O nome do gênero é obrigatório.',
        icon: 'error',
      });
      return;
    }

    this.generoService.update(this.selectedGenero.id, this.selectedGenero).subscribe({
      next: (updatedGenero: Genero) => {
        console.log('Gênero atualizado:', updatedGenero);
        this.loadGeneros();
        Swal.fire({
          title: 'Gênero Atualizado!',
          text: `O gênero '${this.selectedGenero.nome}' foi atualizado com sucesso.`,
          icon: 'success',
        });
        this.selectedGenero = { nome: '' };
      },
      error: (error) => {
        console.error('Erro ao atualizar gênero:', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível atualizar o gênero.',
          icon: 'error',
        });
      }
    });
  }

  addNewGenero(): void {
    this.newGenero = { nome: '' };
  }

  saveNewGenero(): void {
    if (!this.newGenero.nome?.trim()) {
      console.log('Campo nome é obrigatório:', this.newGenero);
      Swal.fire({
        title: 'Erro!',
        text: 'O nome do gênero é obrigatório.',
        icon: 'error',
      });
      return;
    }

    console.log('Criando novo gênero:', this.newGenero);

    this.generoService.create(this.newGenero).subscribe({
      next: (createdGenero: Genero) => {
        console.log('Gênero criado:', createdGenero);
        this.loadGeneros();
        Swal.fire({
          title: 'Novo Gênero Adicionado!',
          text: `O gênero '${this.newGenero.nome}' foi adicionado com sucesso.`,
          icon: 'success',
        });
        this.newGenero = { nome: '' };
        
        // Fechar o modal programaticamente
        const modal = document.getElementById('addGeneroModal');
        if (modal) {
          const bootstrapModal = (window as any).bootstrap?.Modal?.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
        }
      },
      error: (error) => {
        console.error('Erro ao criar gênero:', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível adicionar o gênero.',
          icon: 'error',
        });
      }
    });
  }
}