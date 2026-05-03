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
    │   └── productRoutes.js
    ├── controllers/
    │   ├── usersController.js
    │   ├── categoryController.js
    │   └── productController.js
    ├── service/
    │   ├── usersService.js
    │   ├── categoryService.js
    │   └── productService.js
    └── repository/
        ├── usersRepository.js
        ├── categoryRepository.js
        └── productRepository.js
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

## O que falta

- [ ] Rotas de pedidos
- [ ] Rotas de endereços
- [ ] Autenticação JWT
- [ ] Validação de dados de entrada
- [ ] Tratamento de erros global (middleware)
- [ ] Paginação nas listagens
- [ ] Variáveis de ambiente para porta do servidor