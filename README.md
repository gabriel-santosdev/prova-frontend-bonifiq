# prova-frontend-bonifiq

## 🧪 Visão Geral

Este projeto é uma prova prática de Front-End. Ele consiste em:

1. **Aplicação React + Vite + TypeScript** que exibe informações de um usuário e seus posts.  
2. **Widget em JavaScript** (`widget.js`) que cria um botão flutuante e um iframe, permitindo incorporar a aplicação React em qualquer site.  
3. **Site fake** para testar o widget localmente.  

O widget é **responsivo**, com botão flutuante com setas, botão X interno no React que fecha o widget, e suporte a **cross-origin** via `postMessage`.  

---

## 📁 Estrutura do Projeto

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

yaml
Copy code

---

## ⚡ Tecnologias

- **React 18 + Vite + TypeScript**
- **Material UI** para estilização
- **react-icons** para ícones (X interno, setas)
- **Fetch API** para consumir endpoints:
  - `https://jsonplaceholder.typicode.com/users/<ID>`
  - `https://jsonplaceholder.typicode.com/posts?userId=<ID>`

---

## 🚀 Como Rodar

### 1️⃣ Rodar a aplicação React (iframe)

1. Instale dependências:

```bash
npm install
Execute o projeto em modo desenvolvimento:

bash
Copy code
npm run dev
A aplicação React estará disponível em http://localhost:5173/.

Este é o endereço usado pelo widget para carregar o iframe localmente.

Para gerar a build (produção):

bash
Copy code
npm run build
Os arquivos finais ficarão em dist/.

2️⃣ Rodar o site fake
Abra a pasta site-fake/ no seu editor ou terminal.

Basta abrir o arquivo index.html no navegador, ou servir via live-server:

bash
Copy code
npx serve site-fake
# ou
live-server site-fake
O site fake deve ter um snippet para incluir o widget:

html
Copy code
<script src="../public/widget.js"></script>
<script>
  window.loggedUserId = 2; // ID do usuário logado
</script>
Ao abrir, você verá o botão flutuante no canto inferior direito.

3️⃣ Inserir o Widget em Qualquer Site
Copie o script public/widget.js para o seu site.

Inclua no <head> ou antes do fechamento do <body>:

html
Copy code
<script src="widget.js"></script>
<script>
  window.loggedUserId = 2; // ID do usuário logado
</script>
O botão flutuante aparecerá automaticamente.

O botão seta ▲/▼ alterna a abertura do iframe.

O botão X interno dentro do iframe envia mensagem para fechar o widget.

🔹 Comunicação entre Widget e React
Parent → Iframe:

O iframe solicita o userId com GET_USER_ID.

O parent responde via postMessage com USER_ID.

Iframe → Parent:

O botão X interno envia CLOSE_WIDGET para o parent.

O widget fecha o iframe automaticamente.

📦 Tipos TypeScript
ts
Copy code
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
🎨 Layout do Widget
Botão flutuante: círculo roxo, seta ▲/▼, hover com scale.

Iframe: max-width 320px, max-height 600px, sombra, borda arredondada.

Interno React: Paper do Material UI com overflow scroll, lista de posts, botão X para fechar.

⚠️ Observações
O iframe funciona em cross-origin graças ao postMessage.

Se usar em produção, ajuste iframeSrc para apontar para os arquivos build (dist/index.html).

Loading e erros são tratados dentro do React (CircularProgress e Alert).