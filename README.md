# 🥥 CocoTube

Plataforma experimental de vídeos com interface responsiva, player incorporado do YouTube e editor local de Shorts.

## Publicação

O projeto usa GitHub Pages e não precisa de etapa de build.

1. Abra **Settings → Pages** no repositório.
2. Em **Build and deployment**, escolha **Deploy from a branch**.
3. Selecione a branch `main` e a pasta `/ (root)`.
4. Salve e aguarde a publicação.

Endereço: https://zezeanima7-create.github.io/Cocotube/

## Recursos atuais

- Layout adaptado para celular, tablet e computador.
- Navegação inferior no celular e menu lateral em telas maiores.
- Pesquisa e filtros por categoria.
- Player com vídeos de demonstração incorporados do YouTube.
- Histórico, curtidas, inscrições, comentários e lista "Assistir mais tarde" salvos no navegador deste dispositivo.
- Editor local de Shorts com seleção de vídeo, texto sobreposto, filtros e exportação WebM, conforme o suporte do navegador.
- Estrutura preparada para autenticação e publicação de Shorts com Supabase.

## Configurar Supabase (opcional)

O cadastro real, o login e a publicação de Shorts ainda dependem de um projeto Supabase próprio.

1. Crie um projeto Supabase para o CocoTube.
2. Em **Project Settings → API**, copie a Project URL e a chave **publishable** (ou a chave anon legada).
3. Preencha `assets/js/config.js` com esses dois valores.
4. No SQL Editor do Supabase, execute todo o arquivo `supabase/setup.sql`.
5. Em **Authentication → URL Configuration**, adicione o endereço do GitHub Pages às Redirect URLs.

Nunca coloque uma chave `service_role` ou uma chave secreta no código do navegador.

## Limitações importantes

- GitHub Pages hospeda apenas os arquivos do site; não fornece banco de dados, login ou armazenamento de vídeos.
- Sem Supabase configurado, o botão de login informa que a autenticação não está ativa e a publicação de Shorts não fica disponível.
- Os vídeos da página inicial são demonstrações incorporadas do YouTube, não arquivos hospedados pelo CocoTube.
- Dados locais (histórico, curtidas, inscrições e comentários) ficam apenas no navegador e dispositivo em que foram criados.
- A exportação de vídeo depende dos codecs e recursos de gravação disponíveis no navegador. O Chrome atualizado costuma oferecer a melhor compatibilidade em Android.
- Publique somente vídeos que você tenha direito de usar.
