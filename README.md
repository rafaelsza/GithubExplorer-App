# Github Explorer App

Aplicativo mobile desenvolvido para estudo e prática do já aprendi durante o bootcamp GoStack.

### Funcionalidades:

- Buscar dados de repositórios consumindo a API do Github.
- Incluir, remover e listar os repositórios já pesquisados.
- Na tela de detalhes do repositório tem informações como número de estrelas, número de forks, e número de issues, contando também com uma lista de issues abertas.

### Utilizado:

- **React**, **React Native**, **TypeScript**.
- **styled-components**: estilizar componentes com CSS.
- **react-native-vector-icons**: pacote de ícones.
- **react-navigation**: criar navegação entre as telas.
- **react-native-community/async-storage**: salvar os repositórios já pesquisados em um histórico local.
- **react-native-uuid**: gerar ID's únicos e aleatórios.
- **axios**: para realizar a conexão com a API do Github.
- **Android Studio e dependências**: para utilizar um emulador Android.

### Screenshots:

![GithubExplorerApp](https://github.com/rafaelsza/template-readme/blob/master/assets-repositories/github-explorer-app.png)

## Para utilizar em sua máquina:

**Necessário ter instalado o
[NodeJS](https://nodejs.org/en/download) e um ambiente de desenvolvimento mobile configurado para utilização de emulador.**

> No projeto foi utilizado o
[yarn](https://yarnpkg.com/getting-started/install)
como gerenciador de pacotes, mas caso queira utilizar o npm basta substituír os comandos que começam com yarn por npm.

> No projeto foi utilizado o
[Android SDK](https://developer.android.com/studio)
para utilização de um emulador Android, mas você pode utilizar o que for de sua preferência, incluindo ambiente para desenvolvimento iOS.

Clone o projeto:
```
git clone https://github.com/rafaelsza/GithubExplorer-App.git
```

Entrar na pasta raíz:
```
cd GithubExplorer-App
```

Então executar yarn para instalar as dependências do projeto:
```
yarn
```

Agora execute (com o emulador aberto):

Android:
```
yarn android
```

iOS:
```
yarn ios
```

Pronto! O app já estará rodando em seu emulador.
