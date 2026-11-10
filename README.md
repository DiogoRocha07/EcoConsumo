# EcoConsumo - Água e Energia

MVP educativo para apoiar uma conversa presencial sobre hábitos de consumo de água e energia. Feito com React, TypeScript e Vite, sem servidor ou banco de dados.

## O que já funciona

- Página inicial com contexto e os resultados da pesquisa exploratória (8 pessoas).
- Questionário interativo de cinco perguntas e recomendações geradas localmente por regras simples.
- Guia de práticas para água, energia e mudança gradual de hábitos.
- Checklist que salva as escolhas apenas no armazenamento local do navegador.
- Layout adaptável a celular e computador, HTML semântico, navegação por teclado, rótulos acessíveis e suporte a movimento reduzido.

As porcentagens refletem somente a pesquisa inicial com oito pessoas; não são estimativas para toda a comunidade. O questionário não envia nem armazena respostas pessoais. As recomendações são educativas e não calculam economia em reais ou litros.

## Executar no computador

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Abra o endereço local mostrado pelo Vite (normalmente `http://localhost:5173`). Para gerar a versão de publicação, rode `npm run build`; para conferir essa versão localmente, use `npm run preview`.

## Testes

```bash
npm test
```

Os testes cobrem as regras que transformam as respostas em recomendações. O checklist é salvo no `localStorage` do navegador usado.
