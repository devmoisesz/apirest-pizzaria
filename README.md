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
    │   └── usersRoutes.js
    ├── controllers/
    │   └── usersController.js
    ├── service/
    │   └── usersService.js
    └── repository/
        └── usersRepository.js
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

### Exemplo de body para POST e PUT

```json
{
  "nome": "João Silva",
  "email": "joao@email.com"
}
```

## O que falta (muita coisa)

- [ ] Autenticação JWT (login, senha, rotas protegidas)
- [ ] Rotas de produtos
- [ ] Rotas de categorias
- [ ] Rotas de pedidos
- [ ] Rotas de endereços
- [ ] Validação de dados de entrada
- [ ] Senha no cadastro de usuário
- [ ] Variáveis de ambiente para porta do servidor
- [ ] Tratamento de erros global (middleware)
- [ ] Paginação nas listagens