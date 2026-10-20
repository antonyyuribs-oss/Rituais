# RITUAIS

Aplicativo web estático para identificar moods, selecionar estratégias de preparação, registrar execução e guardar feedback opcional.

## Refinamento visual — segunda rodada

- Tela inicial com identidade RITUAIS e símbolo correspondente ao ícone do aplicativo.
- Ícones das atividades e dos moods com acabamento visual padronizado.
- Tela de estratégias com **Salvar preparação** e **Adicionar estratégia** acessíveis enquanto a lista rola.
- Ao retirar uma estratégia pelo X, surge **Desfazer** por sete segundos; a remoção continua restrita ao registro atual.
- Mensagens pessoais recebem tratamento visual discreto, sem mudar sua função.
- Calendário, feedback, seleção de duração e contraste dos temas foram ajustados para celular.
- O botão flutuante de temas foi removido; a paleta continua na página inicial.

## Temas desta versão

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
4. Aguarde a atualização do GitHub Pages e recarregue a página. Os arquivos CSS/JS usam uma nova versão no endereço para evitar cache antigo.

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
- **Histórico:** calendário. Ao abrir, exportação e backup aparecem abaixo do calendário. Toque em um dia para ver os registros; toque no mesmo dia de novo para retornar aos botões de exportação.
- **Registro retroativo:** no calendário, use o botão `+` no cabeçalho; escolha a atividade e ajuste data e horário nos detalhes do registro.
- **Edição:** abra um registro no calendário. Todos os campos e estratégias daquele registro podem ser ajustados; registros finalizados continuam editáveis.
- **Estratégia permanente:** ao cadastrar, marque “Salvar permanentemente”. O repertório também pode ser editado pela tela de estratégias. Apagar uma estratégia do repertório não modifica registros históricos.
- **Excluir pelo X:** apenas retira a estratégia da preparação atual.

A análise de tendências não é feita dentro do aplicativo: exporte o histórico em JSON para avaliação externa.

## Tecnologia

HTML, CSS e JavaScript nativos, sem dependências externas. Armazenamento no navegador via `localStorage`.
