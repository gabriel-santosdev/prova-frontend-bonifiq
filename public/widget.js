(function () {
    const widgetId = "prova-frontend-bonifiq-widget";
    const buttonId = "prova-frontend-bonifiq-button";

    if (document.getElementById(widgetId)) return;

    const isLocalhost = window.location.hostname === "localhost";
    const iframeSrc = isLocalhost
        ? "http://localhost:5173/"
        : window.location.origin + "/index.html";

    // cria botão flutuante com ícone
    const button = document.createElement("button");
    button.id = buttonId;
    button.innerHTML = "&#x25B2;"; // seta para cima fechada inicialmente
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.zIndex = "9999";
    button.style.width = "50px";
    button.style.height = "50px";
    button.style.borderRadius = "50%";
    button.style.border = "none";
    button.style.background = "#6f00ff";
    button.style.color = "#fff";
    button.style.fontSize = "24px";
    button.style.cursor = "pointer";
    button.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.transition = "transform 0.2s";

    button.addEventListener("mouseover", () => {
        button.style.transform = "scale(1.1)";
    });
    button.addEventListener("mouseout", () => {
        button.style.transform = "scale(1)";
    });

    document.body.appendChild(button);

    // cria iframe
    const iframe = document.createElement("iframe");
    iframe.id = widgetId;
    iframe.src = iframeSrc;
    iframe.style.width = "90vw";
    iframe.style.maxWidth = "320px";
    iframe.style.height = "80vh";
    iframe.style.maxHeight = "600px";
    iframe.style.position = "fixed";
    iframe.style.bottom = "80px";
    iframe.style.right = "20px";
    iframe.style.border = "1px solid #ccc";
    iframe.style.borderRadius = "12px";
    iframe.style.display = "none";
    iframe.style.zIndex = "9998";
    iframe.style.background = "#fff";
    iframe.style.boxShadow = "0 8px 16px rgba(0,0,0,0.3)";
    iframe.style.overflow = "hidden";

    // cria botão X interno no iframe
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "10px";
    closeBtn.style.right = "10px";
    closeBtn.style.border = "none";
    closeBtn.style.background = "transparent";
    closeBtn.style.color = "#6f00ff";
    closeBtn.style.fontSize = "20px";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.zIndex = "10000";

    closeBtn.addEventListener("click", () => {
        iframe.style.display = "none";
        button.innerHTML = "&#x25B2;"; // seta para cima quando fechado
    });

    // adiciona o closeBtn ao iframe depois de carregar
    iframe.addEventListener("load", () => {
        try {
            iframe.contentDocument.body.appendChild(closeBtn);
        } catch (err) {
            // erros cross-domain serão ignorados
        }
    });

    document.body.appendChild(iframe);

    // alterna abrir/fechar com seta
    button.addEventListener("click", () => {
        if (iframe.style.display === "none") {
            iframe.style.display = "block";
            button.innerHTML = "&#x25BC;";
        } else {
            iframe.style.display = "none";
            button.innerHTML = "&#x25B2;";
        }
    });
})();