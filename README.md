# Atividades e Moods

Aplicativo web estático para escolher atividades, identificar moods, selecionar estratégias de preparação, registrar o que foi executado e guardar feedback opcional.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie **todo o conteúdo desta pasta** para a raiz do repositório: `index.html`, `styles.css`, `app.js`, `manifest.webmanifest` e `assets/icone.svg`.
3. Abra **Settings → Pages** no repositório.
4. Em **Build and deployment**, escolha **Deploy from a branch**, ramo `main`, pasta `/ (root)`; salve.
5. Aguarde o endereço `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/` ficar disponível.

Não é necessário instalar bibliotecas nem executar comandos de build.

## Dados e privacidade

- Os dados são guardados **no armazenamento local do navegador e aparelho usados**, não no GitHub e não em servidores do aplicativo.
- A instalação em outro aparelho, o uso de outro navegador, a limpeza dos dados do site ou determinadas configurações de privacidade podem tornar os registros inacessíveis.
- Em **Histórico**, use **Backup completo** regularmente. Guarde o arquivo em lugar seguro.
- **Restaurar backup** substitui os dados atuais pelo conteúdo do arquivo escolhido. Exporte um backup antes de restaurar outro arquivo.
- **Exportar histórico (JSON)** gera apenas os registros para análise; **Backup completo (JSON)** inclui os registros, os moods e todo o repertório de estratégias.
- Se abrir `index.html` diretamente como arquivo (`file://`), o comportamento de armazenamento pode variar conforme o navegador. Recomenda-se GitHub Pages (HTTPS).

## Funcionamento

- **Início:** quatro atividades em quadrados → moods → todas as estratégias correspondentes → salvar preparação → marcar as executadas → feedback opcional → finalizar.
- **Histórico:** calendário. Ao abrir, exportação e backup aparecem abaixo do calendário. Toque em um dia para ver os registros; toque no mesmo dia de novo para retornar aos botões de exportação.
- **Registro retroativo:** no calendário, use o botão `+` no cabeçalho; escolha a atividade e ajuste data e horário nos detalhes do registro.
- **Edição:** abra um registro no calendário. Todos os campos e estratégias daquele registro podem ser ajustados; registros finalizados continuam editáveis.
- **Estratégia permanente:** ao cadastrar, marque “Salvar permanentemente”. O repertório também pode ser editado pela tela de estratégias. Apagar uma estratégia do repertório não modifica registros históricos.
- **Excluir pelo X:** apenas retira a estratégia da preparação atual.

A análise de tendências não é feita dentro do aplicativo: exporte o histórico em JSON para avaliação externa.

## Tecnologia

HTML, CSS e JavaScript nativos, sem dependências externas. Armazenamento no navegador via `localStorage`.
