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

## Publicar na Vercel

1. Envie estes arquivos para um repositório Git (GitHub, GitLab ou Bitbucket).
2. Na Vercel, escolha **Add New → Project** e importe o repositório.
3. A Vercel detecta Vite. Use `npm run build` como comando de build e `dist` como diretório de saída.
4. Publique. Não há variáveis de ambiente nem servidor para configurar.

Também é possível instalar a CLI da Vercel e publicar com `vercel` após entrar na conta; para produção, use `vercel --prod`.

## Roteiro breve para a demonstração

Faça a apresentação presencial com os participantes combinados e peça autorização antes de fotografar. Explique que a pesquisa é pequena, convide cada pessoa a navegar pelo diagnóstico e conversem sobre quais sugestões são viáveis para a realidade da casa. Fotografe apenas a atividade que realmente ocorreu; pode enquadrar a tela e as mãos sem identificar os participantes. Registre o feedback em suas próprias anotações, sem inserir dados pessoais no site.

Antes da visita, abra o site no computador ou celular e teste a conexão. Para uma demonstração sem internet, rode localmente com `npm run dev` e deixe a página aberta no dispositivo. O questionário permanece na tela atual; o checklist persiste naquele navegador.
