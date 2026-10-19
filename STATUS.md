# STATUS — AGENT 04 Frontend (Luna) · Sprint 001 · branch sprint001/redesign

## Feito
- 9 rotas EN na raiz (/, /services/, /work/, /work/flowdesk/, /work/comercial-template/, /work/sherlock/, /methodology/, /about/, /contact/) + espelho PT completo em /pt/ (mesmos slugs) — 18 páginas.
- Nav bilíngue com aria-current, troca de idioma para a página equivalente; canonical + hreflang (en, pt-BR, x-default=en) + `<html lang>` correto em todas.
- 404.html próprio bilíngue (noindex). Âncoras antigas preservadas na home: #topo #on-demand #linguas #como #caso #flagship #projetos #oferta #formacao.
- Primeira dobra literal do brief (EN/PT headline, sub, 3 CTAs) + "Independent studio led by Guilherme Cavalcanti" / "Estúdio independente liderado por Guilherme Cavalcanti". Marca ARBOCK LABS + descriptor.
- Acessibilidade: skip link, landmarks (header/nav/main/footer), ordem de headings, labels, :focus-visible, prefers-reduced-motion, mobile-first. Sem framework, sem build, caminhos root-absolute (site de usuário do Pages).
- Contato: formulário sem `action`, botão `disabled`, main.js faz preventDefault; aviso visível "Pendente de configuração / Pending configuration". Nenhum e-mail inventado.
- styles.css e main.js mantidos (conteúdo reescrito; main.js só progressive enhancement). README.md mantido.
- Fatos nos cases só os medidos no INVENTARIO.md (comercial-template 24/24 + CI; sherlock 8/8, sem CI); FLOWDESK rotulado como simulação por regras.

