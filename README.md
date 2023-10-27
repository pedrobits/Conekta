

# ConektaAPI

## Descrição

ConektaAPI é uma API simples para gerenciar contatos e usuários. Ela oferece funcionalidades básicas, como listar usuários, criar novos usuários, listar contatos de um usuário, criar novos contatos e editar contatos. A API é construída em JavaScript usando o Node.js e Express.js e utiliza um banco de dados MongoDB para armazenar os dados.

## Requisitos

Certifique-se de ter o Node.js instalado em sua máquina antes de prosseguir com a instalação e execução do projeto.

## Instalação

1. Clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/ConektaAPI.git
```

2. Acesse o diretório do projeto:

```bash
cd ConektaAPI
```

3. Instale as dependências:

```bash
npm install
```

4. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias, como o segredo JWT e as configurações do banco de dados.

## Iniciar banco de dados MongoDB via Docker

Para desenvolvimento, você pode iniciar um banco de dados MongoDB usando o Docker. Certifique-se de ter o Docker instalado em sua máquina. Use o seguinte comando para iniciar o banco de dados MongoDB:

```bash
docker run -it --rm --env-file .env -p 27017:27017 mongo:latest
```

Certifique-se de configurar o arquivo `.env` com as seguintes variáveis relacionadas ao MongoDB:

```
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=root
```

5. Inicie o servidor:

```bash
npm start
```

## Uso

A API oferece os seguintes endpoints:

### Usuários

- `GET /users` - Lista todos os usuários.
- `POST /users/create` - Cria um novo usuário.
- `PUT /users/edit` - Edita informações de um usuário existente.
- `POST /login` - Autentica um usuário e fornece um token JWT.

### Contatos

- `GET /contatos` - Lista todos os contatos de um usuário.
- `POST /contatos/create` - Cria um novo contato para um usuário.
- `PUT /contatos/edit` - Edita informações de um contato existente.

Certifique-se de incluir o token JWT no cabeçalho das solicitações autenticadas.

## Contribuições

Contribuições são bem-vindas! Se você quiser contribuir para o projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para sua contribuição: `git checkout -b sua-feature`
3. Faça suas alterações.
4. Faça um commit das alterações: `git commit -m 'Adicionando nova feature'`
5. Faça um push para o seu fork: `git push origin sua-feature`
6. Abra um Pull Request no repositório original.

## Licença

Este projeto é licenciado sob a Licença MIT.

## Contato

Se você tiver alguma dúvida ou precisar de suporte, sinta-se à vontade para entrar em contato:

PedroBits - Pedroksk2@gmail.com

## Agradecimentos

Obrigado por usar o ConektaAPI!
