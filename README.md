Este é o texto que você me enviou, formatado em Markdown:

# prova-frontend-bonifiq

-----

## 🧪 Visão Geral

Este projeto é uma prova prática de Front-End, que consiste em:

1.  Uma **aplicação React + Vite + TypeScript** para exibir informações de um usuário e seus posts.
2.  Um **widget em JavaScript** (`widget.js`) que cria um botão flutuante e um iframe, permitindo incorporar a aplicação React em qualquer site.
3.  Um **site fake** para testar o widget localmente.

O widget é **responsivo**, possui um botão flutuante com setas para abrir e fechar o iframe, um botão "X" interno no React para fechar o widget, e suporte a **cross-origin** via `postMessage`.

-----

## 📁 Estrutura do Projeto

```
prova-frontend-bonifiq/
├─ public/
│ └─ widget.js # Script do widget a ser incluído em qualquer site
├─ src/
│ ├─ components/
│ │ ├─ UserInfo.tsx # Componente que exibe nome e email
│ │ └─ PostsList.tsx # Componente que exibe lista de posts
│ ├─ types/
│ │ └─ index.ts # Tipos TypeScript (User e Post)
│ └─ App.tsx # Aplicação principal React
├─ site-fake/
│ └─ index.html # Site fake para teste do widget
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ README.md
```

-----

## ⚡ Tecnologias

  - **React 18 + Vite + TypeScript**
  - **Material UI** para estilização
  - **react-icons** para ícones (X interno, setas)
  - **Fetch API** para consumir endpoints:
      - `https://jsonplaceholder.typicode.com/users/<ID>`
      - `https://jsonplaceholder.typicode.com/posts?userId=<ID>`

-----

## 🚀 Como Rodar

### 1️⃣ Rodar a aplicação React (iframe)

1.  Instale as dependências:

<!-- end list -->

```bash
npm install
```

2.  Execute o projeto em modo desenvolvimento:

<!-- end list -->

```bash
npm run dev
```

A aplicação React estará disponível em `http://localhost:5173/`. Este é o endereço usado pelo widget para carregar o iframe localmente.

Para gerar a **build** (produção):

```bash
npm run build
```

Os arquivos finais estarão na pasta `dist/`.

### 2️⃣ Rodar o site fake

O site fake serve para testar o widget localmente sem precisar de outro projeto.

1.  Entre na pasta do site fake:

<!-- end list -->

```bash
cd site-fake
```

2.  Sirva o site usando um servidor local:

<!-- end list -->

```bash
serve .
# ou, se tiver live-server instalado:
live-server .
```

3.  Abra o navegador no endereço indicado pelo servidor (ex: `http://localhost:5000`).

O arquivo `index.html` do site fake já inclui o widget:

```html
<script src="../public/widget.js"></script>
<script>
  window.loggedUserId = 2; // ID do usuário logado
</script>
```

Ao abrir a página, você verá o botão flutuante no canto inferior direito. O botão de seta (▲/▼) alterna a abertura do iframe. O botão "X" interno, dentro do iframe, envia uma mensagem para fechar o widget.

### 3️⃣ Inserir o Widget em Qualquer Site

1.  Copie o script `public/widget.js` para o seu site.

2.  Inclua-o no `<head>` ou antes do fechamento do `<body>`:



```html
<script src="widget.js"></script>
  <script>
        window.loggedUserId = 2;

        window.addEventListener("message", (event) => {
            const iframeEl = document.getElementById("prova-frontend-bonifiq-widget");
            const buttonEl = document.getElementById("prova-frontend-bonifiq-button");

            if (event.data?.type === "CLOSE_WIDGET") {
                if (iframeEl && buttonEl) {
                    iframeEl.style.display = "none";
                    buttonEl.innerHTML = "&#x25B2;";
                }
            }

            if (event.data?.type === "GET_USER_ID") {
                if (iframeEl) {
                    event.source.postMessage(
                        { type: "USER_ID", value: window.loggedUserId },
                        event.origin
                    );
                }
            }
        });

    </script>
```

O botão flutuante aparecerá automaticamente. O botão de seta (▲/▼) alterna a abertura do iframe, e o botão "X" interno dentro do iframe envia uma mensagem para fechá-lo.

-----

### 🔹 Comunicação entre Widget e React

  - **Parent → Iframe**: O iframe solicita o `userId` com `GET_USER_ID`, e o parent responde via `postMessage` com `USER_ID`.
  - **Iframe → Parent**: O botão "X" interno envia `CLOSE_WIDGET` para o parent, e o widget fecha o iframe automaticamente.

-----

### 📦 Tipos TypeScript

```typescript
// src/types/index.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
}
```

### 🎨 Layout do Widget

  - **Botão flutuante**: Círculo roxo com seta ▲/▼ e efeito de `scale` no hover.
  - **Iframe**: `max-width` 320px, `max-height` 600px, com sombra e borda arredondada.
  - **Interno React**: Usa `Paper` do Material UI com `overflow-scroll`, lista de posts e botão "X" para fechar.

-----

### ⚠️ Observações

  - O iframe funciona em **cross-origin** graças ao `postMessage`.
  - Para usar em produção, ajuste `iframeSrc` para apontar para os arquivos de build (`dist/index.html`).
  - `Loading` e erros são tratados dentro do React (com `CircularProgress` e `Alert`).
  - Sempre use `cd site-fake` e `serve .` (ou `live-server .`) para testar o widget localmente.