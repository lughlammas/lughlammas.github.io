# Manutenção — lughlammas.github.io (ARBOCK LABS)

Responsável: **Guilherme Cavalcanti**. Site estático da ARBOCK LABS — Independent Software & Applied AI Studio. Este guia é para quem for manter o site. Todos os comandos rodam na raiz deste repositório.

## Estrutura
- **Inglês na raiz** e **português espelhado em `/pt/`**, com os mesmos slugs:
  `/`, `/services/`, `/work/`, `/work/flowdesk/`, `/work/comercial-template/`, `/work/sherlock/`, `/methodology/`, `/about/`, `/contact/` (e `/pt/...`).
- Cada rota é uma pasta com `index.html`. O `404.html` bilíngue fica na raiz e tem `noindex`.
- `styles.css` e `main.js` ficam na raiz e são compartilhados por todas as páginas.
- `favicon.svg` e `favicon.ico` (16/32/48, fallback) ficam na raiz, com dois `<link rel="icon">` em cada página.
- A home mantém as âncoras antigas: `#topo #on-demand #linguas #como #caso #flagship #projetos #oferta #formacao`. Não remova nenhuma.
- `.github/workflows/sprint001-check.yml` é um CI só de verificação (links e HTML), sem deploy. `.htmlvalidate.json` traz as regras do html-validate.

## Editar uma página
1. Crie um branch a partir de main: `git fetch origin && git checkout -b sprint<NNN>/<tema> origin/main`.
2. Edite `<rota>/index.html` **e** o espelho `pt/<rota>/index.html`.
3. Mantenha em cada página:
   - `lang` correto (`en` ou `pt-BR`);
   - `<link rel="canonical">` absoluto para a própria rota em `https://lughlammas.github.io`;
   - `hreflang` `en`, `pt-BR` e `x-default` (= EN), recíprocos entre as duas versões;
   - um único `h1`, o skip link para `#main` e os dois `<link rel="icon">`.
4. Âncoras e alvos de foco usam `scroll-margin-top` com a variável `--scroll-offset` (hoje 73px = altura do header + 1px de borda + 1rem). Se a altura do header mudar, ajuste `--scroll-offset` em `styles.css`.
5. Página nova: crie a pasta nos dois idiomas, inclua no menu dos dois e atualize os hreflang.
6. Rode o preview e o CI local (abaixo) antes do commit.

## Preview local
```bash
python3 -m http.server 8080 --bind 127.0.0.1
# abra http://127.0.0.1:8080/  (Ctrl+C para parar)
curl -I http://127.0.0.1:8080/ http://127.0.0.1:8080/pt/
```
Limitação: o servidor local devolve o 404 padrão do Python para rotas desconhecidas. O `404.html` próprio só é servido pelo GitHub Pages.

## CI local (o mesmo check do workflow)
```bash
lychee --offline --include-fragments --no-progress --root-dir "$PWD" './**/*.html'   # links internos e âncoras
npx --yes html-validate@9 '**/*.html'                                                # HTML
```
- lychee: binário em https://github.com/lycheeverse/lychee/releases (repositório público no GitHub).
- html-validate: via npx, com Node 20.
- No GitHub, o workflow roda em push dos branches `sprint001/**` e `sprint002/**` e em pull requests para `main`, com `permissions: contents: read`. Acompanhe com `gh run list -R lughlammas/lughlammas.github.io`.

## Publicação
- GitHub Pages em modo **legacy**, publicando **`main:/`** (sem build e sem Actions de deploy). Conferir com:
  `gh api repos/lughlammas/lughlammas.github.io/pages`. O esperado é `"build_type":"legacy"` e `"source":{"branch":"main","path":"/"}`.
- **Todo merge em `main` publica na hora.** Não há ambiente de staging.
- Todo arquivo versionado na raiz vira público (não há `_config.yml` com `exclude`). Não versione notas internas, logs nem rascunhos.

## Política de branch
- Trabalho em `sprint*/...` → Pull Request para `main` → **merge só com aprovação do Guilherme Cavalcanti**.
- Nada de push direto, force-push ou reescrita de histórico em `main`. A única exceção é o revert de emergência descrito abaixo.

## Rollback
Sempre por `git revert` (commit novo). Nunca por `push --force` nem `reset --hard` em main.

