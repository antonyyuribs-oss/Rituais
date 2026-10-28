# RITUAIS v13 — Briefing Diário + catálogo Goggins + infraestrutura Web Push

Versão pronta para publicar como aplicativo estático no GitHub Pages **e** preparada para a integração de notificações via Supabase. **O push não funciona até configurar um projeto Supabase, implantar a Edge Function e permitir as notificações no iPhone.** O pacote não contém credenciais privadas, e nada foi implantado em uma conta externa automaticamente.

## 1. Antes de atualizar

1. Abra a versão atual no **mesmo navegador/iPhone** onde estão seus dados e escolha **Backup completo**. Guarde o JSON.
2. Publique **os arquivos da raiz do ZIP** na raiz do repositório GitHub Pages, substituindo `index.html`, `app.js`, `styles.css`, ícones e manifesto. Inclua também os novos `push-config.js`, `notifications.js` e `sw.js`.
3. Não é obrigatório publicar o diretório `supabase/` nem `scripts/` no GitHub Pages: eles servem para configurar a infraestrutura externa.
4. Atualize o app da tela inicial e verifique **Início → Briefing Diário**. Caso o iPhone mantenha a versão antiga, abra pelo Safari, atualize e, se necessário, remova apenas o atalho antigo da Tela de Início e adicione o mesmo endereço novamente; **não apague dados do Safari antes de exportar o backup**.

## 2. O que entrou na v13

- **72 rituais preparatórios** consolidados: 34 inspirados em ferramentas Goggins, 38 práticos. Frases de confronto são metadados de cada estratégia, não itens duplicados.
- **Migração preservadora** de v9–v12: apenas sugestões padrão v12 ainda inalteradas são desativadas; edições pessoais, estratégias próprias e *snapshots* dos registros antigos continuam no navegador. Os moods antigos não são apagados; são adicionados Cansado, Desmotivado e Disposto ao Sono para atender à matriz mais recente.
- **Briefing Diário**: quatro atividades numa página; moods opcionais; seleção de estratégias por mood ou biblioteca completa; horário opcional; opção de notificar; marcar estratégia efetivamente executada; indicar se atividade foi realizada; resumo operacional e **Encerrar missão**, que pode ser revertido.
- **Último registro** separado para cada atividade: data/hora, moods, estratégia executada ou não, avaliação de utilidade e resultado; opção **Reutilizar estratégias** dessa atividade, sem repetir plano inteiro (funcionalidade rejeitada).
- **Histórico da estratégia**: número de execuções registradas e avaliações de utilidade. Não indica causalidade ou prova de eficácia.
- **Sono da última noite**: inserção opcional de horas e qualidade (1–5); não é inferido da higiene do sono.
- **Registro rápido / Preparar / Histórico / temas / backups** mantidos. O Briefing salva seu planejamento separado dos registros; quando você marca estratégia ou resultado, cria ou atualiza um registro próprio no Histórico.

**Limitação de dados**: o RITUAIS mantém todos os dados pessoais de registros no `localStorage` deste navegador (chave `rituais_app_v3`). Ainda não sincroniza conteúdo entre dispositivos. Fazer backups regulares continua importante.

## 3. Ativar Web Push no iPhone — requer conta e configuração

### Requisitos

- iPhone com iOS **16.4 ou posterior**.
- Abrir o site por **HTTPS** e adicionar o RITUAIS à **Tela de Início**. Abrir o aplicativo pelo ícone instalado.
- Aceitar a permissão de notificação ao tocar **Ativar notificações** no Briefing Diário (não é permitida solicitação silenciosa).
- Rede e serviços push disponíveis; o recebimento não é garantido em todos os estados de conectividade. O agendador verifica lembretes a cada minuto: os avisos podem ter atraso.

### A. Criar projeto Supabase

1. Crie um projeto em <https://supabase.com/> e abra o Dashboard.
2. Em **Authentication → Providers / Sign In**, ative **Anonymous Sign-Ins**. Este modelo usa um identificador anônimo por dispositivo, sem exigir email. Se apagar dados locais, poderá perder essa identidade e precisará autorizar novamente.
3. No **SQL Editor**, execute `supabase/migrations/20261028_rituais_push.sql`. Isso cria duas tabelas (`push_subscriptions` e `push_reminders`) com **Row Level Security**: cada usuário anônimo acessa apenas suas linhas.
4. Ative `pg_cron` e `pg_net` em **Database → Extensions**.

