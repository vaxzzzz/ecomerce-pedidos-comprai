# Sistema de Gestão de Pedidos — E-commerce

> Projeto integrador da Unidade Curricular **Desenvolvimento Back-end**
> Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas — Turma CSTADS601

## Equipe / Squad

| Nome | Papel na Aula 01 |
| _(Rhuan)_ | 
| _(Victor Vaz)_ | Responsável do dia |
| _(Kauã Henrique Frenedozo)_ | |

DIA 01 — 07/08/26
Introdução ao GitHub e organização inicial do projeto.
Criação do repositório e configuração da branch main.
Configuração de regras de proteção da branch main.
Estruturação inicial do projeto e realização do primeiro commit.
---------------------------------//----------------------------------
DIA 02 — 14/08/26
| Nome | Papel na Aula 02 |
| _(Rhuan)_ | Responsável do dia | 
| _(Victor Vaz)_ | |
| _(Kauã Henrique Frenedozo)_ | |

DIA 02 — 14/08/26
Introdução ao fluxo de trabalho com branches no Git.
Criação e gerenciamento de branches para desenvolvimento.
Aprendizado e aplicação do fluxo de Pull Requests.
Criação do primeiro Pull Request e revisão das alterações junto ao professor.
---------------------------------//----------------------------------
DIA 03 - 21/08/26
| Nome | Papel na Aula 03 |
| _(Rhuan)_ | 
| _(Victor Vaz)_ |  |
| _(Kauã Henrique Frenedozo)_ | Responsável do dia |

DIA 03 — 21/08/26
Revisão de conceitos básicos da linguagem Java, incluindo bibliotecas, métodos e o uso de .equals().
Introdução à criação e organização de classes no projeto.
Desenvolvimento da classe Pedido em Java.
Implementação dos métodos relacionados à classe Pedido.
---------------------------------//----------------------------------
DIA 04 - /08/26
| Nome | Papel na Aula 03 |
| _(Rhuan)_ | 
| _(Victor Vaz)_ |  |
| _(Kauã Henrique Frenedozo)_ | |


## Descrição do desafio

O desafio consiste no desenvolvimento de um sistema de gestão de pedidos para um e-commerce, permitindo o cadastro e gerenciamento de produtos e clientes, 
criação e acompanhamento de pedidos e processamento de diferentes formas de pagamento (ficticias), como cartão, boleto e Pix. O projeto também deverá contemplar testes automatizados,
API REST e integração contínua durante sua evolução.

## Funcionalidades previstas

- [ ] Cadastro e gerenciamento de produtos
- [ ] Cadastro e gerenciamento de clientes
- [ ] Criação e gerenciamento de pedidos
- [ ] Processamento de pagamentos (cartão, boleto, Pix)
- [ ] Testes automatizados (unitários e de integração)
- [ ] Pipeline de CI/CD
- [ ] API REST para consumo por um front-end

## Tecnologias

- Java
- Maven
- Git / GitHub
- _(demais tecnologias serão adicionadas ao longo do semestre: JUnit, Spring Boot, banco de
  dados, GitHub Actions...)_

## Estrutura de pastas

```
ecommerce-pedidos-NOMEDASQUAD/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/senai/ecommerce/
│   │           ├── modelo/
│   │           ├── servico/
│   │           ├── repositorio/
│   │           └── util/
│   └── test/
│       └── java/
│           └── com/senai/ecommerce/
├── pom.xml
├── README.md
└── .gitignore
```

## Como rodar o projeto

_(Preencher a partir das próximas aulas, conforme o projeto evoluir.)_

## Roadmap do projeto (por aula)

| Aula | Entrega |
|---|---|
| 01 | Repositório criado, estruturado, com README e commit inicial | **OK**
| 02 | Fluxo de branches e primeiro Pull Request revisado | **OK**
| 03 | Classe utilitária (Utils) do domínio |
| 04 | Classes de domínio inicial (Produto, Cliente, Pedido, ItemPedido) |
| 05 | Encapsulamento e abstração aplicados |
| 06 | Hierarquia de formas de pagamento (herança) |
| 07 | Relacionamentos entre classes do domínio |
| 08 | Módulo de pagamento polimórfico |
| 09 | Tratamento de exceções |
| 10 | Suíte de testes unitários |
| 11 | Suíte de testes de integração + relatório de cobertura |
| 12 | Persistência: conexão, Create e Read |
| 13 | Persistência: Update, Delete e padrão DAO/Repository |
| 14 | Migração para Spring Boot |
| 15 | API REST + pipeline CI/CD |
| 16 | Entrega final, documentação e apresentação |

## Combinado da equipe (ética e convivência)

1. Manter uma comunicação clara e respeitosa entre os integrantes da equipe.
2. Criar branches e Pull Requests para organizar e revisar as alterações antes de integrá-las à main.
3. Cumprir as tarefas definidas para cada aula e comunicar a equipe sobre eventuais dificuldades ou atrasos.

## Licença

Projeto acadêmico — Faculdade de Tecnologia SENAI "Antonio Adolpho Lobbe".
