<h1>🍕 API Pizzaria</h1>

<p align="center">
  Uma API REST completa para gerenciamento de uma pizzaria — construída do zero com Node.js, Express e PostgreSQL.<br/>
  Autenticação JWT, controle de acesso por papel, validação de dados, arquitetura em camadas e muito mais.
</p>

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,postgres,js,git,postman,vscode" />
  </a>
</p>

<p align="center">
  Node.js · Express · PostgreSQL · JavaScript · JWT · Bcrypt · Zod · dotenv · Git · Postman
</p>

---

## 💡 Sobre o projeto

Este projeto nasceu como um exercício prático de desenvolvimento backend. A ideia foi simples: construir uma API real, com todas as dores e decisões que um desenvolvedor encontra no dia a dia.

Ao longo do desenvolvimento foram tomadas decisões de arquitetura, modelagem de banco de dados, segurança com autenticação JWT, controle de acesso por papel (admin/cliente), validação de dados e tratamento de erros — tudo organizado em uma estrutura escalável e de fácil manutenção.

O resultado é uma API capaz de gerenciar usuários, cardápio, pedidos e endereços de uma pizzaria do mundo real.

---

## 🛠️ Arquitetura

O projeto segue uma arquitetura em camadas, onde cada parte tem uma responsabilidade bem definida:

```
Route       →   define os caminhos da API
Controller  →   lida com req e res
Service     →   regras de negócio e verificações
Repository  →   queries SQL no banco
Middleware  →   validação de dados, autenticação e controle de acesso
```

```
├── server.js
├── database/
│   └── db.js
└── src/
    ├── route/
    ├── controllers/
    ├── service/
    ├── repository/
    └── middlewares/
```

---

## 🚀 Como rodar

**1. Clone o repositório**
```bash
git clone https://github.com/devmoisesz/apirest-pizzaria.git
cd apirest-pizzaria
```

**2. Instale as dependências**
```bash
npm install
```

| Pacote | Descrição |
|--------|-----------|
| `express` | Framework web para criação das rotas |
| `pg` | Conexão com o banco de dados PostgreSQL |
| `dotenv` | Gerenciamento de variáveis de ambiente |
| `zod` | Validação de dados de entrada |
| `jsonwebtoken` | Geração e verificação de tokens JWT |
| `bcryptjs` | Hash seguro de senhas |

**3. Configure o `.env`**
```env
DATABASE_URL='postgresql://usuario:senha@localhost:5432/pizzaria'
JWT_SECRET='sua_chave_secreta'
PORT=3001  # ou qualquer porta disponível
```

**4. Inicie o servidor**
```bash
node --watch server.js
```

> Servidor rodando em `http://localhost:3001`

---

## 🔐 Autenticação e Controle de Acesso

A API utiliza JWT para proteger as rotas. Faça login para obter o token e envie-o no header de cada requisição protegida:

```
Authorization: Bearer seu_token_aqui
```

O token carrega o `id` e o `papel` do usuário — `admin` ou `cliente`.

**Rotas públicas** — não precisam de token:
- `POST /usuarios` — cadastro
- `POST /login` — login
- `GET /produtos` e `GET /produtos/:id` — cardápio
- `GET /categorias`, `GET /categorias/:id` e `GET /categorias/:id/produtos`

**Cliente autenticado** — precisam de token:
- `GET /usuarios/perfil` — ver próprio perfil
- `PUT /usuarios/perfil` — editar próprio perfil
- `POST /pedidos` — fazer pedido


**Apenas Admin** — precisam de token com `papel: admin`:
- CRUD completo de produtos e categorias
- Ver todos os usuários, pedidos e endereços
- Atualizar status de qualquer pedido

---

## 🗺️ Rotas disponíveis

### 👤 Usuários `/usuarios`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| `POST` | `/usuarios` | Cadastra novo usuário | Público |
| `GET` | `/usuarios` | Lista todos os usuários | Admin |
| `GET` | `/usuarios/perfil` | Dados do usuário logado | Cliente/Admin |
| `GET` | `/usuarios/:id` | Busca usuário por ID | Admin |
| `GET` | `/usuarios/:id/pedidos` | Lista pedidos de um usuário | Admin |
| `GET` | `/usuarios/:id/enderecos` | Lista endereços de um usuário | Admin |
| `PUT` | `/usuarios/perfil` | Edita perfil do usuário logado | Cliente/Admin |
| `PUT` | `/usuarios/:id` | Atualiza qualquer usuário | Admin |
| `DELETE` | `/usuarios/:id` | Remove usuário | Admin |

