# RITUAIS — versão 10: catálogo revisado

Catálogo enxuto de **30 estratégias distintas**, dividido entre **Para agora** e **Preventivas**, associadas aos moods pertinentes. Uma estratégia compartilhada por moods é cadastrada apenas uma vez. Não é necessário selecionar uma estratégia para concluir uma atividade.

## Uso

- **Registrar:** escolha a atividade e marque apenas o que realmente utilizou. As abas **Para agora** e **Preventivas** permitem registrar intervenções feitas em momentos diferentes. Feedback é opcional.
- **Preparar:** selecione moods, examine estratégias para agora e, se necessário, marque preventivas deliberadamente. As preventivas **não são presumidas executadas** nem incluídas na preparação sem seleção. Use **Salvar preparação** antes de executar.
- **Gerenciar estratégias permanentes:** é possível cadastrar, editar, excluir e classificar suas próprias estratégias como **Para agora** ou **Preventiva**.
- **Histórico:** tanto Registrar quanto Preparar usam o mesmo calendário, edição, exportação/importação de histórico e backup.

## Segurança de dados e atualização

1. **Exporte um Backup completo da versão instalada antes de atualizar.** Guarde o JSON fora do navegador.
2. Extraia o ZIP e substitua na raiz do repositório GitHub Pages os arquivos `index.html`, `app.js`, `styles.css`, `manifest.webmanifest` e os arquivos de ícones.
3. Recarregue o mesmo endereço da aplicação (`?v=10` evita o cache de recursos da versão anterior).

O aplicativo continua usando a chave `rituais_app_v3` e banco `schemaVersion:2`. Ao abrir após a atualização, os padrões inalterados da v9 são **arquivados**; os novos 30 são acrescentados. **Estratégias criadas pelo usuário, padrões que ele editou, personalizações de moods e registros históricos são preservados**. As estratégias antigas arquivadas deixam de aparecer nas sugestões e no gerenciador, mas permanecem nos registros já realizados. A migração é feita uma única vez, indicada por `settings.baseCatalogVersion:10`, e também ao restaurar backups antigos. Estratégias de prevenção só entram em preparações quando explicitamente marcadas.

Armazenamento local do navegador; nenhuma conta ou sincronização. Faça backups periódicos, especialmente antes de remover um atalho da tela inicial do iPhone.