### B. Gerar e guardar chaves

1. No computador com Node.js, rode `node scripts/generate-vapid.mjs` **uma única vez**.
2. **PUBLIC_KEY** pode ser publicada; **PRIVATE_KEY deve ficar somente no Supabase**. Não salve a chave privada no GitHub ou no navegador.
3. Defina um segredo aleatório forte `RITUAIS_CRON_SECRET` (por exemplo, gerado com `openssl rand -hex 32`).
4. Com o **Supabase CLI** conectado ao seu projeto, configure segredos, substituindo os valores:

```bash
supabase login
supabase link --project-ref SEU_PROJECT_REF
supabase secrets set VAPID_PUBLIC_KEY="SUA_CHAVE_PUBLICA" VAPID_PRIVATE_KEY="SUA_CHAVE_PRIVADA" VAPID_SUBJECT="mailto:seu-email@example.com" RITUAIS_CRON_SECRET="SEU_SEGREDO_CRON_FORTE"
supabase functions deploy send-ritual-push
```

`VAPID_SUBJECT` deve identificar o administrador, por exemplo, um endereço de e-mail válido do responsável. As credenciais nativas `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` são acessadas SOMENTE na Edge Function.

### C. Programar o disparo

Edite os dois valores em `supabase/CONFIGURAR_AGENDAMENTO.sql` (URL real e **mesmo** `RITUAIS_CRON_SECRET`), depois execute o arquivo no SQL Editor do Supabase. Ele cria o `cron` a cada minuto e guarda URL e segredo no Vault.

### D. Configurar o site

Edite **somente** o arquivo `push-config.js` no repositório GitHub com:

- `supabaseUrl`: URL do projeto, por exemplo `https://SEU-PROJETO.supabase.co`.
- `publishableKey`: chave **pública** publishable (ou chave anon pública legada) fornecida pelo Supabase.
- `vapidPublicKey`: a **mesma chave pública VAPID** usada no servidor.

**Nunca coloque `service_role`, chave privada VAPID ou segredo cron em `push-config.js`**, no repositório, no JavaScript ou em qualquer arquivo publicado pelo GitHub Pages.

### E. Teste real no iPhone

1. Abra o RITUAIS **pelo ícone da Tela de Início** e clique em **Briefing Diário → Ativar notificações**.
2. Selecione uma estratégia, defina um horário 3–5 minutos no futuro e marque **Avisar**.
3. Feche o RITUAIS (sem apagar seus dados), mantenha internet ativa e observe se a notificação chega.
4. Toque na notificação. Ela abre o Briefing, na atividade e estratégia correspondentes. É possível marcar **Executada** ou usar **Adiar 15 min**.
5. Se não chegar, confira Dashboard → Functions → Logs, a tabela `push_reminders`, `cron.job_run_details`, permissão do iOS e a inscrição `push_subscriptions`.

### Segurança e privacidade

Os **registros pessoais completos, notas, moods e backup não são enviados ao Supabase**. Para permitir o envio, o servidor recebe somente o **texto da estratégia agendada**, seu horário em UTC, tipo de atividade e a assinatura técnica de envio do dispositivo. O banco possui RLS para clientes e a função de envio só aceita chamadas autenticadas pelo segredo de agendamento.

### O que é limitado

- O envio exige conexão com a internet e que a assinatura Web Push continue válida.
- O agendamento ocorre com resolução aproximada de um minuto, sem garantia de pontualidade exata do sistema operacional.
- O perfil Supabase anônimo vale para um navegador/dispositivo. Não é um mecanismo de sincronização multiaparelho.
- **Não foi executado teste real de push em iPhone nem deploy real no seu GitHub/Supabase** neste ambiente. Eles exigem suas contas e permissões.

## 4. Testes efetuados durante a construção

- Verificação de sintaxe de `app.js`, `notifications.js` e `sw.js`.
- Navegador Chromium isolado: abertura do Briefing; quatro atividades simultâneas; mood; seleção; agendamento opcional; marcar executada; atualização do Histórico; resultado; último registro; encerramento da missão; navegação para Histórico.
- Migração com dados simulados da v12: **72 estratégias novas ativas**, texto histórico antigo mantido, estratégia pessoal mantida e adição dos moods de Sono faltantes.
- O servidor Supabase e o recebimento real de Web Push ainda precisam de validação em ambiente conectado.
