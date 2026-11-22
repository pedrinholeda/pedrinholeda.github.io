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
      // Ativa a última seção cujo topo já passou de 40% da altura da tela, ou
      // seja, a que a pessoa está vendo. No fim da página, a última seção.
      const linha = window.innerHeight * 0.4;
      const noFim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = "inicio";
      sections.forEach((section) => {
        if (section.id && (noFim || section.getBoundingClientRect().top <= linha)) {
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
      menu_apps: "APPS",
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
        "Há mais de 5 anos criando aplicativos móveis com tecnologias nativas e multiplataforma, da arquitetura à publicação nas lojas.",
      cta_button: "Fale Comigo",
      cta_secondary: "Ver experiências",
      experiences_section: "Ir para seção de experiências",

      // Textos da seção sobre
      about_title: "Olá, me chamo Pedro :)",
      about_description:
        "Comecei a programar profissionalmente em 2019 e encontrei no mobile o que mais gosto de fazer: transformar ideias em apps que as pessoas usam todos os dias. Já trabalhei com iOS nativo, React Native e Flutter, de produtos internos a apps usados por milhões de pessoas. Hoje desenvolvo o SCond na Segware, direto de João Pessoa.",
      stat_years: "anos de experiência",
      stat_companies: "empresas",
      stat_downloads: "downloads nos apps em que trabalhei",

      // Skills (stack / competências técnicas)
      skills_subtitle: "Tecnologias e ferramentas que uso no dia a dia",
      hybrid_dev_title: "Multiplataforma",
      hybrid_dev_desc:
        "React Native e Flutter para apps em iOS e Android com uma base de código, tipagem forte e UI consistente.",
      native_ios_title: "iOS nativo",
      native_ios_desc:
        "Swift e SwiftUI com foco em APIs da Apple, padrões de arquitetura e qualidade de código.",
      architecture_title: "Arquitetura",
      architecture_desc:
        "Código organizado e escalável com padrões consolidados, pensado para times e produtos que crescem.",
      quality_title: "Qualidade",
      quality_desc:
        "Testes automatizados, análise estática e code review para entregar com segurança e manter o app saudável.",


      // Apps em produção
      apps: "Apps",
      apps_subtitle:
        "Alguns dos apps em produção em que trabalhei. Downloads da Google Play.",
      apps_downloads: "downloads",
      apps_carousel: "Apps em que trabalhei",
      apps_prev: "Apps anteriores",
      apps_next: "Próximos apps",
      apps_rating: "de nota nas lojas",
      app_timfun_desc: "Programa de recompensas da TIM. Nota 4,8 na App Store.",
      app_vivofree_desc: "Troca de pontos por internet para clientes Vivo.",
      app_prezao_desc:
        "Clube de benefícios da Claro para o pré-pago. Nota 4,8 na App Store.",
      app_nio_desc: "Gestão da internet fibra, antiga Oi Fibra.",
      app_scond_desc:
        "Segurança e gestão para condomínios, residências e empresas.",
      app_livelo_desc: "Programa de pontos e recompensas. Nota 4,8 na App Store.",
      app_natura_desc: "Compra de perfumes e cosméticos. Nota 4,8 na App Store.",

      // Experiência e projetos
      experiences_subtitle:
        "Mais de 5 anos construindo apps em produção, de produtos internos a apps com milhões de downloads.",
      exp_bb_role: "Junior Developer",

      // Experiências profissionais
      exp_bb_desc:
        "Web e mobile com Angular e React Native, além de microserviços para produtos internos que otimizaram processos da empresa.",
      exp_usemobile_desc:
        "Apps nativos iOS com Swift, implementando novas funcionalidades seguindo os padrões de código do time e Git Flow.",
      exp_compass_desc:
        "Apps iOS para Natura, Livelo, Dass e Iguatemi 365, com Swift e UIKit, além de React Native em projetos híbridos.",
      exp_akross_desc:
        "Apps de recompensas e atendimento para operadoras de telefonia, em React Native e Flutter, e uma SDK nativa iOS em Swift.",
      exp_akross_date: "dez 2023 — mai 2026",
      exp_segware_desc:
        "Desenvolvimento do SCond, app de segurança e gestão para condomínios, em React Native e TypeScript, com arquitetura MVVM e testes automatizados.",
      exp_segware_date: "mai 2026 — presente",
      exp_bb_date: "set 2020 — jun 2021",
      exp_usemobile_date: "jun 2021 — set 2021",
      exp_compass_date: "out 2021 — dez 2023",
      exp_firstdecision_date: "ago 2019 — set 2020",
      exp_firstdecision_desc:
        "Estágio em desenvolvimento web e mobile, com projetos em JavaScript, Node.js e React Native.",

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
      footer_apps: "Apps",
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
      go_to_apps: "Ir para seção apps",
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
      typed_strings: ["mobile", "React Native", "TypeScript", "iOS", "Flutter"],
    },
    en: {
      // Menu
      menu_home: "HOME",
      menu_about: "ABOUT",
      menu_skills: "STACK",
      menu_apps: "APPS",
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
        "5+ years building mobile apps with native and cross-platform technologies, from architecture to store release.",
      cta_button: "Get in Touch",
      cta_secondary: "View experience",
      experiences_section: "Go to experience section",

      // Textos da seção sobre
      about_title: "Hello, I'm Pedro :)",
      about_description:
        "I started coding professionally in 2019 and found in mobile what I enjoy most: turning ideas into apps people use every day. I've worked with native iOS, React Native and Flutter, from internal products to apps used by millions of people. Today I build SCond at Segware, from João Pessoa, Brazil.",
      stat_years: "years of experience",
      stat_companies: "companies",
      stat_downloads: "downloads across the apps I worked on",

      // Skills (tech stack)
      skills_subtitle: "Technologies and tools I use every day",
      hybrid_dev_title: "Cross-platform",
      hybrid_dev_desc:
        "React Native and Flutter for iOS and Android apps from a single codebase, with strong typing and consistent UI.",
      native_ios_title: "Native iOS",
      native_ios_desc:
        "Swift and SwiftUI focused on Apple APIs, architecture patterns and code quality.",
      architecture_title: "Architecture",
      architecture_desc:
        "Organized, scalable code built on proven patterns, designed for growing teams and products.",
      quality_title: "Quality",
      quality_desc:
        "Automated tests, static analysis and code review to ship safely and keep the app healthy.",


      // Production apps
      apps: "Apps",
      apps_subtitle:
        "Some of the production apps I worked on. Downloads from Google Play.",
      apps_downloads: "downloads",
      apps_carousel: "Apps I worked on",
      apps_prev: "Previous apps",
      apps_next: "Next apps",
      apps_rating: "rating on the stores",
      app_timfun_desc: "TIM's rewards program. Rated 4.8 on the App Store.",
      app_vivofree_desc: "Points-for-data rewards for Vivo customers.",
      app_prezao_desc:
        "Claro's benefits club for prepaid customers. Rated 4.8 on the App Store.",
      app_nio_desc: "Fiber internet management, formerly Oi Fibra.",
      app_scond_desc:
        "Security and management for condominiums, homes and businesses.",
      app_livelo_desc: "Points and rewards program. Rated 4.8 on the App Store.",
      app_natura_desc: "Perfume and cosmetics shopping. Rated 4.8 on the App Store.",

      // Experience and projects
      experiences_subtitle:
        "5+ years building production apps, from internal products to apps with millions of downloads.",
      exp_bb_role: "Junior Developer",

      // Experiências profissionais
      exp_bb_desc:
        "Web and mobile with Angular and React Native, plus microservices for internal products that streamlined company processes.",
      exp_usemobile_desc:
        "Native iOS apps in Swift, shipping new features following the team's code standards and Git Flow.",
      exp_compass_desc:
        "iOS apps for Natura, Livelo, Dass and Iguatemi 365 with Swift and UIKit, plus React Native on hybrid projects.",
      exp_akross_desc:
        "Rewards and customer service apps for telecom carriers, built with React Native and Flutter, plus a native iOS SDK in Swift.",
      exp_akross_date: "Dec 2023 — May 2026",
      exp_segware_desc:
        "Building SCond, a security and management app for condominiums, with React Native and TypeScript, MVVM architecture and automated tests.",
      exp_segware_date: "May 2026 — Present",
      exp_bb_date: "Sep 2020 — Jun 2021",
      exp_usemobile_date: "Jun 2021 — Sep 2021",
      exp_compass_date: "Oct 2021 — Dec 2023",
      exp_firstdecision_date: "Aug 2019 — Sep 2020",
      exp_firstdecision_desc:
        "Web and mobile development internship, with projects in JavaScript, Node.js and React Native.",

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
      footer_apps: "Apps",
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
      go_to_apps: "Go to apps section",
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

      // Typed (typing effect). "Swift" no lugar de "iOS" evita "I'm a iOS developer".
      typed_strings: ["mobile", "React Native", "TypeScript", "Swift", "Flutter"],
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
