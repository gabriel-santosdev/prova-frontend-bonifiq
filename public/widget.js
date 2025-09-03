(function () {
    const widgetId = "prova-frontend-bonifiq-widget";
    const buttonId = "prova-frontend-bonifiq-button";

    if (document.getElementById(widgetId)) return; // evitar duplicação

    // cria botão flutuante
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

    document.body.appendChild(button);

    // cria iframe
    const iframe = document.createElement("iframe");
    iframe.id = widgetId;
    iframe.style.position = "fixed";
    iframe.style.bottom = "70px";
    iframe.style.right = "20px";
    iframe.style.width = "320px";
    iframe.style.height = "600px";
    iframe.style.border = "1px solid #ccc";
    iframe.style.borderRadius = "10px";
    iframe.style.display = "none";
    iframe.style.zIndex = "9998";

    // aponta para o build do Vite
    iframe.src = "http://localhost:5173/";

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