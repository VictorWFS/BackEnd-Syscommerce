# 🛒 SysCommerce API – Documentação Técnica

API RESTful desenvolvida para gerenciamento completo de um sistema de e-commerce. A aplicação foi construída com **Node.js** e **Express**, utilizando **Sequelize ORM** para interação com banco de dados **PostgreSQL**, com segurança baseada em **JWT (JSON Web Tokens)** e criptografia de senhas com **Bcrypt**.

---

## 📌 Base URL

```http
http://localhost:3000/api
```

---

## 🔐 Autenticação

O sistema utiliza autenticação via **JWT** para proteger rotas sensíveis. O token deve ser enviado no header das requisições autenticadas:

```
Authorization: Bearer <seu_token_jwt>
```

### `POST /api/auth/register` – Registrar novo usuário

Cria uma nova conta de usuário no sistema.

**Body:**

```json
{
  "name": "Victor",
  "email": "victor@email.com",
  "password": "senhaSegura123"
}
```

---

### `POST /api/auth/login` – Login de usuário

Autentica um usuário e retorna um token JWT.

**Body:**

```json
{
  "email": "victor@email.com",
  "password": "senhaSegura123"
}
```

**Resposta esperada:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

## 👤 Perfil do Usuário

### `GET /api/profile` – Obter dados do usuário autenticado

Requer autenticação. Retorna os dados do usuário que realizou login.

---

## 📦 Produtos

Módulo responsável por gerenciamento de produtos no sistema, com suporte para filtros, ordenações e paginação.

### `GET /api/products` – Listar produtos

Lista todos os produtos disponíveis com suporte a filtros:

**Query Params:**

* `search`: termo de busca
* `category`: ID da categoria
* `sort`: campo para ordenação
* `order`: `ASC` ou `DESC`
* `page`: número da página (inteiro)
* `limit`: quantidade de produtos por página

---

### `GET /api/products/:id` – Detalhar produto

Retorna as informações de um produto específico, localizado pelo seu ID.

---

### `POST /api/products` – Criar produto (admin)

Requer autenticação e permissão de administrador. Cadastra um novo produto no sistema.

---

### `PUT /api/products/:id` – Atualizar produto (admin)

Atualiza as informações de um produto existente.

---

### `DELETE /api/products/:id` – Remover produto (admin)

Remove um produto da base de dados.

---

### `POST /api/products/:id/image` – Upload de imagem (admin)

Permite o envio de uma imagem associada a um produto.

**Headers:**

* `Authorization: Bearer <TOKEN_ADMIN>`
* `Content-Type: multipart/form-data`

**Form-Data:**

* `image`: arquivo de imagem (formato `.jpg`, `.png`, etc.)

---

## 📁 Categorias

Permite o gerenciamento de categorias para os produtos.

### `GET /api/categories` – Listar categorias

Retorna todas as categorias cadastradas no sistema.

---

### `POST /api/categories` – Criar categoria (admin)

Cria uma nova categoria de produto.

---

### `PUT /api/categories/:id` – Atualizar categoria (admin)

Edita uma categoria existente.

---

### `DELETE /api/categories/:id` – Excluir categoria (admin)

Remove uma categoria da base de dados.

---

## 🛒 Carrinho de Compras

O carrinho está vinculado ao usuário autenticado.

### `GET /api/cart` – Visualizar carrinho

Retorna os itens adicionados ao carrinho do usuário logado.

---

### `POST /api/cart` – Adicionar item ao carrinho

Adiciona um produto ao carrinho.

**Body:**

```json
{
  "product_id": 1,
  "quantity": 2
}
```

---

### `PUT /api/cart/:id` – Atualizar item do carrinho

Altera a quantidade de um item no carrinho.

---

### `DELETE /api/cart/:id` – Remover item do carrinho

Remove um item do carrinho de compras.

---

## 📦 Pedidos

### `POST /api/orders` – Finalizar pedido

Cria um pedido a partir dos itens do carrinho atual do usuário.

---

### `GET /api/orders` – Listar pedidos

Retorna todos os pedidos realizados pelo usuário autenticado.

---

### `GET /api/orders/:id` – Detalhes do pedido

Retorna os detalhes de um pedido específico.

---

## 🏠 Endereços

Funcionalidade para gerenciar os endereços de entrega dos usuários.

### `GET /api/addresses` – Listar endereços

Retorna o endereço atual cadastrado pelo usuário.

---

### `POST /api/addresses` – Adicionar novo endereço

Cria um novo endereço de entrega.

---

### `PUT /api/addresses/:id` – Atualizar endereço

Edita um endereço existente.

---

### `DELETE /api/addresses/:id` – Remover endereço

Exclui um endereço da base de dados.

---

## 🧑‍💼 Admin – Área Restrita

Rotas de administração acessíveis apenas por usuários com permissão de administrador.

### `GET /api/admin/users` – Listar usuários

Retorna todos os usuários cadastrados no sistema.

---

### `GET /api/admin/products` – Listar produtos com filtros

Retorna todos os produtos com as mesmas opções de filtro disponíveis na rota pública.

---

### `GET /api/admin/orders` – Listar pedidos

Retorna todos os pedidos realizados na aplicação.

---

## ✅ Códigos de Status HTTP

| Código | Descrição                                |
| ------ | ---------------------------------------- |
| 200    | OK – Requisição bem-sucedida             |
| 201    | Criado – Novo recurso criado com sucesso |
| 400    | Bad Request – Erro de validação          |
| 401    | Unauthorized – Token ausente ou inválido |
| 403    | Forbidden – Sem permissão                |
| 404    | Not Found – Recurso não encontrado       |
| 500    | Internal Server Error – Erro no servidor |

---

## 🧪 Testes da API

A API foi testada com o **Postman**, utilizando coleções de requisições para simular fluxos completos do usuário, como:

* Registro e login
* Adição de produtos
* Compra via carrinho
* Gestão de pedidos e endereços

---

## 🛠️ Tecnologias Utilizadas

* **Node.js** – Ambiente de execução JavaScript no servidor
* **Express** – Framework para criação de APIs REST
* **Sequelize** – ORM para modelagem de dados com PostgreSQL
* **PostgreSQL** – Banco de dados relacional
* **JWT** – Autenticação segura baseada em tokens
* **Bcrypt** – Criptografia de senhas
* **Multer** – Upload de arquivos (imagens)
* **Postman** – Testes e documentação da API
