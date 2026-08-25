# Arquitetura do BarberHub

## Visão geral

O BarberHub utiliza o App Router do Next.js e organiza a aplicação separando interface, componentes reutilizáveis, Server Actions, Route Handlers e camada de acesso aos dados.

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
                        └─────────────────┘
```

---

# Estrutura do projeto

```text
barber-saas/
│
├── app/
│   ├── account/                 # Área do cliente
│   ├── api/                     # Route Handlers
│   ├── dashboard/               # Área administrativa
│   ├── login/
│   ├── register/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Landing Page
│
├── components/
│   ├── account/
│   ├── appointments/
│   ├── auth/
│   ├── barbers/
│   ├── dashboard/
│   ├── home/
│   ├── layout/
│   ├── profile/
│   ├── services/
│   └── ui/
│
├── lib/
│   ├── audit.ts
│   ├── auth.ts
│   ├── db.ts
│   ├── jwt.ts
│   ├── services.ts
│   ├── users.ts
│   └── utils.ts
│
├── src/
│   └── actions/
│       ├── account/
│       ├── appointments/
│       ├── barbers/
│       ├── clients/
│       ├── dashboard/
│       └── services/
│
├── public/
├── docker-compose.yml
├── proxy.ts
└── package.json
```

---

# Camadas da aplicação

## app

A pasta `app` concentra as páginas da aplicação e os Route Handlers.

### account

Responsável pela área do cliente.

Principais recursos:

* Serviços disponíveis
* Novo agendamento
* Histórico
* Perfil
* Próximo agendamento

### dashboard

Responsável pela área administrativa.

Principais recursos:

* Dashboard
* Agendamentos
* Barbeiros
* Serviços
* Pagamentos
* Perfil

### api

Contém os Route Handlers organizados por domínio.

---

# components

Os componentes são organizados de acordo com o domínio da aplicação.

```text
components/
├── account/
├── appointments/
├── auth/
├── barbers/
├── dashboard/
├── home/
├── layout/
├── profile/
├── services/
└── ui/
```

A pasta `ui` contém componentes reutilizáveis da interface.

Os demais diretórios contêm componentes específicos de cada domínio.

---

# Server Actions

As Server Actions estão organizadas em:

```text
src/actions/
```

## Account

```text
create-appointment
get-client-appointments
get-history
get-next-appointment
get-profile
```

## Appointments

```text
cancel-appointment
reschedule-appointment
```

## Barbers

```text
createBarber
deleteBarber
get-barbers
toggleBarber
updateBarber
```

## Clients

```text
createClient
deleteClient
get-clients
toggleClient
updateClient
```

## Dashboard

```text
get-admin-stats
get-dashboard-appointments
get-payment-stats
get-today-appointments
mark-appointment-paid
```

## Services

```text
createService
deleteService
get-services
toggleService
updateService
```

---

# Camada lib

A pasta `lib` concentra funcionalidades reutilizáveis e acesso aos dados.

| Arquivo       | Responsabilidade                            |
| ------------- | ------------------------------------------- |
| `db.ts`       | Conexão com PostgreSQL                      |
| `jwt.ts`      | Criação e validação de tokens JWT           |
| `auth.ts`     | Funcionalidades relacionadas à autenticação |
| `users.ts`    | Operações relacionadas aos usuários         |
| `services.ts` | Operações relacionadas aos serviços         |
| `audit.ts`    | Registro de eventos e auditoria             |
| `utils.ts`    | Funções utilitárias                         |

---

# Banco de dados

O projeto utiliza PostgreSQL como banco de dados principal.

As tabelas principais são:

| Tabela               | Responsabilidade         |
| -------------------- | ------------------------ |
| `User`               | Usuários do sistema      |
| `Service`            | Serviços cadastrados     |
| `Appointment`        | Agendamentos             |
| `Payment`            | Pagamentos               |
| `BarberSchedule`     | Disponibilidade e agenda |
| `PasswordResetToken` | Recuperação de senha     |
| `AuditLog`           | Registros de auditoria   |

---

# Autenticação e proteção

A aplicação utiliza JWT para validar o acesso às áreas protegidas.

O token é armazenado em cookie e validado antes do acesso às rotas protegidas.

O arquivo `proxy.ts` intercepta rotas específicas.

```text
/api/:path*
/dashboard/:path*
/admin/:path*
/agendamentos/:path*
```

As seguintes rotas de autenticação permanecem públicas:

```text
/api/auth/login
/api/auth/register
/api/auth/forgot-password
/api/auth/reset-password
```

Requisições não autenticadas para endpoints protegidos recebem resposta:

```json
{
  "error": "Não autenticado"
}
```

com status `401 Unauthorized`.
