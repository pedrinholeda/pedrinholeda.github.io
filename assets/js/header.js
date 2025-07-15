document.addEventListener("DOMContentLoaded", function () {
  // Elementos de controle do menu
  const menuToggle = document.getElementById("menuToggle");
  const menuAberto = document.querySelector(".menu-aberto");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const body = document.body;

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
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menuToggle.checked = false;
      menuAberto.classList.remove("active");
      body.classList.remove("no-scroll");
    });
  });

  // Internacionalização completa
  const translations = {
    pt: {
      // Menu
      menu_about: "SOBRE",
      menu_services: "SERVIÇOS",
      menu_portfolio: "PORTFOLIO",
      menu_contact: "CONTATO",

      // Seções principais
      welcome: "Pedro Léda",
      skills: "Skills",
      services: "Serviços",
      experiences: "Experiências",
      contact: "Contato",

      // Textos da seção início
      intro_text:
        "Trabalho criando aplicativos móveis usando tecnologias nativas e híbridas.",
      cta_button: "Fale Comigo",

      // Textos da seção sobre
      about_title: "Olá, me chamo Pedro :)",
      about_description:
        "Sou desenvolvedor mobile se especializando em desenvolvimento hibrido e nativo, com habilidades adicionais em desenvolvimento frontend. Apaixonado por criar experiências de usuário intuitivas e inovadoras. Constantemente em busca de desafios para expandir minhas habilidades e contribuir para projetos de alto impacto.",

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

      // Textos da seção portfolio
      portfolio_subtitle:
        "Experiência em desenvolvimento, design e criação de projetos digitais.",

      // Textos da seção contato
      contact_title: "Entre em contato",
      contact_description:
        "Tem alguma dúvida, sugestão ou deseja falar? Estamos aqui para ajudar! Entre em contato através do formulário abaixo. Responderei o mais rápido possível!",

      // Formulário
      name_placeholder: "Digite seu nome completo",
      phone_placeholder: "(55) 22222-2222",
      email_placeholder: "Seu melhor email",
      message_placeholder: "Escreva o que você deseja aqui...",
      submit_button: "Enviar",
      sending_text: "Enviando...",

      // Footer
      footer_home: "Início",
      footer_about: "Sobre",
      footer_services: "Serviços",
      footer_portfolio: "Portfolio",
      footer_contact: "Contato",
      copyright: "© 2025 Todos os direitos reservados.",
      developed_by: "Desenvolvido por Pedro│Dev.",

      // Free your mind section
      made_with: "FEITO COM",
      coffee: "CAFÉ",
      and_code: "E CODIGO",

      // Aria labels
      back_to_top: "Voltar ao topo",
      open_menu: "Abrir menu de navegação",
      change_language: "Trocar idioma",
      go_to_home: "Ir para seção início",
      go_to_about: "Ir para seção sobre",
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
    },
    en: {
      // Menu
      menu_about: "ABOUT",
      menu_services: "SERVICES",
      menu_portfolio: "PORTFOLIO",
      menu_contact: "CONTACT",

      // Seções principais
      welcome: "Pedro Léda",
      skills: "Skills",
      services: "Services",
      experiences: "Experiences",
      contact: "Contact",

      // Textos da seção início
      intro_text:
        "I work creating mobile applications using native and hybrid technologies.",
      cta_button: "Get in Touch",

      // Textos da seção sobre
      about_title: "Hello, I'm Pedro :)",
      about_description:
        "I'm a mobile developer specializing in hybrid and native development, with additional skills in frontend development. Passionate about creating intuitive and innovative user experiences. Constantly seeking challenges to expand my skills and contribute to high-impact projects.",

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

      // Textos da seção portfolio
      portfolio_subtitle:
        "Experience in development, design and creation of digital projects.",

      // Textos da seção contato
      contact_title: "Get in touch",
      contact_description:
        "Have any questions, suggestions or want to talk? We're here to help! Get in touch through the form below. I'll respond as quickly as possible!",

      // Formulário
      name_placeholder: "Enter your full name",
      phone_placeholder: "(55) 22222-2222",
      email_placeholder: "Your best email",
      message_placeholder: "Write what you want here...",
      submit_button: "Send",
      sending_text: "Sending...",

      // Footer
      footer_home: "Home",
      footer_about: "About",
      footer_services: "Services",
      footer_portfolio: "Portfolio",
      footer_contact: "Contact",
      copyright: "© 2025 All rights reserved.",
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
    },
  };

  let currentLang = "pt";
  const langToggle = document.getElementById("lang-toggle");

  function updateTexts() {
    try {
      // Atualiza textos com data-i18n
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[currentLang][key]) {
          el.innerText = translations[currentLang][key];
        }
      });

      // Atualiza placeholders
      document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (translations[currentLang][key]) {
          el.setAttribute("placeholder", translations[currentLang][key]);
        }
      });

      // Atualiza valores
      document.querySelectorAll("[data-i18n-value]").forEach((el) => {
        const key = el.getAttribute("data-i18n-value");
        if (translations[currentLang][key]) {
          el.value = translations[currentLang][key];
        }
      });

      // Atualiza aria-labels
      document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
        const key = el.getAttribute("data-i18n-aria-label");
        if (translations[currentLang][key]) {
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
    };
    updateTexts();
  }

  // Melhorias de acessibilidade - navegação por teclado
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuAberto.classList.contains("active")) {
      menuToggle.checked = false;
      menuAberto.classList.remove("active");
      body.classList.remove("no-scroll");
    }
  });
});
