# Portfólio Pedro Leda - Desenvolvedor Mobile

Portfólio profissional desenvolvido com HTML, CSS e JavaScript, focado em desenvolvimento mobile com React Native, Flutter e iOS nativo.

## 🚀 Funcionalidades

- **Design Responsivo**: Otimizado para todos os dispositivos
- **Formulário de Contato Funcional**: Integrado com Formspree
- **SEO Otimizado**: Meta tags e Open Graph configurados
- **Acessibilidade**: Navegação por teclado e leitores de tela
- **Performance**: Carregamento otimizado e animações suaves
- **Validação de Formulário**: Validação client-side e feedback visual

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com variáveis CSS
- **JavaScript**: Interatividade e validação
- **Bootstrap Icons**: Ícones consistentes
- **AOS (Animate On Scroll)**: Animações de scroll
- **Particles.js**: Efeito de partículas no background
- **Typed.js**: Efeito de digitação
- **Formspree**: Backend para formulário de contato

## 📱 Seções do Portfólio

1. **Início**: Apresentação com efeito de digitação
2. **Sobre**: Informações pessoais e links sociais
3. **Skills**: Competências técnicas
4. **Serviços**: Serviços oferecidos
5. **Portfolio**: Experiências profissionais
6. **Contato**: Formulário funcional

## 🔧 Configuração

### 1. Configurar Formspree

Para que o formulário de contato funcione:

1. Acesse [formspree.io](https://formspree.io)
2. Crie uma conta gratuita
3. Crie um novo formulário
4. Copie o ID do formulário (ex: `xpzgwqzg`)
5. Substitua no arquivo `index.html`:
   ```html
   <form action="https://formspree.io/f/SEU_ID_AQUI" method="POST"></form>
   ```

### 2. Configurar Meta Tags

Atualize as meta tags no `index.html` com suas informações:

```html
<meta property="og:url" content="https://seu-usuario.github.io/" />
<meta
  property="og:image"
  content="https://seu-usuario.github.io/assets/img/perfil.png"
/>
```

### 3. Personalizar Conteúdo

- Substitua as imagens em `assets/img/`
- Atualize os links das redes sociais
- Modifique os textos e experiências
- Ajuste as cores no arquivo `assets/css/style.css`

## 📁 Estrutura de Arquivos

```
pedrinholeda.github.io/
├── index.html                 # Página principal
├── assets/
│   ├── css/
│   │   ├── style.css         # Estilos principais
│   │   ├── responsividade.css # Responsividade
│   │   └── clash-grotesk.css # Fontes
│   ├── js/
│   │   ├── form.js           # Formulário e validação
│   │   ├── header.js         # Header e navegação
│   │   ├── actionButton.js   # Botões de ação
│   │   ├── menu.js           # Menu mobile
│   │   ├── slideSobre.js     # Slider da seção sobre
│   │   ├── slidePortfolio.js # Slider do portfolio
│   │   ├── typed.js          # Efeito de digitação
│   │   └── particles.js      # Efeito de partículas
│   ├── img/                  # Imagens do site
│   └── fonts/                # Fontes locais
├── _formspree.yml            # Configuração do Formspree
└── README.md                 # Este arquivo
```

## 🎨 Personalização

### Cores

As cores estão definidas como variáveis CSS no arquivo `style.css`:

```css
:root {
  --color-black: #000;
  --color-gray1: #3d4143;
  --color-gray2: #9c9d9d;
  --color-white: #f6f6f6;
  --color-destaque1: #e7fc00;
  --color-destaque2: #728e6f;
}
```

### Fontes

O site utiliza duas fontes principais:

- **TT Hoves Pro Trial**: Para títulos
- **Clash Grotesk**: Para textos

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Mobile Pequeno**: < 480px

## ♿ Acessibilidade

Implementações de acessibilidade:

- Navegação por teclado
- Atributos ARIA
- Foco visível
- Textos alternativos
- Estrutura semântica
- Suporte a leitores de tela

## 🚀 Deploy

### GitHub Pages

1. Faça push do código para o repositório
2. Vá em Settings > Pages
3. Selecione a branch `main`
4. O site estará disponível em `https://seu-usuario.github.io`

### Netlify

1. Conecte o repositório ao Netlify
2. Configure o build (não é necessário para sites estáticos)
3. O site será deployado automaticamente

## 🔧 Melhorias Implementadas

### SEO e Performance

- ✅ Meta tags completas
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Favicon configurado
- ✅ Títulos otimizados

### Funcionalidade

- ✅ Formulário de contato funcional
- ✅ Validação client-side
- ✅ Feedback visual
- ✅ Loading states
- ✅ Máscara de telefone

### Acessibilidade

- ✅ Atributos ARIA
- ✅ Navegação por teclado
- ✅ Foco visível
- ✅ Textos alternativos
- ✅ Estrutura semântica

### Responsividade

- ✅ Breakpoints otimizados
- ✅ Touch-friendly
- ✅ Fontes responsivas
- ✅ Espaçamentos adaptativos

### UX/UI

- ✅ Animações suaves
- ✅ Estados de hover
- ✅ Feedback visual
- ✅ Loading states
- ✅ Mensagens de erro/sucesso

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato através do formulário no site ou pelas redes sociais.

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar e modificar conforme necessário.

---

**Desenvolvido com ❤️ por Pedro Leda**
