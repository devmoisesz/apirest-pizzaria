<h1>🍕 API Pizzaria</h1>

<p align="center">
  Uma API REST completa e profissional para gerenciamento de uma pizzaria — construída do zero com Node.js, Express e PostgreSQL.<br/>
  Autenticação JWT, controle de acesso por papel, validação robusta de dados, arquitetura em camadas e testes automatizados.
</p>

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,postgres,js,git,postman,vscode,jest" />
  </a>
</p>

<p align="center">
  Node.js · Express · PostgreSQL · JavaScript · JWT · Bcrypt · Zod · Jest · Supertest · dotenv
</p>

---

## 💡 Sobre o projeto

Este projeto é uma API REST completa para gerenciamento de uma pizzaria, desenvolvida com foco em boas práticas de desenvolvimento backend. A ideia foi construir uma API real e funcional, com todas as decisões arquiteturais e desafios que um desenvolvedor encontra no dia a dia.

Ao longo do desenvolvimento foram implementados conceitos importantes: segurança com autenticação JWT, controle de acesso por papel (admin/cliente), validação robusta de dados com Zod, arquitetura em camadas escalável, middleware de tratamento de erros e **testes de integração com Jest**.

O resultado é uma API profissional capaz de gerenciar completamente um negócio de pizzaria: usuários, cardápio de produtos/categorias, pedidos com histórico, endereços de entrega, controle de permissões e testes automatizados para garantir qualidade do código.

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
├── server.js           # Inicializa o servidor
├── app.js              # Exporta a aplicação (separado para testes)
├── jest.config.js      # Configuração do Jest
├── package.json        # Dependências
├── database/
│   └── db.js           # Conexão com PostgreSQL
└── src/
    ├── route/          # Definição de rotas
    ├── controller/     # Lógica de requisição e resposta
    ├── service/        # Regras de negócio
    ├── repository/     # Queries SQL
    └── middlewares/    # Validação, autenticação, autorização
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
| `jest` | Framework de testes |
| `supertest` | Testes de rotas HTTP |

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

**5. Execute os testes**
```bash
npm test
```

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
- `GET /categoria`, `GET /categoria/:id` e `GET /categoria/:id/produtos`

**Cliente autenticado** — precisam de token:
- `GET /usuarios/perfil` — ver próprio perfil
- `PUT /usuarios/perfil` — editar próprio perfil
- `DELETE /usuarios/perfil` — deletar próprio cadastro
- `POST /pedidos` — fazer pedido
- `GET /pedidos/perfil/:id` — consultar próprio pedido
- `GET /pedidos/historico` — histórico de pedidos
- `DELETE /pedidos/perfil/:id` — cancelar próprio pedido
- `GET /enderecos/perfil` — ver próprio endereço
- `POST /enderecos/perfil` — cadastrar próprio endereço
- `PUT /enderecos/perfil/:id` — editar próprio endereço
- `DELETE /enderecos/perfil/:id` — deletar próprio endereço

**Apenas Admin** — precisam de token com `papel: admin`:
- CRUD completo de produtos e categorias
- Ver todos os usuários, pedidos e endereços
- Atualizar status de qualquer pedido
- Gerenciar cadastros de endereços de todos os usuários
- Deletar usuários

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
| `DELETE` | `/usuarios/perfil` | Deleta próprio cadastro | Cliente/Admin |
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

<details>
<summary>Ver body — DELETE /usuarios/perfil</summary>

