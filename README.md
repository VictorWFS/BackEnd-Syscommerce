# 🛒 SysCommerce API – Documentação Completa

API RESTful para gerenciamento de e-commerce, desenvolvida com Node.js, Express, Sequelize, PostgreSQL, JWT(JsonWebToken) e Bcrypt.

---

## 📌 Base URL

```
http://localhost:3000/api
```

---

## 🔐 Autenticação

### `POST /api/auth/register`

Registra um novo usuário.

**Body:**
```json
{
  "name": "Victor",
  "email": "victor@email.com",
  "password": "senhaSegura123"
}
```

---

### `POST /api/auth/login`

Realiza login e retorna um token JWT.

**Body:**
```json
{
  "email": "victor@email.com",
  "password": "senhaSegura123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

## 👤 Usuário

### `GET /api/profile` (protegido)

Retorna os dados do usuário autenticado.

---

## 📦 Produtos

### `GET /api/products`

Lista produtos com filtros, ordenação e paginação.

**Query Params:**
- `search`: termo de busca
- `category`: ID da categoria
- `sort`: campo de ordenação
- `order`: `ASC` ou `DESC`
- `page`: número da página
- `limit`: quantidade por página

---

### `GET /api/products/:id`

Retorna os detalhes de um produto por ID.

---

### `POST /api/products` (admin)

Cria um novo produto.

---

### `PUT /api/products/:id` (admin)

Atualiza um produto existente.

---

### `DELETE /api/products/:id` (admin)

Remove um produto do sistema.

---

### `POST /api/products/:id/image` (admin)

Faz upload de imagem para um produto.

**Headers:**
- `Authorization: Bearer <TOKEN_ADMIN>`
- `Content-Type: multipart/form-data`

**Form-Data:**
- `image`: arquivo de imagem

---

## 📁 Categorias

### `GET /api/categories`

Lista todas as categorias.

---

### `POST /api/categories` (admin)

Cria uma nova categoria.

---

### `PUT /api/categories/:id` (admin)

Atualiza uma categoria.

---

### `DELETE /api/categories/:id` (admin)

Remove uma categoria.

---

## 🛒 Carrinho

### `GET /api/cart`

Retorna os itens do carrinho do usuário autenticado.

---

### `POST /api/cart`

Adiciona item ao carrinho.

**Body:**
```json
{
  "product_id": 1,
  "quantity": 2
}
```

---

### `PUT /api/cart/:id`

Atualiza a quantidade de um item do carrinho.

---

### `DELETE /api/cart/:id`

Remove item do carrinho.

---

## 📦 Pedidos

### `POST /api/orders`

Cria um novo pedido com base nos itens do carrinho.

---

### `GET /api/orders`

Lista os pedidos do usuário logado.

---

### `GET /api/orders/:id`

Detalha um pedido específico.

---

## 🏠 Endereços

### `GET /api/addresses`

Retorna o endereço atual do usuário.

---

### `POST /api/addresses`

Cria um novo endereço.

---

### `PUT /api/addresses/:id`

Atualiza um endereço existente.

---

### `DELETE /api/addresses/:id`

Remove o endereço.

---

## 📁 Admin

### `GET /api/admin/users`

Lista todos os usuários (admin).

---

### `GET /api/admin/products`

Lista todos os produtos com filtros (admin).

---

### `GET /api/admin/orders`

Lista todos os pedidos com filtros (admin).

---

## ✅ Status HTTP comuns

| Código | Descrição                          |
|--------|------------------------------------|
| 200    | OK                                 |
| 201    | Criado                             |
| 400    | Erro de validação                  |
| 401    | Não autorizado (sem token)         |
| 403    | Acesso negado (sem permissão)      |
| 404    | Recurso não encontrado             |
| 500    | Erro interno do servidor           |

---

## 🔐 Autenticação

Todas as rotas protegidas requerem:

```
Authorization: Bearer <seu_token_jwt>
```

---

## 🧪 Testes

A API pode ser testada usando:

- **Postman**
---

## 🛠️ Tecnologias

- Node.js
- Express
- PostgreSQL
- Sequelize
- JWT
- Multer
- Bcrypt
- Postman
