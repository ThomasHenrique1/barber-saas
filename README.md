<div align="center">

<img src="./public/Logo.png" alt="BarberHub Logo" width="120" />

# BarberHub

### Plataforma completa para gestão de barbearias

Organize clientes, barbeiros, serviços, agendamentos e pagamentos em uma única plataforma.

</div>

<br />

## Sobre o projeto

O **BarberHub** é uma aplicação web Full Stack desenvolvida para centralizar e simplificar a gestão de barbearias.

A plataforma possui áreas separadas para administração e clientes, permitindo o gerenciamento de profissionais, serviços, agendamentos, pagamentos e informações dos usuários.

O projeto foi desenvolvido com foco em arquitetura de aplicações web, autenticação, gerenciamento de dados e organização de regras de negócio.

---

## Principais funcionalidades

### Administração

* Dashboard com indicadores da operação
* Gestão de barbeiros
* Gestão de serviços
* Gestão de agendamentos
* Controle de pagamentos
* Estatísticas administrativas
* Gerenciamento de perfil
* Registro de auditoria

### Cliente

* Visualização dos serviços disponíveis
* Escolha de profissional
* Seleção de data e horário
* Criação de agendamentos
* Visualização do próximo agendamento
* Histórico de atendimentos
* Cancelamento e reagendamento
* Gerenciamento do perfil

### Autenticação e segurança

* Cadastro e login
* Logout
* Senhas protegidas com hash
* Recuperação e redefinição de senha
* Autenticação baseada em JWT
* Proteção de rotas e endpoints privados

---

## Tecnologias

### Core

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react\&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql\&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker\&logoColor=white)

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Radix UI
* Framer Motion
* Lucide React

### Backend e dados

* Next.js Route Handlers
* Server Actions
* PostgreSQL
* `pg`
* TanStack React Query

### Autenticação e validação

* JSON Web Token
* bcryptjs
* React Hook Form
* Zod

---

## Arquitetura

O BarberHub utiliza o **App Router do Next.js** e separa as responsabilidades entre interface, Server Actions, Route Handlers e camada de acesso aos dados.

```text
                        ┌──────────────────┐
                        │    Interface     │
                        │ React / Next.js  │
                        └────────┬─────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 │                               │
        ┌────────▼────────┐             ┌────────▼────────┐
        │ Server Actions  │             │ Route Handlers  │
        │  src/actions    │             │    app/api      │
        └────────┬────────┘             └────────┬────────┘
                 │                               │
                 └───────────────┬───────────────┘
                                 │
                        ┌────────▼────────┐
                        │       lib       │
                        │ Regras e acesso │
                        │   aos dados     │
                        └────────┬────────┘
                                 │
                        ┌────────▼────────┐
                        │   PostgreSQL    │
                        │ Docker / Local  │
                        └─────────────────┘
```

Mais detalhes sobre a arquitetura e organização do projeto estão disponíveis em:

* [Documentação da arquitetura](./docs/architecture.md)
* [Documentação da API](./docs/api.md)

---

## Fluxo de agendamento

O processo de agendamento é organizado em etapas:

```text
Escolha do serviço
        │
        ▼
Escolha do profissional
        │
        ▼
Escolha da data
        │
        ▼
Escolha do horário
        │
        ▼
Confirmação
        │
        ▼
Agendamento criado
```

Após a criação do agendamento, o cliente pode acompanhar o próximo atendimento e consultar o histórico através da área da conta.

---

## Pré-requisitos

Antes de executar o projeto, tenha instalado:

* Node.js
* npm
* Docker e Docker Compose

Também é possível utilizar uma instalação local do PostgreSQL.

---

## Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Acesse a pasta:

```bash
cd barber-saas
```

Instale as dependências:

```bash
npm install
```

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=
BETTER_AUTH_SECRET=
JWT_SECRET=
```

Exemplo:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/barber_saas"
BETTER_AUTH_SECRET="substitua-por-uma-chave-secreta"
JWT_SECRET="substitua-por-uma-chave-jwt-segura"
```

> Nunca envie o arquivo `.env` para o repositório.

Também é recomendado criar um `.env.example`:

```env
DATABASE_URL=
BETTER_AUTH_SECRET=
JWT_SECRET=
```

---

## Banco de dados com Docker

Inicie o PostgreSQL:

```bash
docker compose up -d
```

O banco será iniciado utilizando:

```text
Imagem: postgres:16
Container: barber_db
Porta: 5432
Database: barber_saas
Usuário: postgres
```

Para verificar os containers:

```bash
docker ps
```

Para interromper:

```bash
docker compose down
```

---

## Executando o projeto

Após configurar o banco e as variáveis de ambiente:

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:3000
```

---

## Scripts

```bash
npm run dev
```

Inicia o ambiente de desenvolvimento.

```bash
npm run build
```

Gera o build de produção.

```bash
npm run start
```

Executa a aplicação em produção após o build.

```bash
npm run lint
```

Executa a análise estática com ESLint.

---

## Status do projeto

O BarberHub está em desenvolvimento ativo.

### Implementado

* [x] Landing Page
* [x] Cadastro e autenticação
* [x] Recuperação de senha
* [x] Área administrativa
* [x] Área do cliente
* [x] Gestão de serviços
* [x] Gestão de barbeiros
* [x] Gestão de agendamentos
* [x] Reagendamento e cancelamento
* [x] Histórico de agendamentos
* [x] Controle de pagamentos
* [x] Dashboard administrativo
* [x] Auditoria
* [x] PostgreSQL com Docker
* [x] Proteção de rotas e endpoints

---

## Melhorias futuras

* [ ] Sistema de notificações
* [ ] Notificações por e-mail
* [ ] Confirmação automática de agendamentos
* [ ] Integração com gateway de pagamento
* [ ] Relatórios avançados
* [ ] Exportação de dados
* [ ] Testes automatizados
* [ ] Deploy em produção
* [ ] Pipeline de CI/CD

---

## Desenvolvido por

**Thomas Henrique**

Projeto desenvolvido para portfólio com foco em demonstrar conhecimentos em desenvolvimento Full Stack, arquitetura de aplicações web, autenticação, APIs, banco de dados e regras de negócio.

<br />

<div align="center">

**BarberHub — Gestão simples. Operação organizada.**

</div>
