document.addEventListener("DOMContentLoaded", function () {
  // Elementos de controle do menu
  const menuToggle = document.getElementById("menuToggle");
  const menuAberto = document.querySelector(".menu-aberto");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const desktopNavLinks = document.querySelectorAll(".nav-desktop a");
  const allNavLinks = document.querySelectorAll("[data-section]");
  const body = document.body;
  const header = document.querySelector(".header");

  // Verificação de elementos antes de usar
  if (!menuToggle || !menuAberto) {
    console.warn("Elementos do menu não encontrados");
    return;
  }

  const menuToggleLabel = document.getElementById("menuToggleLabel");

  function setMenuOpen(isOpen) {
    menuToggle.checked = isOpen;
    menuAberto.classList.toggle("active", isOpen);
    body.classList.toggle("no-scroll", isOpen);
    if (menuToggleLabel) {
      menuToggleLabel.setAttribute("aria-expanded", String(isOpen));
    }
  }

  // Abre/fecha o menu ao mudar o estado do checkbox
  menuToggle.addEventListener("change", function () {
    setMenuOpen(menuToggle.checked);
  });

  // Fecha o menu ao clicar em um link de navegação
  [...navLinks, ...desktopNavLinks].forEach((link) => {
    link.addEventListener("click", function () {
      setMenuOpen(false);
    });
  });

  // Header compacto + seção ativa (requestAnimationFrame)
  let scrollTicking = false;
  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      if (header) {
        header.classList.toggle("header-scrolled", window.scrollY > 50);
      }
      const scrollPos = window.scrollY + 120;
      let current = "inicio";
      sections.forEach((section) => {
        if (section.id && section.offsetTop <= scrollPos) {
          current = section.id;
        }
      });
      allNavLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.section === current);
      });
      scrollTicking = false;
    });
  }
  const sections = document.querySelectorAll("main, section[id]");
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Internacionalização completa
  const translations = {
    pt: {
      // Menu
      menu_home: "INÍCIO",
      menu_about: "SOBRE",
      menu_skills: "STACK",
      menu_services: "SERVIÇOS",
      menu_portfolio: "PORTFOLIO",
      menu_contact: "CONTATO",

      // Seções principais
      welcome: "Pedro Léda",
      skills: "Stack",
      services: "Serviços",
      experiences: "Experiências",
      contact: "Contato",

      // Textos da seção início (Hero) - "Sou desenvolvedor [Frontend/Mobile/iOS]"
      hero_prefix: "Sou desenvolvedor ",
      hero_suffix: "",
      intro_text:
        "Trabalho criando aplicativos móveis usando tecnologias nativas e híbridas.",
      cta_button: "Fale Comigo",
      cta_secondary: "Ver experiências",
      experiences_section: "Ir para seção de experiências",

      // Textos da seção sobre
      about_title: "Olá, me chamo Pedro :)",
      about_description:
        "Desenvolvedor mobile especializado em React Native, Flutter e iOS nativo. Apaixonado por criar experiências intuitivas e colaborar em projetos de alto impacto.",

      // Skills (stack / competências técnicas)
      skills_subtitle: "Tecnologias e ferramentas que domino no dia a dia",
      hybrid_dev_title: "Mobile híbrido",
      hybrid_dev_desc:
        "React Native e Flutter para apps multiplataforma com tipagem forte e UI consistente.",
      native_ios_title: "iOS nativo",
      native_ios_desc:
        "Swift e SwiftUI com foco em APIs da Apple, padrões de arquitetura e qualidade de código.",
      frontend_title: "Web front-end",
      frontend_desc:
        "HTML, CSS, TypeScript, React e Angular para interfaces modernas e acessíveis.",
      versioning_title: "Git & entrega",
      versioning_desc:
        "Git, Git Flow e práticas de CI/CD para colaboração segura e releases previsíveis.",

      // Serviços (o que ofereço ao cliente)
      services_subtitle:
        "Como posso ajudar no seu produto — da ideia ao app publicado.",
      frontend_service: "Interfaces web",
      ios_native_service: "Apps iOS",
      hybrid_service: "Apps multiplataforma",
      uiux_service: "UI/UX para produto",
      versioning_service: "Fluxo de entrega",
      performance_service: "Otimização",
      frontend_service_desc: "Landing pages e painéis responsivos sob medida",
      ios_native_service_desc: "Do protótipo à App Store com Swift/SwiftUI",
      hybrid_service_desc: "Um código, iOS e Android com RN ou Flutter",
      uiux_service_desc: "Fluxos claros, prototipação e handoff para dev",
      versioning_service_desc: "Git Flow, reviews e pipelines de CI/CD",
      performance_service_desc: "Auditoria, profiling e ganhos de fluidez",

      // Textos da seção portfolio
      portfolio_subtitle:
        "Experiência em desenvolvimento, design e criação de projetos digitais.",

      // Experiências profissionais
      exp_bb_desc:
        "Desenvolvimento web e mobile com JavaScript, Angular e React Native, além de microserviços para produtos internos, criando soluções para otimizar processos e melhorar a experiência do usuário.",
      exp_usemobile_desc:
        "Desenvolvimento de aplicativos nativos iOS com Swift, seguindo padrões de código e implementando novas funcionalidades. Trabalho com Git Flow para controle de versionamento.",
      exp_compass_desc:
        "Atuação no desenvolvimento de aplicações iOS e React Native, colaborando em projetos de grande escala. Foco em arquitetura, boas práticas e melhorias de usabilidade e performance.",
      exp_akross_desc:
        "Desenvolvimento de aplicações mobile com React Native e Flutter, evolução de apps em produção e SDK nativa iOS em Swift. Atuação em plataforma de rewards white-label, integrações Firebase e SDKs de parceiros.",
      exp_akross_date: "dez 2023 — mai 2026",
      exp_segware_desc:
        "Mobile Developer em soluções de segurança eletrônica e monitoramento. Desenvolvimento principalmente com React Native, e ocasionalmente iOS e Android nativos, para produtos usados por centrais e clientes finais.",
      exp_segware_date: "mai 2026 — presente",
      exp_bb_date: "set 2020 — jun 2021",
      exp_usemobile_date: "jun 2021 — set 2021",
      exp_compass_date: "out 2021 — dez 2023",
      exp_current: "Atualmente",

      // Textos da seção contato
      contact_title: "Entre em contato",
      contact_description:
        "Tem alguma dúvida ou deseja conversar? Entre em contato pelo formulário ou pelas redes abaixo. Respondo o mais rápido possível!",
      contact_connect: "Ou conecte-se diretamente:",

      // Formulário
      name_placeholder: "Digite seu nome completo",
      phone_placeholder: "(55) 22222-2222",
      email_placeholder: "Seu melhor email",
      message_placeholder: "Escreva o que você deseja aqui...",
      name_label: "Nome",
      phone_label: "Telefone",
      email_label: "Email",
      message_label: "Mensagem",
      submit_button: "Enviar",
      sending_text: "Enviando...",

      // Footer
      footer_home: "Início",
      footer_about: "Sobre",
      footer_skills: "Stack",
      footer_services: "Serviços",
      footer_portfolio: "Portfolio",
      footer_contact: "Contato",
      copyright: "© 2026 Todos os direitos reservados.",
      developed_by: "Desenvolvido por Pedro│Dev.",

      // Free your mind section
      made_with: "FEITO COM",
      coffee: "CAFÉ",
      and_code: "E CÓDIGO",

      // Aria labels
      back_to_top: "Voltar ao topo",
      open_menu: "Abrir menu de navegação",
      change_language: "Trocar idioma",
      go_to_home: "Ir para seção início",
      go_to_about: "Ir para seção sobre",
      go_to_skills: "Ir para seção skills",
      go_to_services: "Ir para seção serviços",
      go_to_portfolio: "Ir para seção portfolio",
      go_to_contact: "Ir para seção contato",
      contact_section: "Ir para seção de contato",
      previous_image: "Imagem anterior",
      next_image: "Próxima imagem",
      visit_instagram: "Visitar Instagram",
      visit_github: "Visitar GitHub",
      visit_linkedin: "Visitar LinkedIn",
      footer_menu: "Menu do rodapé",

      // Validação do formulário
      validation_name_required: "Nome é obrigatório",
      validation_name_min: "Nome deve ter pelo menos 2 caracteres",
      validation_email_required: "Email é obrigatório",
      validation_email_invalid: "Email inválido",
      validation_phone_invalid: "Telefone inválido (formato: (11) 99999-9999)",
      validation_message_required: "Mensagem é obrigatória",
      validation_form_errors: "Por favor, corrija os erros no formulário.",
      validation_success: "Mensagem enviada com sucesso! Entrarei em contato em breve.",
      validation_error: "Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.",

      // Typed (efeito de digitação)
      typed_strings: ["Frontend", "Mobile", "iOS"],
    },
    en: {
      // Menu
      menu_home: "HOME",
      menu_about: "ABOUT",
      menu_skills: "STACK",
      menu_services: "SERVICES",
      menu_portfolio: "PORTFOLIO",
      menu_contact: "CONTACT",

      // Seções principais
      welcome: "Pedro Léda",
      skills: "Stack",
      services: "Services",
      experiences: "Experiences",
      contact: "Contact",

      // Textos da seção início (Hero)
      hero_prefix: "I'm a ",
      hero_suffix: " developer",
      intro_text:
        "I work creating mobile applications using native and hybrid technologies.",
      cta_button: "Get in Touch",
      cta_secondary: "View experience",
      experiences_section: "Go to experience section",

      // Textos da seção sobre
      about_title: "Hello, I'm Pedro :)",
      about_description:
        "Mobile developer specialized in React Native, Flutter and native iOS. Passionate about creating intuitive experiences and collaborating on high-impact projects.",

      // Skills (tech stack)
      skills_subtitle: "Technologies and tools I use every day",
      hybrid_dev_title: "Hybrid mobile",
      hybrid_dev_desc:
        "React Native and Flutter for cross-platform apps with strong typing and consistent UI.",
      native_ios_title: "Native iOS",
      native_ios_desc:
        "Swift and SwiftUI focused on Apple APIs, architecture patterns and code quality.",
      frontend_title: "Web front-end",
      frontend_desc:
        "HTML, CSS, TypeScript, React and Angular for modern, accessible interfaces.",
      versioning_title: "Git & delivery",
      versioning_desc:
        "Git, Git Flow and CI/CD practices for safe collaboration and predictable releases.",

      // Services (client offerings)
      services_subtitle:
        "How I can help your product — from idea to a published app.",
      frontend_service: "Web interfaces",
      ios_native_service: "iOS apps",
      hybrid_service: "Cross-platform apps",
      uiux_service: "Product UI/UX",
      versioning_service: "Delivery workflow",
      performance_service: "Optimization",
      frontend_service_desc: "Custom responsive landing pages and dashboards",
      ios_native_service_desc: "From prototype to the App Store with Swift/SwiftUI",
      hybrid_service_desc: "One codebase, iOS and Android with RN or Flutter",
      uiux_service_desc: "Clear flows, prototyping and handoff to engineering",
      versioning_service_desc: "Git Flow, reviews and CI/CD pipelines",
      performance_service_desc: "Audits, profiling and smoother UX",

      // Textos da seção portfolio
      portfolio_subtitle:
        "Experience in development, design and creation of digital projects.",

      // Experiências profissionais
      exp_bb_desc:
        "Web and mobile development with JavaScript, Angular and React Native, plus microservices for internal products, creating solutions to optimize processes and improve user experience.",
      exp_usemobile_desc:
        "Native iOS app development with Swift, following code standards and implementing new features. Working with Git Flow for version control.",
      exp_compass_desc:
        "Working on iOS and React Native application development, collaborating on large-scale projects. Focus on architecture, best practices and usability and performance improvements.",
      exp_akross_desc:
        "Mobile development with React Native and Flutter, evolving production apps and a native iOS Swift SDK. Worked on a white-label rewards platform, Firebase integrations and partner SDKs.",
      exp_akross_date: "Dec 2023 — May 2026",
      exp_segware_desc:
        "Mobile Developer on electronic security and monitoring solutions. Mainly React Native, with occasional native iOS and Android work, for products used by monitoring centers and end customers.",
      exp_segware_date: "May 2026 — Present",
      exp_bb_date: "Sep 2020 — Jun 2021",
      exp_usemobile_date: "Jun 2021 — Sep 2021",
      exp_compass_date: "Oct 2021 — Dec 2023",
      exp_current: "Currently",

      // Textos da seção contato
      contact_title: "Get in touch",
      contact_description:
        "Have questions or want to chat? Get in touch via the form or through the links below. I'll respond as soon as possible!",
      contact_connect: "Or connect directly:",

      // Formulário
      name_placeholder: "Enter your full name",
      phone_placeholder: "(55) 22222-2222",
      email_placeholder: "Your best email",
      message_placeholder: "Write what you want here...",
      name_label: "Name",
      phone_label: "Phone",
      email_label: "Email",
      message_label: "Message",
      submit_button: "Send",
      sending_text: "Sending...",

      // Footer
      footer_home: "Home",
      footer_about: "About",
      footer_skills: "Stack",
      footer_services: "Services",
      footer_portfolio: "Portfolio",
      footer_contact: "Contact",
      copyright: "© 2026 All rights reserved.",
      developed_by: "Developed by Pedro│Dev.",

      // Free your mind section
      made_with: "MADE WITH",
      coffee: "COFFEE",
      and_code: "AND CODE",

      // Aria labels
      back_to_top: "Back to top",
      open_menu: "Open navigation menu",
      change_language: "Change language",
      go_to_home: "Go to home section",
      go_to_about: "Go to about section",
      go_to_skills: "Go to skills section",
      go_to_services: "Go to services section",
      go_to_portfolio: "Go to portfolio section",
      go_to_contact: "Go to contact section",
      contact_section: "Go to contact section",
      previous_image: "Previous image",
      next_image: "Next image",
      visit_instagram: "Visit Instagram",
      visit_github: "Visit GitHub",
      visit_linkedin: "Visit LinkedIn",
      footer_menu: "Footer menu",

      // Form validation
      validation_name_required: "Name is required",
      validation_name_min: "Name must be at least 2 characters",
      validation_email_required: "Email is required",
      validation_email_invalid: "Invalid email",
      validation_phone_invalid: "Invalid phone (format: (11) 99999-9999)",
      validation_message_required: "Message is required",
      validation_form_errors: "Please fix the errors in the form.",
      validation_success: "Message sent successfully! I'll get in touch soon.",
      validation_error: "Error sending message. Try again or contact me directly.",

      // Typed (typing effect)
      typed_strings: ["Frontend", "Mobile", "iOS"],
    },
  };

  let currentLang = "pt";
  const langToggle = document.getElementById("lang-toggle");

  function updateTexts() {
    try {
      // Atualiza textos com data-i18n (usa "in" para aceitar strings vazias)
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (key && key in translations[currentLang]) {
          el.innerText = translations[currentLang][key];
        }
      });

      // Atualiza placeholders
      document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (key && key in translations[currentLang]) {
          el.setAttribute("placeholder", translations[currentLang][key]);
        }
      });

      // Atualiza valores
      document.querySelectorAll("[data-i18n-value]").forEach((el) => {
        const key = el.getAttribute("data-i18n-value");
        if (key && key in translations[currentLang]) {
          el.value = translations[currentLang][key];
        }
      });

      // Atualiza aria-labels
      document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
        const key = el.getAttribute("data-i18n-aria-label");
        if (key && key in translations[currentLang]) {
          el.setAttribute("aria-label", translations[currentLang][key]);
        }
      });

      // Atualiza botão de idioma e lang do documento
      if (langToggle) {
        langToggle.innerText = currentLang === "pt" ? "EN" : "PT";
      }
      document.documentElement.lang = currentLang === "pt" ? "pt-BR" : "en";
    } catch (error) {
      console.error("Erro ao atualizar textos:", error);
    }
  }

  if (langToggle) {
    langToggle.onclick = () => {
      currentLang = currentLang === "pt" ? "en" : "pt";
      updateTexts();
      window.dispatchEvent(new CustomEvent("langChange", { detail: { lang: currentLang } }));
    };
    updateTexts();
  }

  // Expõe i18n para form.js e typed.js
  window.getI18n = function () {
    return {
      t: (key) => translations[currentLang]?.[key] ?? translations.pt?.[key] ?? key,
      lang: currentLang,
      typedStrings: translations[currentLang]?.typed_strings ?? translations.pt?.typed_strings,
    };
  };

  // Melhorias de acessibilidade - navegação por teclado
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuAberto.classList.contains("active")) {
      setMenuOpen(false);
    }
  });
});
