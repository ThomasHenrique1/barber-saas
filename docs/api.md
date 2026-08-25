# API — BarberHub

A aplicação utiliza Route Handlers do Next.js organizados por domínio.

A documentação abaixo apresenta os principais grupos de endpoints disponíveis.

---

## Autenticação

Base:

```text
/api/auth
```

Endpoints:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

Responsabilidades:

* Cadastro de usuários
* Autenticação
* Encerramento de sessão
* Solicitação de recuperação de senha
* Redefinição de senha

---

## Usuário autenticado

```text
GET /api/me
```

Responsável pela consulta das informações do usuário autenticado.

---

## Barbeiros

```text
GET  /api/barbers
POST /api/barbers

GET    /api/barbers/[id]
PUT    /api/barbers/[id]
DELETE /api/barbers/[id]
```

Responsável pelo gerenciamento dos profissionais cadastrados.

As operações incluem:

* Consulta
* Cadastro
* Atualização
* Exclusão

---

## Clientes

```text
GET  /api/clients
POST /api/clients

GET    /api/clients/[id]
PUT    /api/clients/[id]
DELETE /api/clients/[id]
```

Responsável pelas operações relacionadas aos clientes.

---

## Serviços

```text
GET  /api/services
POST /api/services

GET    /api/services/[id]
PUT    /api/services/[id]
DELETE /api/services/[id]
```

Responsável pelo gerenciamento dos serviços.

As operações incluem:

* Consulta
* Cadastro
* Atualização
* Exclusão

---

## Agendamentos

```text
GET  /api/appointments
POST /api/appointments

GET    /api/appointments/available

GET    /api/appointments/[id]
PUT    /api/appointments/[id]
DELETE /api/appointments/[id]

PATCH /api/appointments/[id]/status
```

Responsável por:

* Consulta de agendamentos
* Criação de novos agendamentos
* Consulta de horários disponíveis
* Atualização
* Cancelamento
* Alteração de status

---

## Pagamentos

```text
GET  /api/payments
POST /api/payments

GET    /api/payments/[id]
PUT    /api/payments/[id]
DELETE /api/payments/[id]

PATCH /api/payments/[id]/status
```

Responsável pelo gerenciamento dos pagamentos relacionados aos atendimentos.

---

## Perfil

```text
GET /api/profile
PUT /api/profile

PATCH /api/profile/password

PATCH /api/profile/deactivate
```

Responsável por:

* Consulta das informações do perfil
* Atualização de dados
* Alteração de senha
* Gerenciamento da conta

---

## Administração

```text
GET /api/admin/logs
GET /api/admin/stats
GET /api/admin/payments/stats
```

Responsável por fornecer informações administrativas, incluindo:

* Logs e auditoria
* Estatísticas da operação
* Estatísticas relacionadas aos pagamentos

---

# Autenticação da API

Os endpoints protegidos verificam o token armazenado no cookie da requisição.

Quando não existe um token válido, a API retorna:

```json
{
  "error": "Não autenticado"
}
```

Status:

```text
401 Unauthorized
```

Quando o token é inválido:

```json
{
  "error": "Token inválido"
}
```

Também com status:

```text
401 Unauthorized
```

---

# Organização dos endpoints

```text
api/
├── admin/
│   ├── logs/
│   ├── payments/
│   │   └── stats/
│   └── stats/
│
├── appointments/
│   ├── available/
│   └── [id]/
│       └── status/
│
├── auth/
│   ├── forgot-password/
│   ├── login/
│   ├── logout/
│   ├── register/
│   └── reset-password/
│
├── barbers/
│   └── [id]/
│
├── clients/
│   └── [id]/
│
├── me/
│
├── payments/
│   └── [id]/
│       └── status/
│
├── profile/
│   ├── deactivate/
│   └── password/
│
└── services/
    └── [id]/
```
