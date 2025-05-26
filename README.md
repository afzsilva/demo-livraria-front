# 📚 Demo Livraria – Ambiente Dockerizado

Este projeto contém os serviços de uma aplicação completa para gerenciamento de uma livraria, com backend em Spring Boot, frontend em Angular e banco de dados MySQL, todos orquestrados via Docker Compose.

---

## 🧱 Estrutura dos serviços

- **Backend**: Spring Boot (porta `8080`)
- **Frontend**: Angular (porta `3000`)
- **Banco de dados**: MySQL 8 (porta `3306`)

---

## 🚀 Como executar o projeto

### 1. Pré-requisitos

- Docker instalado ([Guia oficial](https://docs.docker.com/get-docker/))
- Docker Compose instalado

### 2. Executar os containers

Na raiz do projeto, execute:

```bash
docker-compose up -d
```
Isso fará o download das imagens (caso não estejam localmente) e iniciará os três serviços: backend, frontend e banco de dados.

------

## 🌐 Acessos

| Serviço  | URL de acesso                                     |
| -------- | ------------------------------------------------- |
| Frontend | [http://localhost:3000](http://localhost:3000/)   |
| Backend  | [http://localhost:8080](http://localhost:8080/)   |
| MySQL    | `localhost:3306` (usuário: `root`, senha: `root`) |

---



# DemoLivrariaFront (Modo Dev)

Este projeto foi gerado utilizando o [Angular CLI](https://github.com/angular/angular-cli) na versão 19.0.2.

---



## Dependencias

Uma vez clonado o projeto, instale as dependências com o seguinte comando

```
npm install
```

------



## Servidor de desenvolvimento

Para iniciar um servidor local de desenvolvimento, execute:

```bash
ng serve
```

Após o servidor estar em execução, abra o navegador e acesse `http://localhost:4200/`. A aplicação será recarregada automaticamente sempre que você modificar qualquer um dos arquivos-fonte.

---

