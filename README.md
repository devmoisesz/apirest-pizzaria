# API Pizzaria 🍕

API REST de uma pizzaria em desenvolvimento. Projeto em estágio inicial — muita coisa ainda falta ser implementada.

## Tecnologias

- Node.js
- Express 5
- PostgreSQL
- dotenv

## Estrutura do projeto

```
├── server.js
├── database/
│   └── db.js
└── src/
    ├── route/
    │   ├── usersRoutes.js
    │   ├── categoryRoutes.js
    │   ├── productRoutes.js
    │   ├── pedidosRoutes.js
    │   └── enderecoRoutes.js
    ├── controllers/
    │   ├── usersController.js
    │   ├── categoryController.js
    │   ├── productController.js
    │   ├── pedidosController.js
    │   └── enderecoController.js
    ├── service/
    │   ├── usersService.js
    │   ├── categoryService.js
    │   ├── productService.js
    │   ├── pedidosService.js
    │   └── enderecoService.js
    └── repository/
        ├── usersRepository.js
        ├── categoryRepository.js
        ├── productRepository.js
        ├── pedidosRepository.js
        └── enderecoRepository.js
```

## Como rodar

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Configure o `.env` na raiz do projeto:
```env
DATABASE_URL='postgresql://usuario:senha@localhost:5432/pizzaria'
```
4. Inicie o servidor:
```bash
node --watch server.js
```

O servidor sobe na porta `3001`.

## Rotas disponíveis

### Usuários `/usuarios`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/usuarios` | Lista todos os usuários |
| GET | `/usuarios/:id` | Busca usuário por ID |
| GET | `/usuarios/:id/pedidos` | Lista pedidos de um usuário |
| POST | `/usuarios` | Cadastra novo usuário |
| PUT | `/usuarios/:id` | Atualiza usuário |
| DELETE | `/usuarios/:id` | Remove usuário |

#### Exemplo de body para POST e PUT
```json
{
  "nome": "João Silva",
  "email": "joao@email.com"
}
```

### Categorias `/categorias`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/categorias` | Lista todas as categorias |
| GET | `/categorias/:id` | Busca categoria por ID |
| POST | `/categorias` | Cadastra nova categoria |
| PUT | `/categorias/:id` | Atualiza categoria |
| DELETE | `/categorias/:id` | Remove categoria |

#### Exemplo de body para POST e PUT
```json
{
  "nome": "Pizzas Especiais"
}
```

### Produtos `/produtos`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/produtos` | Lista todos os produtos |
| GET | `/produtos/:id` | Busca produto por ID |
| POST | `/produtos` | Cadastra novo produto |
| PUT | `/produtos/:id` | Atualiza produto |
| DELETE | `/produtos/:id` | Remove produto |

#### Exemplo de body para POST e PUT
```json
{
  "name_product": "Calabresa Tradicional",
  "price": 39.90,
  "description": "Molho de tomate, queijo mussarela, calabresa fatiada e cebola",
  "category_id": 1
}
```

### Pedidos `/pedidos`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/pedidos` | Lista todos os pedidos |
| GET | `/pedidos/:id` | Busca pedido por ID |
| POST | `/pedidos` | Cria um novo pedido |
| PUT | `/pedidos/:id` | Atualiza status do pedido |
| DELETE | `/pedidos/:id` | Remove pedido |

#### Exemplo de body para POST
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

#### Exemplo de body para PUT
```json
{
  "status": "em preparo"
}
```

#### Status disponíveis
- `pendente`
- `em preparo`
- `entregue`
- `cancelado`

### Endereços `/enderecos`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/enderecos` | Lista todos os endereços |
| GET | `/enderecos/:id` | Busca endereço por ID |
| POST | `/enderecos` | Cadastra novo endereço |
| PUT | `/enderecos/:id` | Atualiza endereço |
| DELETE | `/enderecos/:id` | Remove endereço |

#### Exemplo de body para POST
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

#### Exemplo de body para PUT
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

## O que falta

- [ ] GET /categorias/:id/produtos
- [ ] Cancelamento de pedido com validação de status
- [ ] Autenticação JWT
- [ ] Validação de dados de entrada
- [ ] Tratamento de erros global (middleware)
- [ ] Paginação nas listagens
- [ ] Variáveis de ambiente para porta do servidor