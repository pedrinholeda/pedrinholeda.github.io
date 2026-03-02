// Formulário de Contato - Validação e Funcionalidade
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");

  if (!form || !submitBtn) return;

  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoading = submitBtn.querySelector(".btn-loading");

  // Função para mostrar loading
  function showLoading() {
    btnText.style.display = "none";
    btnLoading.style.display = "flex";
    submitBtn.disabled = true;
    form.classList.add("loading");
  }

  // Função para esconder loading
  function hideLoading() {
    btnText.style.display = "inline";
    btnLoading.style.display = "none";
    submitBtn.disabled = false;
    form.classList.remove("loading");
  }

  // Função para mostrar mensagem de feedback
  function showFeedback(message, type) {
    // Remove feedback anterior
    const existingFeedback = form.querySelector(".form-feedback");
    if (existingFeedback) {
      existingFeedback.remove();
    }

    // Cria novo feedback
    const feedback = document.createElement("div");
    feedback.className = `form-feedback ${type}`;
    feedback.textContent = message;

    // Insere após o formulário
    form.parentNode.insertBefore(feedback, form.nextSibling);

    // Remove feedback após 5 segundos
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.remove();
      }
    }, 5000);
  }

  // Função para validar email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Função para validar telefone (formato brasileiro)
  function validatePhone(phone) {
    const re = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
    return re.test(phone.replace(/\s/g, ""));
  }

  // Função para limpar erros
  function clearErrors() {
    const errorMessages = form.querySelectorAll(".error-message");
    const errorInputs = form.querySelectorAll(".error");

    errorMessages.forEach((msg) => (msg.textContent = ""));
    errorInputs.forEach((input) => input.classList.remove("error"));
  }

  // Helper para pegar texto traduzido
  const t = (key) => (window.getI18n ? window.getI18n().t(key) : key);

  // Função para validar campo
  function validateField(field, value) {
    const errorElement = document.getElementById(`${field.id}-error`);

    switch (field.type) {
      case "text":
        if (field.name === "nome") {
          if (!value.trim()) {
            field.classList.add("error");
            errorElement.textContent = t("validation_name_required");
            return false;
          }
          if (value.trim().length < 2) {
            field.classList.add("error");
            errorElement.textContent = t("validation_name_min");
            return false;
          }
        }
        break;

      case "email":
        if (!value.trim()) {
          field.classList.add("error");
          errorElement.textContent = t("validation_email_required");
          return false;
        }
        if (!validateEmail(value)) {
          field.classList.add("error");
          errorElement.textContent = t("validation_email_invalid");
          return false;
        }
        break;

      case "tel":
        if (value.trim() && !validatePhone(value)) {
          field.classList.add("error");
          errorElement.textContent = t("validation_phone_invalid");
          return false;
        }
        break;
    }

    // Validação do textarea (mensagem)
    if (field.tagName === "TEXTAREA" && field.hasAttribute("required")) {
      if (!value.trim()) {
        field.classList.add("error");
        errorElement.textContent = t("validation_message_required");
        return false;
      }
    }

    field.classList.remove("error");
    errorElement.textContent = "";
    return true;
  }

  // Validação em tempo real
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", () => {
      validateField(input, input.value);
    });

    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        validateField(input, input.value);
      }
    });
  });

  // Submissão do formulário
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Limpa erros anteriores
    clearErrors();

    // Valida todos os campos
    let isValid = true;
    const requiredFields = form.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      if (!validateField(field, field.value)) {
        isValid = false;
      }
    });

    // Valida campos opcionais que têm valor
    const optionalFields = form.querySelectorAll(
      "input:not([required]), textarea:not([required])"
    );
    optionalFields.forEach((field) => {
      if (field.value.trim() && !validateField(field, field.value)) {
        isValid = false;
      }
    });

    if (!isValid) {
      showFeedback(t("validation_form_errors"), "error");
      return;
    }

    // Mostra loading
    showLoading();

    try {
      // Coleta dados do formulário
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Envia para Formspree
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showFeedback(t("validation_success"), "success");
        form.reset();
      } else {
        throw new Error("Erro ao enviar mensagem");
      }
    } catch (error) {
      console.error("Erro:", error);
      showFeedback(t("validation_error"), "error");
    } finally {
      hideLoading();
    }
  });

  // Melhoria de acessibilidade para navegação por teclado
  const focusableElements = form.querySelectorAll("input, textarea, button");
  focusableElements.forEach((element, index) => {
    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.type !== "textarea") {
        e.preventDefault();
        const nextElement = focusableElements[index + 1];
        if (nextElement) {
          nextElement.focus();
        }
      }
    });
  });
});

// Função para máscara de telefone
function maskPhone(input) {
  let value = input.value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  value = value.replace(/(-\d{4})\d+?$/, "$1");
  input.value = value;
}

// Aplica máscara de telefone
document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("telefone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      maskPhone(this);
    });
  }
});
