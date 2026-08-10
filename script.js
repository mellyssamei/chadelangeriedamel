const CONFIG = {
  sellerWhatsApp: "5531994362097",
  pixKey: "31971755128",
  mapsUrl: "https://maps.app.goo.gl/9GBucQrGywLigAdQ9",
  helpWhatsApp: "5531994362097"
};

const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function heartBurst(origin) {
  const rect = origin.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  for (let i = 0; i < 7; i += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = "♥";
    heart.style.left = `${x + (Math.random() * 50 - 25)}px`;
    heart.style.top = `${y + (Math.random() * 20 - 10)}px`;
    heart.style.setProperty("--drift", `${Math.random() * 60 - 30}px`);
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1400);
  }
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const sellerButton = document.querySelector("#sellerButton");
const sellerHelper = document.querySelector("#sellerHelper");

sellerButton.addEventListener("click", () => {
  heartBurst(sellerButton);

  if (!CONFIG.sellerWhatsApp) {
    showToast("Adicione o WhatsApp da vendedora no arquivo script.js para ativar esse botão.");
    return;
  }

  const message = encodeURIComponent(
    "Oi! Vim pelo convite do Chá de Lingerie da Mel e queria ver as opções de lingerie disponíveis."
  );

  window.open(`https://wa.me/${CONFIG.sellerWhatsApp}?text=${message}`, "_blank", "noopener,noreferrer");
});

if (!CONFIG.sellerWhatsApp) {
  sellerHelper.textContent = "Falta apenas adicionar o número da vendedora no script.js para liberar o WhatsApp desta opção.";
}

const showPixButton = document.querySelector("#showPixButton");
const copyPixButton = document.querySelector("#copyPixButton");
const pixBox = document.querySelector("#pixBox");
const pixKey = document.querySelector("#pixKey");

pixKey.textContent = CONFIG.pixKey;

showPixButton.addEventListener("click", () => {
  heartBurst(showPixButton);
  const isHidden = pixBox.hasAttribute("hidden");

  if (isHidden) {
    pixBox.removeAttribute("hidden");
    showPixButton.textContent = "Ocultar opção PIX";
    pixBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } else {
    pixBox.setAttribute("hidden", "");
    showPixButton.textContent = "Ver opção PIX";
  }
});

copyPixButton.addEventListener("click", async () => {
  heartBurst(copyPixButton);

  try {
    await navigator.clipboard.writeText(CONFIG.pixKey);
    showToast("Chave PIX copiada com sucesso ♥");
  } catch (error) {
    showToast(`Chave PIX: ${CONFIG.pixKey}`);
  }
});

const dados = {
  nome: formData.get("nome"),
  whatsapp: formData.get("whatsapp"),
  presenca: formData.get("presenca"),
  observacao: formData.get("observacao")
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