**Referência atual:** o redesign entrou em `main` pelo PR #1, merge commit `688ad63ba7552353a3dee1680d45c41ebdac5c2a`. O estado anterior ao merge é `d31050988656ecba56f4bf62481f8b676052f96b`. Para desfazer o redesign, `<merge>` = `688ad63ba7552353a3dee1680d45c41ebdac5c2a` e `<sha-anterior-ao-merge>` = `d31050988656ecba56f4bf62481f8b676052f96b`.

**Padrão: via PR.**
```bash
git fetch origin
git checkout -b revert/<descrição> origin/main
git log --oneline -5 origin/main                 # identifique o <merge> a desfazer
git revert -m 1 <merge> --no-edit                # -m 1 mantém o lado de main anterior ao merge
git diff <sha-anterior-ao-merge> --stat          # deve sair vazio se todo o merge foi desfeito
git push origin revert/<descrição>
gh pr create -R lughlammas/lughlammas.github.io --base main --head revert/<descrição> \
  --title "Revert <descrição>" --body "Motivo, <merge> revertido e verificação."
```
O merge do PR de revert também só acontece com a aprovação do Guilherme Cavalcanti. Se o PR original entrou por squash, use `git revert <sha-do-squash> --no-edit`, sem `-m 1`.

**Emergência (site quebrado em produção):** revert direto na main **só com aprovação explícita do Guilherme Cavalcanti**, registrada no PR ou na issue do incidente (quem aprovou, quando e qual `<merge>` foi revertido):
```bash
git fetch origin && git checkout main && git pull --ff-only
git revert -m 1 <merge> --no-edit
git push origin main
```

**Verificação depois do rollback ou de qualquer publicação:**
```bash
gh run list -R lughlammas/lughlammas.github.io -w pages-build-deployment -L 1 --json headSha,conclusion   # conclusion success e headSha = SHA esperado
gh api repos/lughlammas/lughlammas.github.io/pages                             # status built, legacy, main:/
curl -I https://lughlammas.github.io/
curl -I https://lughlammas.github.io/pt/
curl -I https://lughlammas.github.io/services/
curl -I https://lughlammas.github.io/work/
curl -I https://lughlammas.github.io/contact/
curl -s -o /dev/null -w '%{http_code}\n' https://lughlammas.github.io/rota-inexistente/   # 404
curl -s https://lughlammas.github.io/rota-inexistente/ | grep -c '<h1>Page not found</h1>'   # 1 = página 404 própria no corpo
```

## Recheck depois de publicar
- As rotas principais (EN e PT) respondem 200 (`curl -I`, acima).
- Em cada página, canonical = a própria URL, e hreflang `en`, `pt-BR` e `x-default` apontam para o par certo:
  `curl -s https://lughlammas.github.io/work/ | grep -E 'rel="(canonical|alternate)"'`
- Uma rota inexistente devolve 404 com a página 404 bilíngue.
- As 9 âncoras antigas existem em `/`: `curl -s https://lughlammas.github.io/ | grep -oE 'id="(topo|on-demand|linguas|como|caso|flagship|projetos|oferta|formacao)"'` (9 linhas).
- `curl -I https://lughlammas.github.io/favicon.ico` e `/favicon.svg` dão 200.
- Links online, sem o modo offline: `lychee --include-fragments --no-progress https://lughlammas.github.io/ https://lughlammas.github.io/pt/` com 0 erros.

## Dependências
- **Nenhuma dependência de build ou de runtime.** HTML, CSS e JS puros.
- Só para verificar (opcional): Python 3 (preview), lychee e Node/npx (html-validate), gh e curl. Tudo gratuito.

## Limitações conhecidas
- **Contato:** após o merge deste PR, o site exibirá `lughlammas@gmail.com` nas páginas EN e PT. O link abre o aplicativo de e-mail do visitante; não há formulário nem prazo de resposta garantido.
- **FLOWDESK:** o MVP reconstruído está em `https://flowdesk.guilhermusico.workers.dev/`, com código privado em `lughlammas/flowdesk`. O código original da Sprint 001 não foi recuperado. As sugestões são por regras, sem modelo de IA; os testes antigos (94/94 e 64/64) não se aplicam ao MVP reconstruído. Após o merge, verificar o CTA e as descrições EN/PT no site público.
- Sem domínio próprio: o endereço é `https://lughlammas.github.io/`.
- A API do Pages mostra `custom_404: true` desde a publicação do redesign. Mesmo assim, confira o `404.html` depois de cada publicação.
- Método de trabalho: desenvolvimento dirigido por humano e assistido por IA ("human-directed AI-assisted development").
