(function () {
    const widgetId = "prova-frontend-bonifiq-widget";
    const buttonId = "prova-frontend-bonifiq-button";

    if (document.getElementById(widgetId)) return; // evitar duplicação

    //ambiente (DEV x PROD)
    const isLocalhost = window.location.hostname === "localhost";
    const iframeSrc = isLocalhost
        ? "http://localhost:5173/"
        : window.location.origin + "/";

    const button = document.createElement("button");
    button.id = buttonId;
    button.innerText = "Abrir Widget";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.zIndex = "9999";
    button.style.padding = "10px 20px";
    button.style.background = "#6f00ff";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.borderRadius = "50px";
    button.style.cursor = "pointer";
    button.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
    button.style.fontSize = "14px";

    document.body.appendChild(button);

    const iframe = document.createElement("iframe");
    iframe.id = widgetId;
    iframe.style.position = "fixed";
    iframe.style.bottom = "70px";
    iframe.style.right = "20px";
    iframe.style.maxWidth = "320px";
    iframe.style.height = "90vh";
    iframe.style.maxHeight = "600px"
    iframe.style.border = "1px solid #ccc";
    iframe.style.borderRadius = "10px";
    iframe.style.display = "none";
    iframe.style.zIndex = "9998";
    iframe.style.background = "#fff";

    iframe.src = iframeSrc;

    document.body.appendChild(iframe);

    // alterna abrir/fechar
    button.addEventListener("click", () => {
        if (iframe.style.display === "none") {
            iframe.style.display = "block";
            button.innerText = "Fechar Widget";
        } else {
            iframe.style.display = "none";
            button.innerText = "Abrir Widget";
        }
    });
})();