```json
{
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

### 🗂️ Categorias `/categoria`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| `GET` | `/categoria` | Lista todas as categorias | Público |
| `GET` | `/categoria/:id` | Busca categoria por ID | Público |
| `GET` | `/categoria/:id/produtos` | Lista produtos de uma categoria | Público |
| `POST` | `/categoria` | Cadastra nova categoria | Admin |
| `PUT` | `/categoria/:id` | Atualiza categoria | Admin |
| `DELETE` | `/categoria/:id` | Remove categoria | Admin |

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
| `GET` | `/produtos?nome=calabresa` | Busca produtos por nome | Público |
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
| `GET` | `/pedidos/perfil/:id` | Busca próprio pedido | Cliente/Admin |
| `GET` | `/pedidos/historico` | Histórico de pedidos do usuário | Cliente/Admin |
| `POST` | `/pedidos` | Cria um novo pedido | Cliente/Admin |
| `PUT` | `/pedidos/:id` | Atualiza status do pedido | Admin |
| `DELETE` | `/pedidos/perfil/:id` | Cancela próprio pedido (muda status) | Cliente/Admin |
| `DELETE` | `/pedidos/:id` | Cancela qualquer pedido | Admin |

<details>
<summary>Ver body — POST</summary>

```json
{
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
  "status": "em_preparacao"
}
```

**Status disponíveis:** `pendente` · `em_preparacao` · `entregue` · `cancelado`
</details>

---

### 📍 Endereços `/enderecos`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| `GET` | `/enderecos` | Lista todos os endereços | Admin |
| `GET` | `/enderecos/:id` | Busca endereço por ID | Admin |
| `GET` | `/enderecos/perfil` | Busca próprio endereço | Cliente/Admin |
| `POST` | `/enderecos` | Cadastra novo endereço | Admin |
| `POST` | `/enderecos/perfil` | Cadastra próprio endereço | Cliente/Admin |
| `PUT` | `/enderecos/:id` | Atualiza endereço | Admin |
| `PUT` | `/enderecos/perfil/:id` | Atualiza próprio endereço | Cliente/Admin |
| `DELETE` | `/enderecos/perfil/:id` | Deleta próprio endereço | Cliente/Admin |
| `DELETE` | `/enderecos/:id` | Remove endereço | Admin |

<details>
<summary>Ver body — POST/PUT</summary>

```json
{
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

## 🧪 Testes de Integração

A API possui testes de integração com Jest e Supertest para garantir qualidade e confiabilidade do código.

**Cenários testados:**
- ✅ Segurança: API confia no ID do token, não do body
- ✅ Validação: Email duplicado retorna erro apropriado
- ✅ Autorização: Apenas admin consegue cadastrar categorias
- ✅ HTTP Status Codes: Erros retornam status corretos (não apenas 500)

**Executar testes:**
```bash
npm test
```

**Executar testes com cobertura:**
```bash
npm test -- --coverage
```

---

## ✨ Principais Funcionalidades Implementadas

### 🔒 Segurança
- ✅ Autenticação JWT com tokens seguros
- ✅ Hash de senhas com Bcrypt (10 rounds)
- ✅ Middleware de proteção de rotas
- ✅ Verificação de senha para operações sensíveis (deletar conta)
- ✅ Controle de acesso por papel (RBAC) — admin e cliente
- ✅ Validação de propriedade de recursos (user_id vem do token, não do body)

### ✔️ Validação de Dados
- ✅ Validação completa com Zod em todos os endpoints
- ✅ Schemas específicos para cada entidade
- ✅ Mensagens de erro descritivas em português
- ✅ Validação em múltiplas camadas (middleware + service)
- ✅ Enum validado para status de pedidos

### 📋 Gerenciamento de Dados
- ✅ CRUD completo para usuários, produtos, categorias, pedidos e endereços
- ✅ Histórico de pedidos com filtro por status
- ✅ Busca de produtos por nome
- ✅ Múltiplos endereços por cliente
- ✅ Sistema de status para pedidos (pendente, em_preparacao, entregue, cancelado)
- ✅ Validação de pedidos pendentes antes de deletar usuário

### 🏗️ Arquitetura
- ✅ Arquitetura em camadas bem definida
- ✅ Separação clara de responsabilidades (Route → Controller → Service → Repository)
- ✅ Middleware de tratamento de erros global com status HTTP apropriados
- ✅ Código limpo e facilmente escalável
- ✅ App e Server separados (melhor para testes)

### 🧪 Testes
- ✅ Testes de integração com Jest
- ✅ Testes de segurança (validação de autorização)
- ✅ Testes de validação de dados
- ✅ Uso de Supertest para testes de rotas HTTP

---

## 📊 Endpoints Resumo

| Recurso | Endpoint | Métodos | Testes |
|---------|----------|---------|--------|
| **Usuários** | `/usuarios` | POST, GET, PUT, DELETE | ✅ |
| **Login** | `/login` | POST | ✅ |
| **Produtos** | `/produtos` | GET (com busca), POST, PUT, DELETE | - |
| **Categorias** | `/categoria` | GET, POST, PUT, DELETE | ✅ |
| **Pedidos** | `/pedidos` | GET, POST, PUT, DELETE (+ histórico) | ✅ |
| **Endereços** | `/enderecos` | GET, POST, PUT, DELETE | - |

**Total: 50+ rotas com controle de acesso**

---

## 📦 Dependências

```json
{
  "bcryptjs": "^3.0.3",        // Hash seguro de senhas
  "dotenv": "^17.4.2",         // Variáveis de ambiente
  "express": "^5.2.1",         // Framework web
  "jsonwebtoken": "^9.0.3",    // Autenticação JWT
  "pg": "^8.20.0",             // Driver PostgreSQL
  "zod": "^4.4.3",             // Validação de dados
  "jest": "^30.4.2",           // Testes unitários e integração
  "supertest": "^7.2.2"        // Testes de rotas HTTP
}
```

---

## 🎯 Status do Projeto

✅ **FUNCIONALIDADES COMPLETAS** — Todos os requisitos implementados, testados e refinados

### Funcionalidades Concluídas
- ✅ Autenticação e autorização completa com JWT
- ✅ Gerenciamento de usuários (cadastro, edição, deleção com validações)
- ✅ CRUD de produtos e categorias
- ✅ Sistema de pedidos com histórico e status
- ✅ Gerenciamento de endereços por cliente
- ✅ Busca de produtos por nome
- ✅ Middleware de erros global com status HTTP corretos
- ✅ Validação robusta de dados com Zod
- ✅ Arquitetura em camadas escalável
- ✅ Testes de integração com Jest
- ✅ Separação de app.js e server.js (melhor para testes)
- ✅ README completo com documentação

### Melhorias Recentes (Commits)
1. **Separação app/server** — Refatorado para permitir testes sem iniciar servidor
2. **Testes de segurança** — API confia no ID do token, não do body
3. **Validação de email** — Testa duplicate email rejection
4. **Autorização de admin** — Testa que apenas admin cadastra categorias
5. **Status HTTP corretos** — Retorna status apropriados em cada erro (400, 401, 403, 404, 409, 422, etc.)

---

## 🚀 Próximos Passos (Melhorias Futuras)

- [ ] Rate limiting em /login
- [ ] Refresh tokens
- [ ] Soft delete para auditoria
- [ ] Logs centralizados (Winston)
- [ ] CI/CD com GitHub Actions
- [ ] Docker + docker-compose
- [ ] Documentação com Swagger/OpenAPI
- [ ] Testes e2e com Cypress
- [ ] Cobertura de testes > 80%
- [ ] Backup automático do BD

---

## 📚 Recursos Úteis

- [Express.js Documentation](https://expressjs.com/)
- [JWT.io](https://jwt.io/)
- [Zod Validation](https://zod.dev/)
- [Jest Documentation](https://jestjs.io/)
- [Supertest GitHub](https://github.com/visionmedia/supertest)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 📝 Licença

Este projeto está sob a licença ISC.

---

**Desenvolvido com ❤️ por [devmoisesz](https://github.com/devmoisesz)**