## Evidência
Log completo e atual: `docs/luna-checks.log` (rodada 2: links 249/0 quebrados, html-validate exit 0, 23×200, grep [E e 'TODO: copy' = 0). Resumo da rodada 1:
- `python3 /tmp/luna-gen/links.py` → internal links checked: 215, broken: 0 (inclui fragmentos #).
- `npx --yes html-validate@9 "**/*.html"` (mesma regra do workflow sprint001-check, com .htmlvalidate.json) → exit 0, sem erros.
- `python3 -m http.server` + curl: 18 rotas EN/PT + /404.html, /styles.css, /main.js, /README.md, /index.html → todas 200.
- Gerador usado: /tmp/luna-gen/gen.py (temporário, fora do repo).

## Rodada 2 — integração da copy do Hermes (2026-10-19 ~09:33 BRT)
- Todas as 18 páginas EN/PT agora usam copy/en|pt/<pagina>.md (título e meta_description do front matter; corpo convertido de Markdown). Nenhum placeholder "TODO: copy" restante.
- Hero: mantido literal do brief; o gerador confere que os 12 textos (H1, sub, linha "led by", 3 CTAs × EN/PT) são idênticos na copy → 12/12 iguais.
- Marcadores [Exx]: o Hermes os removeu da copy às 09:32 (decisão Q4 do Lugh); a trilha ficou em copy/EVIDENCE.md "Claim map". Resultado: 0 marcadores no HTML, 0 links de evidência renderizados. O gerador ainda tem um mapa E04,E05,E08–E15,E18–E26,E30 → arquivo no GitHub no SHA registrado (ou release v0.1.3), caso voltem.
- **Evidência sem destino** (só fontes internas da sprint: logs/, INVENTARIO, BRIEF, DIRECTIVE, RISCOS, BRANDING): E01, E02, E03, E06, E07, E16, E17, E27, E28, E29, E31. Hoje nenhum aparece na copy, então nada foi descartado do texto.
- Notas editoriais da copy tratadas: "*(… STATUS Q1 …)*" removidas; seção "What happens next / O que acontece depois" do contato segurada (STATUS Q2, até existir canal); notas G3 mantidas como frase de limitação, sem a referência interna ao STATUS.
- Título de pt/methodology encurtado para "Método · ARBOCK LABS" (copy tinha 80 caracteres; html-validate limita a 70).
- Formulário de contato: campos da copy (nome, e-mail, descrição, oferta S01–S03, "tenho repositório"), sem action, botão disabled + preventDefault, aviso "Pendente de configuração / Pending configuration".
- Links entre páginas com fragmento usam /services/index.html#s0N (o lychee do CI não confere fragmento em URL de diretório); CI local da Moony em 62eccca: PASSOU (logs/moony-ci-62eccca.log).
- Gerador re-executável: `/tmp/luna-gen/checks.sh` (regenera com /tmp/luna-gen/gen.py e roda todas as checagens; log em docs/luna-checks.log).
- Conflito de conteúdo: a copy diz que o FLOWDESK "não tem código / not yet built", mas copy/EVIDENCE-hermes.log (09:32) já registra 2 commits em flowdesk/ (bd8a1c9, 80fe74d). Cabe ao Hermes atualizar; não alterei o texto.

## Rodada 3 — design da Vênus + copy final do Hermes + imagens reais (2026-10-19 ~09:50 BRT)
- `styles.css` = design/tokens.css + design/components.css (cópia literal) + bloco pequeno "Site additions". Nomes styles.css/main.js mantidos; TODO de CSS removido.
- Todas as páginas seguem a ordem de seções do WIREFRAMES.md com as classes do styleguide: header (brand + descritor, nav-desktop, lang-toggle EN|PT com aria-current, nav-cta, nav-mobile em `<details>`), hero, service-card (S03 priority, linha "não prometemos" tirada de services.md), project-card, steps, case-header + facts + case-toc + 9 seções numeradas (c-problem…c-need, Limitations com `.limitations`), pager entre casos, faixa `.cta` em todas exceto /contact/, footer em 4 colunas.
- Copy final do Hermes re-puxada (FLOWDESK "in development, demo pending"; seções Evidence com links; MIME só como card em /work; "What happens next" do contato segurada por Q2).
- **Hero / CTAs:** decisão do coordenador registrada em DIRECTIVE.md "rodada 3" (veto #11 do Crono): a home tem 2 CTAs, "Explore Our Services → /services/" e "Discuss Your Project → /contact/" (PT: "Conheça nossas soluções" / "Solicite uma proposta"). "Try a Live Demo / Experimente uma demonstração" foi ocultado; o texto literal do Gui está preservado em comentário HTML (sem `<a>`) e em `HELD_CTA` no gerador, para voltar sem alteração. H1, sub e a linha "led by" continuam literais. Checagem do gerador: 10/10 textos iguais à copy + CTA segurado ausente da copy (conforme decidido).
- Links de evidência da copy: 15 URLs externas, todas HTTP 200 com `curl -L` (log). Nenhum link morto.
- main.js: Escape fecha o menu mobile e devolve o foco ao botão; o formulário nunca envia (preventDefault) e `?service=s0N` só pré-seleciona o serviço.
- Contato: formulário do wireframe (Nome*, E-mail*, Serviço, problema*, URL do repositório, aceite), botão `disabled`, aviso "Pendente de configuração / Pending configuration", sem e-mail.

### Imagens (todas capturas reais; nenhum mockup)
| Arquivo no site | Origem | Commit da captura | sha256 da origem (verificado) | sha256 no site |
|---|---|---|---|---|
| assets/img/comercial-template-04-dashboard.webp | design/screenshots/comercial-template/04-dashboard.webp | comercial-template@3ead252 | 8d8b49a5…7cf70 | igual |
| assets/img/comercial-template-m02-dashboard-390.webp | design/screenshots/comercial-template/m02-dashboard-390.webp | 3ead252 | 3e40f433…7f32 | igual |
| assets/img/comercial-template-07-proposal-detail.webp | design/screenshots/comercial-template/07-proposal-detail.webp | 3ead252 | ecd94823…aab3 | igual |
| assets/img/comercial-template-m03-proposal-detail-390.webp | design/screenshots/comercial-template/m03-proposal-detail-390.webp | 3ead252 | 0877e117…2832 | igual |
| assets/img/sherlock-02-hub-1440.webp | design/screenshots/sherlock/02-hub-1440.webp | sherlock@e632035 | 3f767f69…5ae7 | igual |
| assets/img/sherlock-01-hub-390.webp | design/screenshots/sherlock/01-hub-390.webp | e632035 | 826544e7…e9 | igual |
| assets/img/flowdesk-05-suggestion-sim-label-1280.webp | design/prints/flowdesk/05-suggestion-sim-label-1280.webp | flowdesk@5b41bf5 | 1335ff9f…a5c (README OK) | igual |
| assets/img/flowdesk-05-suggestion-sim-label-390.webp | design/prints/flowdesk/05-suggestion-sim-label-390.webp | 5b41bf5 | 0cd888fa…de09 (README OK) | igual |
| assets/img/flowdesk-07-logged-history-1280.webp | design/prints/flowdesk/07-logged-history-1280.png → webp q85 (Pillow) | 5b41bf5 | 0213f036…e3 (README OK) | 3af6f805…b30f |

\* As PNGs de origem dos webp do comercial-template/sherlock batem com o SHA-256 do design/screenshots/README.md (`sha256sum -c`: 6/6 OK); o README só lista PNG. As 27 entradas do design/prints/flowdesk/README.md: 27/27 OK.
- Conferi cada imagem usada com o Read: dados sintéticos/fictícios, sem tela de erro. SHERLOCK: só a tela inicial (hub); as telas "Analisar" com "ERRO DO MOTOR" (03/04) **não** são usadas. FLOWDESK: estado 05 (rótulo "Simulação (regras) — não é um modelo de IA · provider rules-v1") e 07 (aprovado por demo-reviewer, `response_sent: false`). O rótulo de simulação também aparece em texto (aviso `.notice--sim`, tag) e a página mantém "demo pendente", com o botão "Abrir a demo" desativado (aria-disabled) e sem link para demo ao vivo.
- Todas as `<img>` têm width/height, alt descritivo, `decoding=async`; `loading=lazy` em tudo abaixo da dobra (a imagem do hero carrega direto).

### Medições da rodada 3 (log completo em docs/luna-checks.log)
- html-validate@9: exit 0 · links internos: 679, 0 quebrados · CI local da Moony (lychee + html-validate): PASSOU · http 200: 18 rotas + 404 + assets.
- URLs externas da copy: 15/15 HTTP 200.
- Responsivo (Chrome headless/Playwright, 18 páginas × 360/768/1280 = 54 renders): 0 com scroll horizontal; 0 imagens quebradas (antes da correção: os 2 estudos de caso estouravam em 360/768 por URLs longas → `overflow-wrap:anywhere`).
- Teclado (18 páginas × 360/1280 = 36 execuções): skip link é o 1º foco, aparece e leva o foco ao `<main>`; Tab alcança todos os elementos focáveis visíveis (ex.: home 360 30/30, sherlock 1280 43/43); foco visível em todos (cards usam o anel `:focus-within` do componente); sem armadilha; troca de idioma alcançável; menu mobile: Enter abre, Tab entra no painel, Escape fecha e devolve o foco.
- axe-core 4 (36 execuções): 0 violações (corrigido `label-content-name-mismatch` no `.brand`, tirando o aria-label).
- Grep: 0 `[E0-9`, 0 "TODO: copy". O grep de artefatos acha "STATUS" só na página do FLOWDESK: é texto da copy do Hermes citando `flowdesk/STATUS.md` (arquivo interno) na tabela de testes — mantido, sinalizado ao coordenador.
- Capturas de página inteira em /tmp/luna-screens (54 PNG); 3 amostras pequenas em docs/screens/.

## Pendente
- Copy: integrada (rodada 2). Reexecutar /tmp/luna-gen/checks.sh se o Hermes editar.
- Design: integrado na rodada 3.
- Lychee (links offline) do workflow não rodado localmente; equivalente feito com script próprio.
- `.github/workflows/sprint001-check.yml` e `.htmlvalidate.json` não são meus: foram commitados por outro agente em fd952b4 (ci). Não alterei.

## Bloqueio
- Canal de contato real inexistente (decisão do Gui).
- Push: o branch foi enviado em 31f85ce com aprovação direta do Gui; os commits da rodada 3 são só locais (não enviei). Nada tocado em main.

## Rodada 4 — achados não bloqueantes do RC + FLOWDESK rodada 2 (2026-10-19 ~10:15 BRT)
Pedido do Lugh após a liberação do Crono em 7a6991f. Commits só locais em sprint001/redesign (sem push, sem merge, sem deploy):
- `6175878` **favicon**: `/favicon.svg` (quadrado arredondado em `--c-accent` #1d4ed8 com um "A" em traço `--c-accent-ink` #ffffff, tokens da Vênus) + `/favicon.ico` (16/32/48, rasterizado do mesmo SVG pelo Chrome headless; script `/tmp/luna-gen/favicon.py`). `<link rel="icon" href="/favicon.ico" sizes="any">` + `<link rel="icon" href="/favicon.svg" type="image/svg+xml">` nas 19 páginas (caminhos root-absolute, como /styles.css; 404.html precisa disso).
- `abac5ab` **CTA segurado**: comentário HTML com "Try a Live Demo / Experimente uma demonstração" removido das duas homes e do gerador (substitui a nota da rodada 3 acima). O texto do Gui continua em DIRECTIVE.md e copy/STATUS.md. `rg` no HTML: 0 ocorrências; comentários HTML no site: 0.
- `c2e2b79` **scroll-margin-top**: `--scroll-offset: calc(var(--header-h) + var(--bw) + var(--sp-4))` = 56 + 1 + 16 = 73px (header medido no Chrome: 57px em 360/768/1280). Aplicado a `:target, [id], a, button, input, select, textarea, summary, [tabindex], .card`. O `scroll-padding-top` do `html` (components.css) foi zerado em "Site additions" para o deslocamento não somar duas vezes (Vênus pode levar isso para components.css). main.js: ao focar o link de um `.card--link`, o card inteiro sai de baixo do header quando cabe na tela. Antes: 50 paradas de foco com o card coberto; depois: 0.
- `2f11d9c` **título PT de Metodologia**: "Metodologia · ARBOCK LABS" (copy do Hermes passada 2, encurtada pela regra dos 70 caracteres). H1 inalterado.
- `0af877f` **FLOWDESK rodada 2**: copy passada 2 do Hermes re-puxada (cards da home, services e work sem 53/53 e 22/22; case EN/PT reescrito para o 905a387; refs internas removidas de comercial/sherlock). Prints da Vênus @905a387, os 37 SHA-256 do README conferidos (37/37 OK): 05 (par 1280+390, webp da Vênus), 07 agora em par 1280+390, e 08/08b/09/10 (motivo de rejeição, 1280) numa figura em grade, porque a copy cita "rejecting it requires a reason, typed in an inline field". Alt e legendas atualizados (commit 905a387, 10:04–10:06 BRT). Rótulo "Simulação (regras) — não é um modelo de IA" mantido. Nenhum asset ficou órfão (mesmos nomes).
- `1faaa03` **números do FLOWDESK**: E44 aprovado pelo Crono (qa/AUDITORIA-COPY.md:275), publicado como está na copy: work-flowdesk EN/PT :61, :81, :89 e work EN/PT :31–32 (88/88, 50/50, 16/16, 5/5, commit testado 1b489bf ≡ 905a387; axe/pa11y). Sem métricas de Lighthouse.
- Medições em 1faaa03 (`docs/luna-checks.log`, run 10:14 BRT): html-validate exit 0; links internos 727/0 quebrados; Moony ci-local PASSOU (lychee 837 total, 709 OK, 0 erros; logs/moony-ci-1faaa03.log); 25×200 locais, incluindo /favicon.svg (image/svg+xml) e /favicon.ico (image/vnd.microsoft.icon); 15/15 links externos 200; overflow 0 em 54; teclado 36/36 ok; axe 0 violações em 36; foco sob o header 0 em 3204 paradas (Tab + Shift+Tab, 54 renders), alvos de âncora sob o header 0 em 210 navegações. Informativo: 24 paradas em cards mais altos que a tela menos o header (o link fica visível; o card inteiro não cabe).
- Gerador: `/tmp/luna-gen/gen.py` e `checks.sh` atualizados (o checks.sh agora acrescenta ao log em vez de sobrescrever e roda também `focusclip.py`). Backups em `/tmp/luna-gen/*.bak-*`.
