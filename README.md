# Estudos de React

Repositório dedicado ao estudo de React e JavaScript por meio de exercícios e projetos práticos. A trilha reúne conceitos fundamentais e técnicas para construir interfaces interativas, organizar componentes e trabalhar com dados.

## Conteúdos estudados

- JavaScript aplicado ao React: funções, objetos, arrays, desestruturação, `map` e `filter`.
- Componentes, JSX, props e composição de interfaces.
- Estado com `useState`, eventos e renderização condicional.
- Listas, formulários, inputs controlados e validação.
- Organização de componentes e fluxo de dados entre eles.
- Valores derivados, filtros e atualização de arrays e objetos no estado.
- Efeitos com `useEffect` e persistência no `localStorage`.
- Requisições a APIs e tratamento de carregamento e erros.

## Projeto: lista de tarefas

O projeto em [`lista-tarefas/`](./lista-tarefas) permite adicionar e remover tarefas, marcar tarefas como concluídas e filtrar a lista por situação. As tarefas são salvas no `localStorage` do navegador.

**Tecnologias:** React, JavaScript, Vite e Docker.

## Como executar com Docker

Com o Docker Desktop aberto, acesse a pasta do projeto no PowerShell:

```powershell
cd lista-tarefas
```

Instale as dependências na primeira execução:

```powershell
docker run --rm -it -v "${PWD}:/app" -w /app node:24 npm install
```

Inicie a aplicação:

```powershell
docker run --rm -it -e CHOKIDAR_USEPOLLING=true -p 127.0.0.1:5173:5173 -v "${PWD}:/app" -w /app node:24 npm run dev -- --host 0.0.0.0
```

Acesse [http://localhost:5173](http://localhost:5173). Para encerrar o servidor, pressione `Ctrl + C` no terminal.
