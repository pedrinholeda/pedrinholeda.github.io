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
      menu_experience: "EXPERIÊNCIA",
      menu_contact: "CONTATO",

      // Seções principais
      welcome: "Pedro Léda",
      skills: "Stack",
      experiences: "Experiência",
      contact: "Contato",

      // Textos da seção início (Hero) - "Sou desenvolvedor [Frontend/Mobile/iOS]"
      hero_prefix: "Sou desenvolvedor ",
      hero_suffix: "",
      intro_text:
        "Há mais de 6 anos criando aplicativos móveis com tecnologias nativas e multiplataforma, da arquitetura à publicação nas lojas.",
      cta_button: "Fale Comigo",
      cta_secondary: "Ver experiências",
      experiences_section: "Ir para seção de experiências",

      // Textos da seção sobre
      about_title: "Olá, me chamo Pedro :)",
      about_description:
        "Comecei a programar profissionalmente em 2020 e encontrei no mobile o que mais gosto de fazer: transformar ideias em apps que as pessoas usam todos os dias. Já trabalhei com iOS nativo, React Native e Flutter, em produtos internos, projetos de grande escala e plataformas white-label. Hoje desenvolvo apps de segurança e monitoramento na Segware, direto de Brasília.",
      stat_years: "anos de experiência",
      stat_companies: "empresas",
      stat_platforms: "plataformas: iOS, Android e Web",

      // Skills (stack / competências técnicas)
      skills_subtitle: "Tecnologias e ferramentas que uso no dia a dia",
      hybrid_dev_title: "Mobile híbrido",
      hybrid_dev_desc:
        "React Native e Flutter para apps multiplataforma com tipagem forte e UI consistente.",
      native_ios_title: "iOS nativo",
      native_ios_desc:
        "Swift e SwiftUI com foco em APIs da Apple, padrões de arquitetura e qualidade de código.",
      architecture_title: "Arquitetura",
      architecture_desc:
        "Código organizado e escalável com padrões consolidados, pensado para times e produtos que crescem.",
      versioning_title: "Git & entrega",
      versioning_desc:
        "Git, Git Flow e práticas de CI/CD para colaboração segura e releases previsíveis.",


      // Experiência e projetos
      experiences_subtitle:
        "Mais de 6 anos construindo apps em produção, de produtos internos a plataformas white-label.",
      exp_bb_role: "Desenvolvedor Web & Mobile",

      // Experiências profissionais
      exp_bb_desc:
        "Web e mobile com Angular e React Native, além de microserviços para produtos internos que otimizaram processos da empresa.",
      exp_usemobile_desc:
        "Apps nativos iOS com Swift, implementando novas funcionalidades seguindo os padrões de código do time e Git Flow.",
      exp_compass_desc:
        "Aplicações iOS e React Native em projetos de grande escala, com foco em arquitetura, boas práticas, usabilidade e performance.",
      exp_akross_desc:
        "Apps em produção com React Native e Flutter e SDK nativa iOS em Swift. Atuação em plataforma de rewards white-label, integrações Firebase e SDKs de parceiros.",
      exp_akross_date: "dez 2023 — mai 2026",
      exp_segware_desc:
        "Soluções de segurança eletrônica e monitoramento. Desenvolvimento principalmente com React Native, e ocasionalmente iOS e Android nativos, para produtos usados por centrais e clientes finais.",
      exp_segware_date: "mai 2026 — presente",
      exp_bb_date: "set 2020 — jun 2021",
      exp_usemobile_date: "jun 2021 — set 2021",
      exp_compass_date: "out 2021 — dez 2023",

      // Textos da seção contato
      contact_description:
        "Aberto a projetos, colaborações e boas conversas sobre mobile. Mande uma mensagem ou me encontre nas redes.",
      contact_connect: "Prefere as redes?",

      // Formulário
      name_placeholder: "Digite seu nome completo",
      email_placeholder: "Seu melhor email",
      message_placeholder: "Escreva o que você deseja aqui...",
      name_label: "Nome",
      email_label: "Email",
      message_label: "Mensagem",
      submit_button: "Enviar",
      sending_text: "Enviando...",

      // Footer
      footer_home: "Início",
      footer_about: "Sobre",
      footer_skills: "Stack",
      footer_experience: "Experiência",
      footer_contact: "Contato",
      copyright: `© ${new Date().getFullYear()} Pedro Léda`,

      // Rodapé
      made_with: "Feito com café e código",

      // Aria labels
      back_to_top: "Voltar ao topo",
      open_menu: "Abrir menu de navegação",
      change_language: "Trocar idioma",
      go_to_home: "Ir para seção início",
      go_to_about: "Ir para seção sobre",
      go_to_skills: "Ir para seção skills",
      go_to_experience: "Ir para seção experiência",
      go_to_contact: "Ir para seção contato",
      contact_section: "Ir para seção de contato",
      visit_github: "Visitar GitHub",
      visit_linkedin: "Visitar LinkedIn",
      footer_menu: "Menu do rodapé",

      // Validação do formulário
      validation_name_required: "Nome é obrigatório",
      validation_name_min: "Nome deve ter pelo menos 2 caracteres",
      validation_email_required: "Email é obrigatório",
      validation_email_invalid: "Email inválido",
      validation_message_required: "Mensagem é obrigatória",
      validation_form_errors: "Por favor, corrija os erros no formulário.",
      validation_success: "Mensagem enviada com sucesso! Entrarei em contato em breve.",
      validation_error: "Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.",

      // Typed (efeito de digitação)
      typed_strings: ["mobile", "React Native", "Flutter", "iOS"],
    },
    en: {
      // Menu
      menu_home: "HOME",
      menu_about: "ABOUT",
      menu_skills: "STACK",
      menu_experience: "EXPERIENCE",
      menu_contact: "CONTACT",

      // Seções principais
      welcome: "Pedro Léda",
      skills: "Stack",
      experiences: "Experience",
      contact: "Contact",

      // Textos da seção início (Hero)
      hero_prefix: "I'm a ",
      hero_suffix: " developer",
      intro_text:
        "6+ years building mobile apps with native and cross-platform technologies, from architecture to store release.",
      cta_button: "Get in Touch",
      cta_secondary: "View experience",
      experiences_section: "Go to experience section",

      // Textos da seção sobre
      about_title: "Hello, I'm Pedro :)",
      about_description:
        "I started coding professionally in 2020 and found in mobile what I enjoy most: turning ideas into apps people use every day. I've worked with native iOS, React Native and Flutter on internal products, large-scale projects and white-label platforms. Today I build security and monitoring apps at Segware, from Brasília, Brazil.",
      stat_years: "years of experience",
      stat_companies: "companies",
      stat_platforms: "platforms: iOS, Android and Web",

      // Skills (tech stack)
      skills_subtitle: "Technologies and tools I use every day",
      hybrid_dev_title: "Hybrid mobile",
      hybrid_dev_desc:
        "React Native and Flutter for cross-platform apps with strong typing and consistent UI.",
      native_ios_title: "Native iOS",
      native_ios_desc:
        "Swift and SwiftUI focused on Apple APIs, architecture patterns and code quality.",
      architecture_title: "Architecture",
      architecture_desc:
        "Organized, scalable code built on proven patterns, designed for growing teams and products.",
      versioning_title: "Git & delivery",
      versioning_desc:
        "Git, Git Flow and CI/CD practices for safe collaboration and predictable releases.",


      // Experience and projects
      experiences_subtitle:
        "6+ years building production apps, from internal products to white-label platforms.",
      exp_bb_role: "Web & Mobile Developer",

      // Experiências profissionais
      exp_bb_desc:
        "Web and mobile with Angular and React Native, plus microservices for internal products that streamlined company processes.",
      exp_usemobile_desc:
        "Native iOS apps in Swift, shipping new features following the team's code standards and Git Flow.",
      exp_compass_desc:
        "iOS and React Native apps on large-scale projects, focused on architecture, best practices, usability and performance.",
      exp_akross_desc:
        "Production apps with React Native and Flutter and a native iOS SDK in Swift. Worked on a white-label rewards platform, Firebase integrations and partner SDKs.",
      exp_akross_date: "Dec 2023 — May 2026",
      exp_segware_desc:
        "Electronic security and monitoring solutions. Mainly React Native, with occasional native iOS and Android work, for products used by monitoring centers and end customers.",
      exp_segware_date: "May 2026 — Present",
      exp_bb_date: "Sep 2020 — Jun 2021",
      exp_usemobile_date: "Jun 2021 — Sep 2021",
      exp_compass_date: "Oct 2021 — Dec 2023",

      // Textos da seção contato
      contact_description:
        "Open to projects, collaborations and good conversations about mobile. Send a message or find me online.",
      contact_connect: "Prefer social media?",

      // Formulário
      name_placeholder: "Enter your full name",
      email_placeholder: "Your best email",
      message_placeholder: "Write what you want here...",
      name_label: "Name",
      email_label: "Email",
      message_label: "Message",
      submit_button: "Send",
      sending_text: "Sending...",

      // Footer
      footer_home: "Home",
      footer_about: "About",
      footer_skills: "Stack",
      footer_experience: "Experience",
      footer_contact: "Contact",
      copyright: `© ${new Date().getFullYear()} Pedro Léda`,

      // Footer credits
      made_with: "Made with coffee and code",

      // Aria labels
      back_to_top: "Back to top",
      open_menu: "Open navigation menu",
      change_language: "Change language",
      go_to_home: "Go to home section",
      go_to_about: "Go to about section",
      go_to_skills: "Go to skills section",
      go_to_experience: "Go to experience section",
      go_to_contact: "Go to contact section",
      contact_section: "Go to contact section",
      visit_github: "Visit GitHub",
      visit_linkedin: "Visit LinkedIn",
      footer_menu: "Footer menu",

      // Form validation
      validation_name_required: "Name is required",
      validation_name_min: "Name must be at least 2 characters",
      validation_email_required: "Email is required",
      validation_email_invalid: "Invalid email",
      validation_message_required: "Message is required",
      validation_form_errors: "Please fix the errors in the form.",
      validation_success: "Message sent successfully! I'll get in touch soon.",
      validation_error: "Error sending message. Try again or contact me directly.",

      // Typed (typing effect)
      typed_strings: ["mobile", "React Native", "Flutter", "iOS"],
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
