# RITUAIS — versão 7

Aplicativo web estático para identificar moods, selecionar estratégias de preparação, registrar execução e guardar feedback opcional.

## Novidades da versão 7

- **Excluir registro:** Histórico → dia → registro → **Excluir registro** (na parte inferior). A exclusão exige confirmação e não modifica os outros registros ou estratégias permanentes.
- **Importar histórico (JSON):** Histórico → **Importar histórico (JSON)**, logo abaixo de **Exportar Histórico (JSON)**. Aceita arquivos produzidos por **Exportar Histórico** neste app. A importação **acrescenta** registros, ignora IDs já existentes, mantém as preferências, moods e estratégias atuais e abre o dia mais recente importado. Não restaura configurações ou repertórios.
- **Backup completo:** continua disponível para substituir integralmente os dados atuais por um backup. **Não confundir com importar histórico.**
- **Temas multicoloridos:** mantidos os sete temas anteriores, mas agora cada atividade possui acentos próprios e moods exibem variações cromáticas. Os temas escuros continuam escuros.
- **Ícone corrigido:** a marca na página inicial permanece desenhada diretamente no HTML para não depender do carregamento de uma imagem externa no Safari.

**Antes de atualizar uma instalação existente, salve um Backup completo.** Para atualizar no GitHub Pages, substitua todos os arquivos do repositório, preservando o mesmo endereço do site. A chave de armazenamento local é mantida para preservar os dados no mesmo navegador.


## Refinamento visual — segunda rodada

- Tela inicial com identidade RITUAIS e símbolo correspondente ao ícone do aplicativo.
- Ícones das atividades e dos moods com acabamento visual padronizado.
- Tela de estratégias com **Salvar preparação** e **Adicionar estratégia** acessíveis enquanto a lista rola.
- Ao retirar uma estratégia pelo X, surge **Desfazer** por sete segundos; a remoção continua restrita ao registro atual.
- Mensagens pessoais recebem tratamento visual discreto, sem mudar sua função.
- Calendário, feedback, seleção de duração e contraste dos temas foram ajustados para celular.
- O botão flutuante de temas foi removido; a paleta continua na página inicial.

## Temas da versão 7

- **Azul Clássico** — claro
- **Ônix Dourado** — escuro
- **Grafite** — escuro
- **Preto Absoluto** — escuro
- **Verde Floresta** — escuro
- **Vinho Profundo** — escuro
- **Azul Noturno** — escuro

**Ametista, Âmbar e Sálvia foram retirados.** O usuário que tinha um dos três selecionados será direcionado ao Ônix Dourado ao atualizar, sem perder registros ou personalizações. O mesmo vale para backups antigos restaurados que mencionem esses temas.

## Outras características

- visual refinado, com aparência mais premium;
- nome do app na página inicial: **RITUAIS**;
- temas de cor personalizáveis dentro do próprio app;
- ícones de instalação atualizados para GitHub Pages e tela inicial do celular;
- armazenamento local no navegador, com exportação e backup manual.

## Atualizar no GitHub Pages

1. **Antes de atualizar**, abra o aplicativo atual e use **Histórico → Backup completo**; guarde o arquivo JSON.
2. Substitua no mesmo repositório os arquivos `index.html`, `styles.css`, `app.js`, `manifest.webmanifest`, `README.md` e a pasta `assets` pelos do ZIP.
3. Mantenha o **mesmo endereço do site GitHub Pages** e o mesmo navegador para preservar o armazenamento local.
4. Aguarde a atualização do GitHub Pages e recarregue a página. Os arquivos CSS/JS usam `?v=7` nos endereços para evitar cache antigo.

## Publicar pela primeira vez

1. Crie um repositório no GitHub.
2. Envie **todo o conteúdo desta pasta** para a raiz do repositório: `index.html`, `styles.css`, `app.js`, `manifest.webmanifest`, `README.md` e a pasta `assets`.
3. Abra **Settings → Pages** no repositório.
4. Em **Build and deployment**, escolha **Deploy from a branch**, ramo `main`, pasta `/ (root)`; salve.
5. Aguarde o endereço `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/` ficar disponível.

