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
Log completo: `docs/luna-checks.log` (gerado 2026-10-19). Resumo:
- `python3 /tmp/luna-gen/links.py` → internal links checked: 215, broken: 0 (inclui fragmentos #).
- `npx --yes html-validate@9 "**/*.html"` (mesma regra do workflow sprint001-check, com .htmlvalidate.json) → exit 0, sem erros.
- `python3 -m http.server` + curl: 18 rotas EN/PT + /404.html, /styles.css, /main.js, /README.md, /index.html → todas 200.
- Gerador usado: /tmp/luna-gen/gen.py (temporário, fora do repo).

## Pendente
- Copy (Hermes): copy/ estava vazio → textos provisórios marcados `<!-- TODO: copy (Hermes) -->` + texto visível em cinza.
- Design (Vênus): design/ estava vazio → CSS neutro mínimo com TODO no topo de styles.css; integrar tokens.css/components.css quando chegarem.
- Lychee (links offline) do workflow não rodado localmente; equivalente feito com script próprio.
- `.github/workflows/sprint001-check.yml` e `.htmlvalidate.json` estão não rastreados na worktree e não são meus — deixei sem commitar (dono: Moony/Crono).

## Bloqueio
- Canal de contato real inexistente (decisão do Gui).
- Push NÃO feito: exige aprovação direta do Gui. Nada tocado em main.
