<h1 align="center">Simulador de Empréstimos Caixa</h1>

## Descrição

Aplicativo desenvolvido para participação no HackCaixa 2023.
Por meio desse aplicativo qualquer pessoa ou sistema pode descobrir quais são as condições oferecidas para uma negociação

## Telas

## Tecnologias utilizadas

- Ionic 7;
- Angular 16;
- Rxjs 7;

  A escolha do Ionic se justifica pelo fato de ter suporte para o framework utilizando internamente na VITEC (Angular) e já homologado pela área de arquitetura responsável.

  Além disso, há uma clara vantagem em relação aos demais modos de desenvolvimento mobile, pois pode-se aproveitar o conhecimento já adquirido pelos desenvolvedores.

  Outra vantagem em relação aos aplicativos nativos desenvolvidos em Java (Android) ou Swift (Apple) é que um único projeto pode gerar aplicativos para as 2 plataformas, reduzindo de 2 para 1 a quantidade de equipes de desenvolvimento.

  Além disso também é possível gerar o aplicativo web do mesmo projeto se fazendo ajustes no layout.

  Não foi o foco desse projeto construir uma aplicação web, porém mesmo assim ela ainda funciona com o layout não adaptado.

## Rodando o projeto

Para rodar o projeto devem ser seguidos os passos a seguir:

- Instalar o NodeJS.

  Caso não tenha instalado ainda, as instruções e os arquivos para instalação podem ser obtidos na página oficial [https://nodejs.org](https://nodejs.org/pt-br/download).

- Instalar o pacote @ionic/cli globalmente.

  Para isso execute o comando a seguir no seu terminal.

  ```
  npm install -g @ionic/cli
  ```

- Instalar as dependências do projeto.

  Abra a pasta do projeto no terminal e digite o comando a seguir:

  ```
  npm install
  ```

- Executar o projeto.

  Para compilar e executar o projeto abra a pasta do projeto no terminal e digite o comando a seguir:

  ```
  ionic serve
  ```

- Visualizar o projeto

  Sugerimos Caso o browser não tenha sido aberto automaticamente com a execução do passo anterior, abra seu browser e acesse o endereço [http://localhost:8100](http://localhost:8100). a utilização do browser Chrome ou Edge para visualizar o projeto. Como se trata de um aplicativo mobile é necessário ativar a emulação mobile no browser. Se você não sabe como fazer isso, as instruções específicas de cada browser estão disponíveis na página do [ionic](https://ionicframework.com/docs/developing/previewing)

## Observações

- Na parte final do projeto há uma tela que permite o usuário preencher um formulário e enviar as informações manifestando o interesse no empréstimo. Como não havia endpoint disponível para gravar as informações, foi feito um mock do serviço e logada no console as informações que seriam enviadas via post para o endpoint. Os dados contem as informações do usuário (nome, cpf, telefone, meio - whatsapp ou telefone - e horario de contato preferidos), o tipo de amortização selecionado - price ou sac - além dos dados retornados pelo endpoint disponibilizado para desenvolvimento do projeto. Essas informações podem ser adicionadas ao EventHub do Azure e depois enviadas para tratamento pelas áreas responsáveis pelo relacionamento com o cliente.

## Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="http://github.com/n0n3br">
        <img src="https://avatars.githubusercontent.com/u/371808?v=4" width="100px;" alt="Foto de Rogério Luiz Aques de Amorim no GitHub"/><br>
        <sub>
          <b>Rogério Luiz Aques de Amorilm</b><br/>
          <a href='mailto:rogerio.amorim@caixa.gov.br'>rogerio.amorim@caixa.gov.br</a>
        </sub>
      </a>
    </td>
  </tr>
</table>
