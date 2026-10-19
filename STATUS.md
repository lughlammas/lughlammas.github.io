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

## Pendente
- Copy: integrada (rodada 2). Reexecutar /tmp/luna-gen/checks.sh se o Hermes editar.
- Design (Vênus): design/ estava vazio → CSS neutro mínimo com TODO no topo de styles.css; integrar tokens.css/components.css quando chegarem.
- Lychee (links offline) do workflow não rodado localmente; equivalente feito com script próprio.
- `.github/workflows/sprint001-check.yml` e `.htmlvalidate.json` não são meus: foram commitados por outro agente em fd952b4 (ci). Não alterei.

## Bloqueio
- Canal de contato real inexistente (decisão do Gui).
- Push NÃO feito: exige aprovação direta do Gui. Nada tocado em main.
