# App Delivery: Uma plataforma de delivery de cerveja. 🍻! (Back-end & Front-end)

Esse projeto tem a interação entre o back-end e o front-end.

Esse site tem como objtivo ajuda a dona Tereza, a expandir seu negocio via delivery. E essa aplicação ajudou a agilizar a vida de sua equipe e das pessoas que compram seus produtos.

O aplicativo tem:

Tem acesso via login: tanto clientes como pessoas vendedoras, assim como a própria dona Tereza, que administra o sistema.

Tem comunicação entre clientes e pessoas vendedoras: a pessoa cliente faz o pedido via "carrinho de compras" e a pessoa vendedora aprova, prepara e envia esse pedido. Quando o produto é recebido por quem comprou, essa pessoa marca o pedido como "recebido". Ambos devem possuir detalhes sobre seus pedidos;
Se a pessoa cliente faz o pedido, o mesmo deve aparecer para a pessoa vendedora em seu dash de pedidos após a atualização da página. A pessoa cliente, por sua vez, deve ter as informações sobre seu pedido quando sua página for atualizada, ou seja, ter informações se o pedido está sendo preparado ou se já saiu pra entrega.

## Conhecimento envolvido: 

- React
- Context
- Api
- Swaggerhub
- Axios
- Sql
- MongoDB
- Docker

## Execução da aplicação localmente


1. Instale as dependências.

```bash
npm install
```

2. Acesse a pasta do back-end e rode o docker.

```bash
docker-compose up -d
```

3. Rode o back-end.

```bash
npm start
```

4. Acesse agora a pasta do front-end.

```bash
npm start
```

## Perfis já cadastrados

### Cliente:
- Email:
```bash
zebirita@email.com
```
- Senha:
```bash
$#zebirita#$
```
### Vendedor:
- Email:
```bash
fulana@deliveryapp.com
```
- Senha:
```bash
fulana@123
```
### Administrado:
- Email:
```bash
adm@deliveryapp.com
```
- Senha:
```bash
--adm2@21!!--
```

## Caso não tenha o docker instalado, acesse:

Para linux:
https://docs.docker.com/engine/install/ubuntu/

Para Mac:
https://www.docker.com/

