Para gerar o arquivo `public/css/style.min.css` é necessário instalar o pacote `sass` através do comando abaixo:

`npm i -g sass`

Em seguida, é necessário executar o comando abaixo para atualizar o arquivo `public/css/style.min.css` sempre que algum arquivo `scss` for alterado:

`npm run sass`

Para ajustar o estilo e outras configurações, de preferência, alterar o arquivo `scss/_variables.scss`. Em seguida, se ainda precisar, alterar os arquivos `scss/_xxx.scss`, `scss/navs/_xxx.scss` ou `scss/utilities/_xxx.scss`.
