# API_Planilha_para_controle_de_orçamento_pessoal.

## A API tem por objetivo cadastrar receitas e despesas pessoais do seu orçamento domestico. podendo servir como controle orçamentario mensal e anual. Segue os endpoints:

`Acesso aos endpoints da API Usuários`
* GET /usuarios -> Acessar todos os usuários por token
* POST /usuarios -> Criar usuário.
* POST / usuario/login -> Logar usuário
* PUT /usuarios/:id -> Modificar usuário por ID por token
* DELETE / usuarios/:id -> Deletar usuário por ID por token

`Acesso aos endpoints da API Receitas`
* GET /receitas  -> Total de receitas.
* GET /receitas/{:ano}{:mes} -> Pesquisar Receitas por data.
* GET /receitas/descricao/:descricao -> Pesquisar Receitas por Descrição.
* POST /receitas  -> Criar receita.
* PUT /receitas/:id -> Modificar receita por ID.
* DELETE /receitas/:id -> Deletar receita por ID.

`Acesso aos endpoints da API Despesas`
* GET /despesas -> Total de despesas
* GET /receitas/{:ano}{:mes} -> Pesquisar despesas por data.
* GET /despesas/descricao/:descricao -> Pesquisar despesas por Descrição.
* POST /despesas  -> Criar despesas.
* PUT /despesas/:id -> Modificar despesas por ID.
* DELETE /despesas/:id -> Deletar despesas por ID.

## Esta API foi desenvolvida em NodeJs, usando os frameworks: 

- Sequelize 6.28.0
- Sequelize-cli 6.6.0 
- Express 4.18.2 
- Mysql2 3.0.1 
- Body-parser 1.20.1

# Banco de dados

Você vai precisar utilizar um banco de dados para armazenar as informações da aplicação.

Para o cadastro de **receitas**, estas são as informações necessárias: ✅
- `id`
- `descricao`
- `valor`
- `data`
Para o cadastro de **despesas**, estas são as informações necessárias: ✅
- `id`
- `descricao`
- `valor`
- `data`
A modelagem da(s) tabela(s) fica a seu critério. ✅

# Cadastro de receita ✅

A API deve possuir um endpoint para o cadastro de receitas, sendo que ele deve aceitar requisições do tipo **POST** para a URI **/receitas**.

Os dados da receita(descrição, valor e data) devem ser enviados no corpo da requisição, no formato JSON.

## Regras de negócio ✅

* Todas as informações da receita são obrigatórias
* A API não deve permitir o cadastro de receitas duplicadas(contendo a mesma descrição, dentro do mesmo mês)

# Detalhamento de receita ✅

A API deve possuir um endpoint para exibir os detalhes de uma determinada receita, sendo que ele deve aceitar requisições do tipo **GET** para a URI **/receitas/{id}**.

Os dados da receita(descrição, valor e data) devem ser devolvidos no corpo da resposta, no formato JSON.

# Listagem de receitas ✅

A API deve possuir um endpoint para a listagem de **todas** as receitas, sendo que ele deve aceitar requisições do tipo **GET** para a URI **/receitas**.

Os dados das receitas(descrição, valor e data) devem ser devolvidos no corpo da resposta, no formato JSON.

# Atualização de receita ✅

A API deve possuir um endpoint para a atualização dos dados de uma determinada receita, sendo que ele deve aceitar requisições do tipo **PUT** para a URI **/receitas/{id}**.

Obs: as mesmas regras de negócio do cadastro de uma receita devem ser realizadas também na atualização dela.

# Exclusão de receita ✅

A API deve possuir um endpoint para a exclusão de uma determinada receita, sendo que ele deve aceitar requisições do tipo **DELETE** para a URI **/receitas/{id}**.

# Testes da API ✅

Os testes das funcionalidades da API podem ser realizados em algum ferramenta de testes de API, como o **Postman** ou **Insomnia**

* Postman: https://www.postman.com
* Insomnia: https://insomnia.rest

# Categorização de despesas ✅

A partir de agora toda despesa deve possui uma **categoria**, devendo esta ser uma das seguintes opções:

* Alimentação
* Saúde
* Moradia
* Transporte
* Educação
* Lazer
* Imprevistos
* Outras

Será necessário ajustar o endpoint de cadastro de despesas para receber essa nova informação.

## Regras de negócio ✅

* Ao cadastrar uma depesa, a informação da categoria é **opcional**
* Se a categoria da despesa não for informada, a API deve atribuir automaticamente a categoria **Outras** à despesa

# Busca de receitas ✅

A API deve possuir um endpoint para a busca de receitas pela **descrição**.

O endpoint deverá ser o mesmo que o utilizado para listagem de receitas, devendo este ser alterado para incluir um parâmetro chamado **descricao**.

Exemplos de como o endpoint deve funcionar a partir dessa mudança: 

* GET **/receitas** -> deve devolver todas as receitas
* GET **/receitas?descricao=xpto** -> deve devolver todas as receitas cuja descrição contenha a palavra indicada no parâmetro `descrição`

# Busca de despesas ✅

A API deve possuir um endpoint para a busca de despesas pela **descrição**.

O endpoint deverá ser o mesmo que o utilizado para listagem de despesas, devendo este ser alterado para incluir um parâmetro chamado **descricao**.

Exemplos de como o endpoint deve funcionar a partir dessa mudança:

* GET **/despesas** -> deve devolver todas as despesas
* GET **/despesas?descricao=xpto** -> deve devolver todas as despesas cuja descrição contenha a palavra indicada no parâmetro `descrição`

# Listagem de receitas por mês ✅

A API deve possuir um endpoint para a listagem de **todas** as receitas de determinado **mês**, sendo que ele deve aceitar requisições do tipo **GET** para a URI **/receitas/{ano}/{mes}**.

Os dados das receitas(descrição, valor e data) devem ser devolvidos no corpo da resposta, no formato JSON.

# Listagem de despesas por mês ✅

A API deve possuir um endpoint para a listagem de todas as despesas de determinado mês, sendo que ele deve aceitar requisições do tipo GET para a URI /despesas/{ano}/{mes}.

Os dados das despesas(descrição, valor, data e categoria) devem ser devolvidos no corpo da resposta, no formato JSON.

# Resumo do mês ✅

A API deve possuir um endpoint para detalhar o resumo de determinado **mês**, sendo que ele deve aceitar requisições do tipo **GET** para a URI **/resumo/{ano}/{mes}**.

Os dados do resumo devem ser devolvidos no corpo da resposta, no formato JSON.

##Regras de negócio

O resumo do mês deve conter as seguintes informações:

* Valor total das receitas no mês
* Valor total das despesas no mês
* Saldo final no mês
* Valor total gasto no mês em cada uma das categorias

# Testes automatizados ✅

Implemente testes automatizados dos endpoints da API, para garantir que as regras de negócio e informações devolvidas por ela estejam funcionando conforme o esperado.

# Banco de dados ✅

Para implementar o mecanismo de autenticação na API, você vai precisar alterar a estrutura do banco de dados dela, incluindo nele uma nova tabela para armazenar os dados de autenticação dos usuários.

# Autenticação ✅

A partir de agora somente usuários autenticados podem interagir com a API.

Implemente um mecanismo de autenticação na API, para que os usuários possam se autenticar e disparar requisições para ela

# Deploy ⏳

Será necessário criar uma conta, caso ainda não tenha, em algum provedor Cloud, como o [Heroku](https://www.heroku.com), para assim realizar o deploy da API nele.

Obs: você pode utilizar o Docker, caso tenha familiaridade com ele, para realizar o processo de deploy da API.
