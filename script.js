const CONFIG = {
  sellerWhatsApp: "5531994362097",
  pixKey: "31971755128",
  mapsUrl: "https://maps.app.goo.gl/9GBucQrGywLigAdQ9",
  helpWhatsApp: "5531994362097",
  formUrl: "https://script.google.com/macros/s/AKfycby6R0PH29YKavPuSLT1IaSh5obfQreG63bZNBzpcg5Qzp8z3wHgtDLuQvFpW1QxysRu/exec"
};


// ==============================
// TOAST
// ==============================

const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  if (!toast) {
    alert(message);
    return;
  }

  clearTimeout(toastTimer);

  toast.textContent = message;
  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}


// ==============================
// CORAÇÕES
// ==============================

function heartBurst(origin) {
  if (!origin) return;

  const rect = origin.getBoundingClientRect();

  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  for (let i = 0; i < 7; i++) {
    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.textContent = "♥";

    heart.style.left =
      `${x + (Math.random() * 50 - 25)}px`;

    heart.style.top =
      `${y + (Math.random() * 20 - 10)}px`;

    heart.style.setProperty(
      "--drift",
      `${Math.random() * 60 - 30}px`
    );

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1400);
  }
}


// ==============================
// ANIMAÇÃO AO ROLAR
// ==============================

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  document.querySelectorAll(".reveal").forEach((item) => {
    revealObserver.observe(item);
  });
}


// ==============================
// WHATSAPP DA VENDEDORA
// ==============================

const sellerButton = document.querySelector("#sellerButton");
const sellerHelper = document.querySelector("#sellerHelper");

if (sellerButton) {
  sellerButton.addEventListener("click", () => {
    heartBurst(sellerButton);

    if (!CONFIG.sellerWhatsApp) {
      showToast(
        "O WhatsApp da vendedora ainda não foi adicionado."
      );
      return;
    }

    const message = encodeURIComponent(
      "Oi! Vim pelo convite do Chá de Lingerie da Mel e queria ver as opções de lingerie disponíveis."
    );

    const url =
      `https://wa.me/${CONFIG.sellerWhatsApp}?text=${message}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  });
}

if (sellerHelper && !CONFIG.sellerWhatsApp) {
  sellerHelper.textContent =
    "Falta apenas adicionar o número da vendedora.";
}


// ==============================
// PIX
// ==============================

const showPixButton =
  document.querySelector("#showPixButton");

const pixBox =
  document.querySelector("#pixBox");

const pixKey =
  document.querySelector("#pixKey");

const copyPixButton =
  document.querySelector("#copyPixButton");


if (pixKey) {
  pixKey.textContent = CONFIG.pixKey;
}


// MOSTRAR / ESCONDER PIX

if (showPixButton && pixBox) {
  showPixButton.addEventListener("click", () => {
    heartBurst(showPixButton);

    const isHidden =
      pixBox.hasAttribute("hidden");

    if (isHidden) {
      pixBox.removeAttribute("hidden");

      showPixButton.textContent =
        "Ocultar opção PIX";

      pixBox.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

    } else {
      pixBox.setAttribute("hidden", "");

      showPixButton.textContent =
        "Ver opção PIX";
    }
  });
}


// COPIAR PIX

if (copyPixButton) {
  copyPixButton.addEventListener("click", async () => {
    const chavePix = CONFIG.pixKey;

    heartBurst(copyPixButton);

    try {

      // Se estiver em HTTPS
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {

        await navigator.clipboard.writeText(
          chavePix
        );

      } else {

        // Método alternativo
        const campoTemporario =
          document.createElement("textarea");

        campoTemporario.value = chavePix;

        campoTemporario.style.position =
          "fixed";

        campoTemporario.style.left =
          "-9999px";

        campoTemporario.style.top =
          "-9999px";

        document.body.appendChild(
          campoTemporario
        );

        campoTemporario.focus();
        campoTemporario.select();

        const copiou =
          document.execCommand("copy");

        document.body.removeChild(
          campoTemporario
        );

        if (!copiou) {
          throw new Error(
            "Não foi possível copiar"
          );
        }
      }

      showToast(
        "Chave PIX copiada com sucesso ♥"
      );

      copyPixButton.textContent =
        "PIX copiado ✓";

      setTimeout(() => {
        copyPixButton.textContent =
          "Copiar chave PIX";
      }, 2500);

    } catch (error) {

      console.error(
        "Erro ao copiar PIX:",
        error
      );

      showToast(
        "Chave PIX: " + chavePix
      );
    }
  });
}


// ==============================
// LINKS INTERNOS
// ==============================

document
  .querySelectorAll('a[href^="#"]')
  .forEach((anchor) => {

    anchor.addEventListener(
      "click",
      (event) => {

        const targetId =
          anchor.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    );
  });


// ==============================
// FORMULÁRIO DE PRESENÇA
// ==============================

const formPresenca =
  document.querySelector("#formPresenca");

const mensagemConfirmacao =
  document.querySelector(
    "#mensagemConfirmacao"
  );


if (formPresenca) {

  formPresenca.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      const botao =
        formPresenca.querySelector(
          'button[type="submit"]'
        );

      const textoOriginal =
        botao.textContent;

      const formData =
        new FormData(formPresenca);

      const dados = {

        nome:
          formData.get("nome"),

        whatsapp:
          formData.get("whatsapp"),

        presenca:
          formData.get("presenca"),

        observacao:
          formData.get("observacao")
      };


      botao.disabled = true;

      botao.textContent =
        "Confirmando...";

      if (mensagemConfirmacao) {
        mensagemConfirmacao.textContent =
          "";
      }


      try {

        await fetch(
          CONFIG.formUrl,
          {
            method: "POST",

            mode: "no-cors",

            headers: {
              "Content-Type":
                "text/plain;charset=utf-8"
            },

            body:
              JSON.stringify(dados)
          }
        );


        if (mensagemConfirmacao) {
          mensagemConfirmacao.textContent =
            "Presença confirmada com sucesso ♥";
        }

        formPresenca.reset();


      } catch (error) {

        console.error(
          "Erro ao enviar formulário:",
          error
        );


        if (mensagemConfirmacao) {

          mensagemConfirmacao.textContent =
            "Não foi possível confirmar sua presença. Tente novamente.";
        }

      } finally {

        botao.disabled = false;

        botao.textContent =
          textoOriginal;
      }
    }
  );
}
