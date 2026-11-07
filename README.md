# 🥥 CocoTube

Uma interface de plataforma de vídeos inspirada em serviços de compartilhamento de vídeo, feita com HTML, CSS e JavaScript puro.

## Publicar no GitHub Pages

1. Abra **Settings** do repositório.
2. Entre em **Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/ (root)).
5. Salve e aguarde a publicação.

O endereço será `https://SEU-USUARIO.github.io/Cocotube/`.

## Funcionalidades atuais

- Página inicial, busca e filtros por categoria.
- Navegação responsiva para celular.
- Player de vídeos incorporados do YouTube.
- Área de Shorts demonstrativa.
- Histórico, curtidas, favoritos e inscrições salvos no `localStorage`.
- Comentários locais no navegador.
- Página demonstrativa do canal.

## Limitações importantes

Esta versão é um **front-end estático**. Os vídeos são incorporados do YouTube; eles não são enviados nem armazenados pelo CocoTube. Curtidas, comentários, histórico e inscrições ficam apenas no navegador/dispositivo atual. Não existe autenticação, sincronização entre usuários, upload real, armazenamento de mídia ou moderação no servidor.

Para transformar o CocoTube em uma plataforma multiusuário, será necessário adicionar um backend, autenticação, banco de dados, armazenamento de arquivos, regras de segurança, moderação e infraestrutura de vídeo. GitHub Pages sozinho não oferece esses serviços.

## Estrutura

```
Cocotube/
├── index.html
├── README.md
└── assets/
    ├── coconut.svg
    ├── css/
    │   └── style.css
    └── js/
        └── app.js
```
