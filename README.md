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
    │   └── pedidosRoutes.js
    ├── controllers/
    │   ├── usersController.js
    │   ├── categoryController.js
    │   ├── productController.js
    │   └── pedidosController.js
    ├── service/
    │   ├── usersService.js
    │   ├── categoryService.js
    │   ├── productService.js
    │   └── pedidosService.js
    └── repository/
        ├── usersRepository.js
        ├── categoryRepository.js
        ├── productRepository.js
        └── pedidosRepository.js
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
node server.js
```

O servidor sobe na porta `3001`.

## Rotas disponíveis

### Usuários `/usuarios`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/usuarios` | Lista todos os usuários |
| GET | `/usuarios/:id` | Busca usuário por ID |
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
| POST | `/pedidos` | Cria um novo pedido |

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

#### Resposta
```json
{
  "id": 16,
  "user_id": 11,
  "status": "pendente",
  "total": "97.80",
  "created_at": "2026-05-04T01:42:04.600Z",
  "endereco_id": 2
}
```

## O que falta

- [ ] Rotas de endereços
- [ ] GET, PUT, DELETE de pedidos
- [ ] Atualização de status do pedido
- [ ] Autenticação JWT
- [ ] Validação de dados de entrada
- [ ] Tratamento de erros global (middleware)
- [ ] Paginação nas listagens
- [ ] Variáveis de ambiente para porta do servidor