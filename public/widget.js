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
    Object.assign(button.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: "9999",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "none",
        background: "#6f00ff",
        color: "#fff",
        fontSize: "24px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.2s",
    });

    button.addEventListener("mouseover", () => (button.style.transform = "scale(1.1)"));
    button.addEventListener("mouseout", () => (button.style.transform = "scale(1)"));

    document.body.appendChild(button);

    // cria iframe
    const iframe = document.createElement("iframe");
    iframe.id = widgetId;
    iframe.src = iframeSrc;
    Object.assign(iframe.style, {
        width: "90vw",
        maxWidth: "320px",
        height: "80vh",
        maxHeight: "600px",
        position: "fixed",
        bottom: "80px",
        right: "20px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        display: "none",
        zIndex: "9998",
        background: "#fff",
        boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
        overflow: "hidden",
    });

    document.body.appendChild(iframe);

    // alterna abrir/fechar com seta
    button.addEventListener("click", () => {
        if (iframe.style.display === "none") {
            iframe.style.display = "block";
            button.innerHTML = "&#x25BC;"; // seta para baixo
        } else {
            iframe.style.display = "none";
            button.innerHTML = "&#x25B2;"; // seta para cima
        }
    });

    // listener para fechar via postMessage do React
    window.addEventListener("message", (event) => {
        if (event.data?.type === "CLOSE_WIDGET") {
            iframe.style.display = "none";
            button.innerHTML = "&#x25B2;";
        }

        if (event.data?.type === "GET_USER_ID") {
            event.source.postMessage(
                { type: "USER_ID", value: window.loggedUserId },
                event.origin
            );
        }
    });
})();