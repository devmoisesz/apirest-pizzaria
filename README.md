<h1 align="center">🍕 API Pizzaria</h1>

<p align="center">
  API REST para gerenciamento de uma pizzaria — pedidos, produtos, usuários e muito mais.
</p>

---

## 🛠️ Ferramentas & Tecnologias

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=js,nodejs,express,postgres,git,postman,vscode" />
  </a>
</p>

<p align="center">
  JavaScript · Node.js · Express · PostgreSQL · Zod · dotenv · Git · Postman · Visual Studio Code
</p>

---

## 📁 Estrutura do projeto

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

**3. Configure o `.env`**
```env
DATABASE_URL='postgresql://usuario:senha@localhost:5432/pizzaria'
```

**4. Inicie o servidor**
```bash
node --watch server.js
```

> Servidor rodando em `http://localhost:3001`

---

## 🗺️ Rotas disponíveis

### 👤 Usuários `/usuarios`

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/usuarios` | Lista todos os usuários |
| `GET` | `/usuarios/:id` | Busca usuário por ID |
| `GET` | `/usuarios/:id/pedidos` | Lista pedidos de um usuário |
| `GET` | `/usuarios/:id/enderecos` | Lista endereços de um usuário |
| `POST` | `/usuarios` | Cadastra novo usuário |
| `PUT` | `/usuarios/:id` | Atualiza usuário |
| `DELETE` | `/usuarios/:id` | Remove usuário |

<details>
<summary>Ver body</summary>

```json
{
  "nome": "João Silva",
  "email": "joao@email.com"
}
```
</details>

---

### 🗂️ Categorias `/categorias`

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/categorias` | Lista todas as categorias |
| `GET` | `/categorias/:id` | Busca categoria por ID |
| `GET` | `/categorias/:id/produtos` | Lista produtos de uma categoria |
| `POST` | `/categorias` | Cadastra nova categoria |
| `PUT` | `/categorias/:id` | Atualiza categoria |
| `DELETE` | `/categorias/:id` | Remove categoria |

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

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/produtos` | Lista todos os produtos |
| `GET` | `/produtos/:id` | Busca produto por ID |
| `POST` | `/produtos` | Cadastra novo produto |
| `PUT` | `/produtos/:id` | Atualiza produto |
| `DELETE` | `/produtos/:id` | Remove produto |

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

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/pedidos` | Lista todos os pedidos |
| `GET` | `/pedidos/:id` | Busca pedido por ID |
| `POST` | `/pedidos` | Cria um novo pedido |
| `PUT` | `/pedidos/:id` | Atualiza status do pedido |
| `DELETE` | `/pedidos/:id` | Remove pedido |

<details>
<summary>Ver body — POST</summary>

```json
{
  "user_id": 11,
  "endereco_id": 2,
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

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/enderecos` | Lista todos os endereços |
| `GET` | `/enderecos/:id` | Busca endereço por ID |
| `POST` | `/enderecos` | Cadastra novo endereço |
| `PUT` | `/enderecos/:id` | Atualiza endereço |
| `DELETE` | `/enderecos/:id` | Remove endereço |

<details>
<summary>Ver body — POST</summary>

```json
{
  "user_id": 11,
  "cidade": "São Paulo",
  "rua": "Rua das Flores",
  "numero": "123",
  "bairro": "Centro",
  "complemento": "Apto 42",
  "cep": "01310-100"
}
```
</details>

<details>
<summary>Ver body — PUT</summary>

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

## 🔧 O que falta

- [ ] Autenticação JWT
- [ ] Paginação nas listagens
- [ ] Variáveis de ambiente para porta do servidor