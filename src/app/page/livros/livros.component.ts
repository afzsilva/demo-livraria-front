import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Livro } from '../../model/livro';
import { Genero } from '../../model/genero';
import { Autor } from '../../model/autor';
import { AutorService } from '../autores/autor.service';
import { GeneroService } from '../generos/genero.service';
import { LivroService } from './livro.service';


@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css',
})
export class LivrosComponent implements OnInit {
  public livroList: Livro[] = [];
  public selectedLivro: Livro | null = null;
  public newLivro: Livro = this.initializeLivro();
  
  // Listas para os comboboxes
  public autoresList: Autor[] = [];
  public generosList: Genero[] = [];
  
  // IDs selecionados nos comboboxes
  public selectedAutorId: number | null = null;
  public selectedGeneroId: number | null = null;

  constructor(
    private livroService: LivroService,
    private autorService: AutorService,
    private generoService: GeneroService
  ) {}

  ngOnInit(): void {
    this.loadLivros();
    this.loadAutores();
    this.loadGeneros();
  }

  private initializeLivro(): Livro {
    return {
      titulo: '',
      autor: {
        id: 0,
        nome: ''
      },
      genero: {
        id: 0,
        nome: ''
      }
    };
  }

  loadAutores() {
    this.autorService.getAll().subscribe({
      next: (data) => {
        this.autoresList = data;
        console.log('Autores carregados:', this.autoresList);
      },
      error: (error) => {
        console.error('Erro ao carregar autores:', error);
      }
    });
  }

  loadGeneros() {
    this.generoService.getAll().subscribe({
      next: (data) => {
        this.generosList = data;
        console.log('Gêneros carregados:', this.generosList);
      },
      error: (error) => {
        console.error('Erro ao carregar gêneros:', error);
      }
    });
  }

  loadLivros() {
    this.livroService.getAll().subscribe({
      next: (data) => {
        this.livroList = data;
        console.log('Livros carregados:', this.livroList);
      },
      error: (error) => {
        console.error('Erro ao carregar livros:', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível carregar a lista de livros.',
          icon: 'error',
        });
      }
    });
  }

  deleteLivro() {
    if (!this.selectedLivro || !this.selectedLivro.id) {
      console.error('Nenhum livro selecionado para exclusão');
      return;
    }

    this.livroService.delete(this.selectedLivro.id).subscribe({
      next: () => {
        console.log('Livro deletado');
        this.loadLivros();
        Swal.fire({
          title: 'Livro Excluído!',
          text: `O livro '${this.selectedLivro?.titulo}' foi excluído com sucesso.`,
          icon: 'success',
        });
        this.selectedLivro = null;
      },
      error: (error) => {
        console.error('Erro ao deletar livro:', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível excluir o livro.',
          icon: 'error',
        });
      }
    });
  }

  setSelectedLivro(livro: Livro) {
    // Cria uma cópia profunda do objeto para evitar modificações acidentais
    this.selectedLivro = {
      ...livro,
      autor: { 
        id: livro.autor?.id || 0,
        nome: livro.autor?.nome || '',
        biografia: livro.autor?.biografia || ''
      },
      genero: { 
        id: livro.genero?.id || 0,
        nome: livro.genero?.nome || ''
      }
    };
    console.log('Livro selecionado:', this.selectedLivro);
  }

  saveLivro() {
    if (!this.selectedLivro || !this.selectedLivro.id) {
      console.error('Nenhum livro selecionado para atualização');
      return;
    }

    // Validação dos campos obrigatórios
    if (!this.isLivroValid(this.selectedLivro)) {
      Swal.fire({
        title: 'Erro!',
        text: 'Por favor, preencha todos os campos obrigatórios.',
        icon: 'error',
      });
      return;
    }

    this.livroService.update(this.selectedLivro.id, this.selectedLivro).subscribe({
      next: (data) => {
        console.log('Livro atualizado:', data);
        this.loadLivros();
        Swal.fire({
          title: 'Livro Atualizado!',
          text: `O livro '${this.selectedLivro?.titulo}' foi atualizado com sucesso.`,
          icon: 'success',
        });
        this.selectedLivro = null;
      },
      error: (error) => {
        console.error('Erro ao atualizar livro:', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível atualizar o livro.',
          icon: 'error',
        });
      }
    });
  }

  addNewLivro() {
    this.newLivro = this.initializeLivro();
    this.selectedAutorId = null;
    this.selectedGeneroId = null;
  }

  saveNewLivro() {
    // Validação dos campos obrigatórios
    if (!this.isNewLivroValid()) {
      console.log('Campos obrigatórios vazios:', this.newLivro);
      Swal.fire({
        title: 'Erro!',
        text: 'Por favor, preencha todos os campos obrigatórios.',
        icon: 'error',
      });
      return;
    }

    // Buscar autor e gênero selecionados e criar o objeto para envio
    const autorSelecionado = this.autoresList.find(a => a.id === Number(this.selectedAutorId));
    const generoSelecionado = this.generosList.find(g => g.id === Number(this.selectedGeneroId));

    if (!autorSelecionado || !generoSelecionado) {
      Swal.fire({
        title: 'Erro!',
        text: 'Por favor, selecione um autor e um gênero válidos.',
        icon: 'error',
      });
      return;
    }

    // Criar objeto no formato esperado pela API
    const livroParaEnvio: Livro = {
      titulo: this.newLivro.titulo,
      autor: {
        id: autorSelecionado.id,
        nome: autorSelecionado.nome
      },
      genero: {
        id: generoSelecionado.id,
        nome: generoSelecionado.nome
      }
    };

    console.log('Criando novo livro:', livroParaEnvio);

    this.livroService.create(livroParaEnvio).subscribe({
      next: (data) => {
        console.log('Novo livro criado:', data);
        this.loadLivros();
        Swal.fire({
          title: 'Novo Livro Adicionado!',
          text: `O livro '${livroParaEnvio.titulo}' foi adicionado com sucesso.`,
          icon: 'success',
        });
        this.newLivro = this.initializeLivro();
        this.selectedAutorId = null;
        this.selectedGeneroId = null;
      },
      error: (error) => {
        console.error('Erro ao criar livro:', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível adicionar o livro.',
          icon: 'error',
        });
      }
    });
  }

  private isNewLivroValid(): boolean {
    return !!(
      this.newLivro.titulo?.trim() &&
      this.selectedAutorId &&
      this.selectedGeneroId
    );
  }

  private isLivroValid(livro: Livro): boolean {
    return !!(
      livro.titulo?.trim() &&
      livro.autor?.nome?.trim() &&
      livro.genero?.nome?.trim()
    );
  }
}