Não é necessário instalar bibliotecas nem executar comandos de build.

## Dados e privacidade

- Os dados são guardados **no armazenamento local do navegador e aparelho usados**, não no GitHub e não em servidores do aplicativo.
- A instalação em outro aparelho, o uso de outro navegador, a limpeza dos dados do site ou determinadas configurações de privacidade podem tornar os registros inacessíveis.
- Em **Histórico**, use **Backup completo** regularmente. Guarde o arquivo em lugar seguro.
- **Restaurar backup** substitui os dados atuais pelo conteúdo do arquivo escolhido. Exporte um backup antes de restaurar outro arquivo.
- **Exportar histórico (JSON)** gera apenas os registros para análise; **Backup completo (JSON)** inclui os registros, os moods e todo o repertório de estratégias, além do tema selecionado.
- Se abrir `index.html` diretamente como arquivo (`file://`), o comportamento de armazenamento pode variar conforme o navegador. Recomenda-se GitHub Pages (HTTPS).

## Funcionamento

- **Início:** quatro atividades em quadrados → moods → todas as estratégias correspondentes → salvar preparação → marcar as executadas → feedback opcional → finalizar.
- **Temas:** botão de paleta na página inicial para trocar as cores do aplicativo.
- **Histórico:** calendário. Ao abrir, exportação, importação de histórico e backup aparecem abaixo do calendário. Toque em um dia para ver os registros; toque no mesmo dia de novo para retornar às opções de exportação, importação e backup.
- **Registro retroativo:** no calendário, use o botão `+` no cabeçalho; escolha a atividade e ajuste data e horário nos detalhes do registro.
- **Edição:** abra um registro no calendário. Todos os campos e estratégias daquele registro podem ser ajustados; registros finalizados continuam editáveis.
- **Estratégia permanente:** ao cadastrar, marque “Salvar permanentemente”. O repertório também pode ser editado pela tela de estratégias. Apagar uma estratégia do repertório não modifica registros históricos.
- **Excluir pelo X:** apenas retira a estratégia da preparação atual.

A análise de tendências não é feita dentro do aplicativo: exporte o histórico em JSON para avaliação externa.

## Tecnologia

HTML, CSS e JavaScript nativos, sem dependências externas. Armazenamento no navegador via `localStorage`.


## Correção v4 — Símbolo ao lado do nome

O símbolo ao lado de **RITUAIS** agora é desenhado diretamente na página (SVG integrado), sem depender da imagem `assets/icone.svg`. Isso elimina a interrogação/ícone de imagem quebrada no Safari quando o arquivo não é carregado. Os ícones de instalação continuam na pasta `assets`.

Substitua todos os arquivos do repositório pelos arquivos desta versão, mantendo o mesmo endereço do GitHub Pages. Antes da atualização, faça Backup completo.


## Atualização do ícone no iPhone

Se o atalho antigo na tela inicial do iPhone continuar mostrando o ícone anterior, apague o atalho antigo e adicione o RITUAIS novamente à tela inicial. O Safari pode manter o ícone anterior em cache mesmo após a atualização dos arquivos no GitHub Pages.


## Como confirmar que a versão 7 foi publicada

1. No repositório GitHub, abra `README.md`: o título deve mostrar **RITUAIS — versão 7**.
2. Abra `index.html` no GitHub: as referências devem ser `styles.css?v=7` e `app.js?v=7`.
3. Após atualizar o GitHub Pages, abra o site no Safari adicionando `?v=7` ao final do endereço da página.
4. Dentro do aplicativo, abra a paleta de cores: deverá aparecer **RITUAIS · versão 7**.
5. Se o ícone do atalho do iPhone não atualizar, remova o atalho antigo da tela inicial e adicione novamente pelo Safari. O ícone mudou de caminho para `assets/rituais-iphone-v7.png` para evitar o cache anterior.

**Importante:** não envie apenas o arquivo ZIP ao repositório. Extraia o ZIP e substitua **todos os arquivos e a pasta `assets`** na raiz do repositório. As mudanças de aparência não alteram o armazenamento local do aplicativo, mas faça antes um backup completo.
