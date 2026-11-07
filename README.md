# 🥥 CocoTube

Frontend estático de uma plataforma de vídeos, com editor de Shorts no navegador e integração opcional com Supabase.

## Publicar no GitHub Pages

1. Abra **Settings → Pages**.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha branch `main` e pasta `/ (root)`.
4. Salve e aguarde o deploy.

URL: `https://zezeanima7-create.github.io/Cocotube/`

## Recursos

- Interface responsiva para desktop e celular.
- Pesquisa, categorias, histórico, curtidas, favoritos e inscrições locais.
- Player de vídeos do YouTube por incorporação.
- Cadastro/login por Supabase Auth (após configurar as chaves).
- Editor de Shorts com vídeo local, texto sobreposto, filtros (vibrante, quente, frio, P&B, retrô e suave) e exportação WebM.
- Publicação de Shorts em Supabase Storage e listagem pública, após configurar o backend.

## Configurar autenticação e publicação real

1. Crie um projeto Supabase próprio para o CocoTube.
2. Em Project Settings → API, copie a Project URL e a chave **publishable** (ou anon legada).
3. Edite `assets/js/config.js` e preencha os dois valores. Não publique a chave `service_role` ou uma chave secreta.
4. Abra o SQL Editor do Supabase e execute todo o arquivo `supabase/setup.sql`.
5. Em Authentication → URL Configuration, configure a Site URL para a URL do GitHub Pages e adicione-a às Redirect URLs.
6. Configure confirmação de e-mail em Authentication conforme sua preferência.

O arquivo `config.js` contém apenas a chave pública do cliente. As políticas RLS do SQL restringem criação, alteração e remoção dos Shorts ao dono autenticado. Os arquivos de vídeo são públicos para reprodução depois de publicados.

## Editor de Shorts

- Selecione um vídeo local de até 150 MB e 3 minutos.
- Adicione texto e escolha um filtro.
- Exporte como WebM pelo navegador.
- Para publicar no feed, configure Supabase e entre na conta.

A exportação usa MediaRecorder e canvas; Chrome/Android atualizado é recomendado. O suporte a codecs pode variar por aparelho. Os arquivos selecionados são processados localmente antes do upload.

## Limitações

GitHub Pages é hospedagem estática. O banco, autenticação e armazenamento de mídia são fornecidos pelo Supabase. O CocoTube não baixa nem copia vídeos de terceiros: os vídeos de exemplo são players incorporados do YouTube. Use apenas vídeos que você tenha direito de publicar.
