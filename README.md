## <span style="color: rgb(59, 59, 59);;">Getting Started with Text2Sound Node App</span>
<hr>
##### text2sound armazena comentários que posteriormente podem  ser convertidos em fala
- Os comentários são armazenados em um banco de dados remoto. 
- Somente os 8 comentários mais recentes são armazenados.

![Interface do text2sound](./assets/interface.png)


##### Instalação na máquina local
No terminlal
1. clonar o repositório
```shell
git clone https://github.com/luisfellipe/text2sound.git`
```
2. Abrir a pasta text2sound e instalar as dependências
```shell
cd text2sound
npm install
```
3. Apos instaladas as dependências execute a aplicação
 <h5>
```shell 
npm start
```
</h5> 
4. No navegador acesse a aplicação pelo url
```http://localhost:8082```.

#### Mais Configurações
A porta de acesso pode ser alterada no arquivo `./env.js`
 ```node
const env = {
    port:8082
}
module.exports = env;
```

As configurações para acesso ao banco de dados estão no arquivo `./db/config.js`.
````node
// mysql://b55cc638e160a7:90e79e27@us-cdbr-east-03.cleardb.com/heroku_a249664013e9f5c?reconnect=true
const HOST =  "us-cdbr-east-03.cleardb.com";
const USER =  "b55cc638e160a7";
const PASSWORD = "90e79e27";
const DATA_BASE = "heroku_a249664013e9f5c";
const PORT = 3306;

const config = {
    user    : USER,
    password: PASSWORD,
    database: DATA_BASE,
    host    : HOST,
    port    : PORT
}
module.exports = config;
````

Banco de dados utilizado:

````sql

CREATE DATABASE IF NOT EXISTS db;

CREATE TABLE IF NOT EXISTS comments(
    id INT NOT NULL auto_increment PRIMARY KEY,
    comment_text VARCHAR(250)
);
````

O ibm-watson Text to Speech plano lite, é gratis e limitado a 10000 cacracteres. Caso a api não responda mais, será necessario criar um novo plano lite.

#### Tutorial Rápido

1. Crie ou faça Login na sua conta IBM Cloud <br>
![Tela de Login](./assets/1.png)

<br>

2. No Campo de busca difite `Text To Speech` e selecione a opção que aparecer <br>
![Interface do text2sound](./assets/2.png)

<br>

3. Escolha o Servidor <br>
![Interface do text2sound](./assets/3.png)

<br>

4. Se preferir renomeie o serviço <br>
![Interface do text2sound](./assets/4.png)

<br>

5. Copie as chaves e a URL necessaria para acessar o TTS 
![Interface do text2sound](./assets/5.png)

<br>

Ao ativar o servico sera gerada uma `url` e uma `apikey` nas credenciais do serviço:


no arquivo `./src/speech.js` substitua as informações antigas pelas novas:

```` node
// api access key
const key = 'nova apikey';
// api acess url
const url = 'nova url';

````
[Dicas e sugestões?] envie um email para `felipealvesoares@gmail.com`