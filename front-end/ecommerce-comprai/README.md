# Comprai — Sistema de Gestão de Pedidos (Front-End)

Interface web em **React + Vite + Bootstrap** para o Sistema de Gestão de Pedidos para E-commerce.
Catálogo, carrinho, checkout com pagamento simulado, pedidos com linha do tempo e área administrativa
(produtos e clientes).

## Como rodar

Pré-requisito: Node.js 20 ou superior.

```bash
cd ecommerce-comprai
npm install
```

São necessários **dois terminais** (a interface e a API simulada):

```bash
# Terminal 1 — API simulada (json-server) em http://localhost:3001
npm run api

# Terminal 2 — interface em http://localhost:5173
npm run dev
```

> Se a API não estiver rodando, as telas mostram a mensagem
> "Não foi possível conectar à API... (npm run api)".

## Scripts NPM

| Comando           | O que faz                                         |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento (Vite)                |
| `npm run api`     | API simulada com json-server usando o `db.json`   |
| `npm run build`   | Gera a versão de produção na pasta `dist`         |
| `npm run preview` | Abre a versão de produção localmente              |
| `npm run lint`    | Verifica o código com ESLint                      |

## Estrutura do projeto

```
src/
├── components/   Peças reutilizáveis (Navbar, ProductCard, ProductForm, ClientForm,
│                 FormField, QuantityStepper, ConfirmModal, AlertMessage, Loading,
│                 OrderTimeline, Footer)
├── pages/        Uma tela por rota (Home, Catalog, Cart, Checkout, Orders, ...)
├── services/     Comunicação com a API (api.js + um arquivo por recurso)
├── hooks/        useCart (carrinho) e useFetch (carregamento/erro)
├── contexts/     CartContext (carrinho compartilhado e salvo no navegador)
├── routes/       AppRoutes.js — todos os caminhos (URLs) do sistema
├── utils/        format.js (moeda/data) e validators.js (e-mail, CPF, CEP, telefone)
└── constants.js  Valores fixos: endpoints, status, formas de pagamento, regras
```

## Rotas

| Caminho                          | Tela                          |
| -------------------------------- | ----------------------------- |
| `/`                              | Início                        |
| `/catalogo`                      | Catálogo (busca e filtros)    |
| `/produto/:id`                   | Detalhes do produto           |
| `/carrinho`                      | Carrinho                      |
| `/checkout`                      | Checkout                      |
| `/resultado-pagamento`           | Resultado do pagamento        |
| `/pedidos`                       | Lista de pedidos              |
| `/pedido/:id`                    | Detalhes e linha do tempo     |
| `/admin/produtos`                | Gestão de produtos            |
| `/admin/produtos/novo`           | Cadastro de produto           |
| `/admin/produtos/:id/editar`     | Edição de produto             |
| `/admin/clientes`                | Gestão de clientes            |
| `/admin/clientes/novo`           | Cadastro de cliente           |
| `/admin/clientes/:id/editar`     | Edição de cliente             |
| qualquer outra                   | Página 404                    |

## Integração com a API

Toda a comunicação passa pela pasta `services/`. Os endpoints ficam em `constants.js`:

| Recurso    | Endpoint (simulado) | Métodos usados            |
| ---------- | ------------------- | ------------------------- |
| Produtos   | `/produtos`         | GET, POST, PUT, DELETE    |
| Clientes   | `/clientes`         | GET, POST, PUT            |
| Pedidos    | `/pedidos`          | GET, POST, PATCH          |
| Pagamentos | `/pagamentos`       | POST                      |

**Trocar pela API real do back-end:** crie um arquivo `.env` na raiz do projeto com

```
VITE_API_URL=http://localhost:8080/api
```

Se os nomes dos campos do back-end forem diferentes (`name`, `price`, `stock`, ...),
ajuste apenas os arquivos de `services/`.

## Regras do pagamento simulado

- **Pix**: sempre aprovado → pedido fica **Pago**.
- **Boleto**: sempre pendente → pedido continua **Pendente**.
- **Cartão**: 80% de chance de aprovação; se for recusado, o pedido fica **Cancelado**.

(Os valores ficam em `constants.js`: `CARD_APPROVAL_RATE`.)

## Acessibilidade

HTML semântico, rótulos em todos os campos, mensagens de erro ligadas aos campos (`aria-describedby`),
link "Pular para o conteúdo", foco visível, modal com `Esc` para fechar, textos alternativos nas imagens
e `lang="pt-BR"`.