<details>
<summary>Ver body — POST/PUT</summary>

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "minhasenha123"
}
```
</details>

---

### 🔑 Login `/login`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| `POST` | `/login` | Autentica e retorna o token | Público |

<details>
<summary>Ver body</summary>

```json
{
  "email": "joao@email.com",
  "senha": "minhasenha123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
</details>

---

### 🗂️ Categorias `/categorias`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| `GET` | `/categorias` | Lista todas as categorias | Público |
| `GET` | `/categorias/:id` | Busca categoria por ID | Público |
| `GET` | `/categorias/:id/produtos` | Lista produtos de uma categoria | Público |
| `POST` | `/categorias` | Cadastra nova categoria | Admin |
| `PUT` | `/categorias/:id` | Atualiza categoria | Admin |
| `DELETE` | `/categorias/:id` | Remove categoria | Admin |

<details>
<summary>Ver body</summary>

```json
{
  "nome": "Pizzas Especiais"
}
```
</details>

---

### 🍕 Produtos `/produtos`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| `GET` | `/produtos` | Lista todos os produtos | Público |
| `GET` | `/produtos/:id` | Busca produto por ID | Público |
| `POST` | `/produtos` | Cadastra novo produto | Admin |
| `PUT` | `/produtos/:id` | Atualiza produto | Admin |
| `DELETE` | `/produtos/:id` | Remove produto | Admin |

<details>
<summary>Ver body</summary>

```json
{
  "name_product": "Calabresa Tradicional",
  "price": 39.90,
  "description": "Molho de tomate, queijo mussarela, calabresa fatiada e cebola",
  "category_id": 1
}
```
</details>

---

### 📦 Pedidos `/pedidos`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| `GET` | `/pedidos` | Lista todos os pedidos | Admin |
| `GET` | `/pedidos/:id` | Busca pedido por ID | Admin |
| `POST` | `/pedidos` | Cria um novo pedido | Cliente/Admin |
| `PUT` | `/pedidos/:id` | Atualiza status do pedido | Admin |
| `DELETE` | `/pedidos/:id` | Cancela pedido (só se pendente) | Cliente/Admin |

<details>
<summary>Ver body — POST</summary>

```json
{
  "user_id": 1,
  "endereco_id": 1,
  "itens": [
    { "product_id": 1, "quantity": 2 },
    { "product_id": 3, "quantity": 1 }
  ]
}
```
</details>

<details>
<summary>Ver body — PUT</summary>

```json
{
  "status": "em preparo"
}
```

**Status disponíveis:** `pendente` · `em preparo` · `entregue` · `cancelado`
</details>

---

### 📍 Endereços `/enderecos`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| `GET` | `/enderecos` | Lista todos os endereços | Admin |
| `GET` | `/enderecos/:id` | Busca endereço por ID | Admin |
| `POST` | `/enderecos` | Cadastra novo endereço | Admin |
| `PUT` | `/enderecos/:id` | Atualiza endereço | Admin |
| `DELETE` | `/enderecos/:id` | Remove endereço | Admin |

<details>
<summary>Ver body — POST</summary>

```json
{
  "user_id": 1,
  "cidade": "São Paulo",
  "rua": "Rua das Flores",
  "numero": "123",
  "bairro": "Centro",
  "complemento": "Apto 42",
  "cep": "01310-100"
}
```
</details>

---

## 🔧 O que vem por aí

- [ ] Rotas de endereço para o cliente gerenciar os próprios endereços
- [ ] Histórico de pedidos — `GET /pedidos/historico` retorna entregues e cancelados
- [ ] Busca de produtos por nome — `GET /produtos?nome=calabresa`
- [ ] Relatório de vendas — total vendido por dia e produto mais pedido
- [ ] Paginação nas listagens