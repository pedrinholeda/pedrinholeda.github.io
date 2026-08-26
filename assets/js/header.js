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

  // Abre/fecha o menu ao mudar o estado do checkbox
  menuToggle.addEventListener("change", function () {
    if (menuToggle.checked) {
      menuAberto.classList.add("active");
      body.classList.add("no-scroll");
    } else {
      menuAberto.classList.remove("active");
      body.classList.remove("no-scroll");
    }
  });

  // Fecha o menu ao clicar em um link de navegação
  [...navLinks, ...desktopNavLinks].forEach((link) => {
    link.addEventListener("click", function () {
      menuToggle.checked = false;
      menuAberto.classList.remove("active");
      body.classList.remove("no-scroll");
    });
  });

  // Header compacto ao rolar
  function handleHeaderScroll() {
    if (!header) return;
    header.classList.toggle("header-scrolled", window.scrollY > 50);
  }
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Destaca seção ativa na navegação
  const sections = document.querySelectorAll("main, section[id]");
  function updateActiveNav() {
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
  }
  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // Internacionalização completa
  const translations = {
    pt: {
      // Menu
      menu_home: "INÍCIO",
      menu_about: "SOBRE",
      menu_skills: "SKILLS",
      menu_services: "SERVIÇOS",
      menu_portfolio: "PORTFOLIO",
      menu_contact: "CONTATO",

      // Seções principais
      welcome: "Pedro Léda",
      skills: "Skills",
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

      // Textos da seção skills
      skills_subtitle: "Competências Principais",
      hybrid_dev_title: "Desenvolvimento Híbrido",
      hybrid_dev_desc:
        "Criação de apps multiplataforma com React Native e Flutter, garantindo desempenho e design responsivo.",
      native_ios_title: "Desenvolvimento Nativo iOS",
      native_ios_desc:
        "Apps nativos para iOS com Swift e SwiftUI, focando em usabilidade e integração com o ecossistema Apple.",
      frontend_title: "Front-End",
      frontend_desc:
        "Desenvolvimento com HTML, CSS e JavaScript, criando interfaces dinâmicas e responsivas com React e Angular.",
      versioning_title: "Versionamento",
      versioning_desc:
        "Gerenciamento de código com Git e Git Flow, garantindo um fluxo de desenvolvimento seguro e organizado.",

      // Textos da seção serviços
      services_subtitle:
        "Desenvolvimento de soluções digitais modernas, responsivas e escaláveis.",
      frontend_service: "Front-End",
      ios_native_service: "iOS Nativo",
      hybrid_service: "Híbrido",
      uiux_service: "UI/UX",
      versioning_service: "Versionamento",
      performance_service: "Performance",
      frontend_service_desc: "Interfaces web responsivas e performáticas",
      ios_native_service_desc: "Apps nativos com Swift e SwiftUI",
      hybrid_service_desc: "Apps multiplataforma com React Native e Flutter",
      uiux_service_desc: "Design centrado no usuário e prototipação",
      versioning_service_desc: "Git Flow e integração contínua",
      performance_service_desc: "Otimização de apps e experiência fluida",

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
        "Desenvolvimento de apps híbridos com React Native e Flutter, além de soluções nativas para iOS com Swift. Foco em performance, experiência do usuário e otimização de código.",
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
      footer_skills: "Skills",
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
      menu_skills: "SKILLS",
      menu_services: "SERVICES",
      menu_portfolio: "PORTFOLIO",
      menu_contact: "CONTACT",

      // Seções principais
      welcome: "Pedro Léda",
      skills: "Skills",
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

      // Textos da seção skills
      skills_subtitle: "Main Competencies",
      hybrid_dev_title: "Hybrid Development",
      hybrid_dev_desc:
        "Creating cross-platform apps with React Native and Flutter, ensuring performance and responsive design.",
      native_ios_title: "Native iOS Development",
      native_ios_desc:
        "Native iOS apps with Swift and SwiftUI, focusing on usability and integration with the Apple ecosystem.",
      frontend_title: "Front-End",
      frontend_desc:
        "Development with HTML, CSS and JavaScript, creating dynamic and responsive interfaces with React and Angular.",
      versioning_title: "Versioning",
      versioning_desc:
        "Code management with Git and Git Flow, ensuring a secure and organized development workflow.",

      // Textos da seção serviços
      services_subtitle:
        "Development of modern, responsive and scalable digital solutions.",
      frontend_service: "Front-End",
      ios_native_service: "Native iOS",
      hybrid_service: "Hybrid",
      uiux_service: "UI/UX",
      versioning_service: "Versioning",
      performance_service: "Performance",
      frontend_service_desc: "Responsive and high-performance web interfaces",
      ios_native_service_desc: "Native apps with Swift and SwiftUI",
      hybrid_service_desc: "Cross-platform apps with React Native and Flutter",
      uiux_service_desc: "User-centered design and prototyping",
      versioning_service_desc: "Git Flow and continuous integration",
      performance_service_desc: "App optimization and smooth experience",

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
        "Hybrid app development with React Native and Flutter, plus native iOS solutions with Swift. Focus on performance, user experience and code optimization.",
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
      footer_skills: "Skills",
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

      // Atualiza botão de idioma
      if (langToggle) {
        langToggle.innerText = currentLang === "pt" ? "EN" : "PT";
      }
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
      menuToggle.checked = false;
      menuAberto.classList.remove("active");
      body.classList.remove("no-scroll");
    }
  });
});
