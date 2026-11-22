# Portfólio — Pedro Leda

Portfólio pessoal focado em desenvolvimento mobile (React Native, Flutter, iOS). HTML, CSS e JavaScript.

## Funcionalidades

- Design responsivo (mobile e desktop)
- Carrossel dos apps em produção, com ícones, números e links para App Store e Google Play
- Formulário de contato (Formspree)
- Internacionalização (PT/EN)
- SEO e acessibilidade

## Configuração

1. **Formspree** — Crie um formulário em [formspree.io](https://formspree.io) e substitua o `action` no `index.html`
2. **Personalização** — Atualize imagens, textos e links em `index.html` e `assets/js/header.js`
3. **Cores** — Variáveis CSS em `assets/css/style.css` (`:root`)
4. **Ícones** — Só os ícones usados ficam em `assets/css/icons.css`, como SVG do [Bootstrap Icons](https://icons.getbootstrap.com). Para usar um novo, copie o SVG dele para uma classe `.bi-nome` no mesmo formato

## Desenvolvimento

O site não tem build. O Node só serve para as verificações:

```bash
npm install
npx playwright install chromium
npm run serve       # http://localhost:4173
npm run lint:html   # valida o index.html (html-validate)
npm test            # testes de ponta a ponta (Playwright, desktop e celular)
```

O CI (`.github/workflows/ci.yml`) roda essas verificações em todo PR e checa os links do site com o [lychee](https://lychee.cli.rs) (configuração em `lychee.toml`). Os links também são checados toda segunda, para pegar link de loja que quebrou sem ninguém mexer no site.

## Deploy

**GitHub Pages:** Push para o repositório → Settings → Pages → branch `master`

**Netlify:** Conecte o repositório (sem build necessário)

---

Desenvolvido por Pedro Leda

## Licença

[MIT](LICENSE)
