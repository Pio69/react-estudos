import { useEffect, useState } from "react";

import Tarefa from "./Tarefa";
import ListaUsuarios from "./ListaUsuarios";
import BuscaUsuario from "./BuscaUsuario";

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");

    if (tarefasSalvas !== null) {
      return JSON.parse(tarefasSalvas);
    }

    return [
      { id: 1, texto: "Estudar React", concluida: false },
      { id: 2, texto: "Praticar JavaScript", concluida: false },
    ];
  });
  const [texto, setTexto] = useState("");
  const [filtro, setFiltro] = useState("todas");

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === "concluidas") {
      return tarefa.concluida;
    }

    if (filtro === "pendentes") {
      return !tarefa.concluida;
    }

    return true;
  });

  function adicionarTarefa(novaTarefa) {
    if (!novaTarefa.trim()) return;

    const novaTarefaObj = {
      id: crypto.randomUUID(),
      texto: novaTarefa.trim(),
      concluida: false,
    };
    setTarefas([...tarefas, novaTarefaObj]);
  }

  function removerTarefa(id) {
    const tarefasAtualizadas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(tarefasAtualizadas);
  }

  function concluirTarefa(id) {
    const tarefasAtualizadas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    });
    setTarefas(tarefasAtualizadas);
  }

  function enviarTarefa() {
    adicionarTarefa(texto);
    setTexto("");
  }

  return (
    <div>
      <h1>Minhas tarefas</h1>
      <p>Você tem {tarefas.length} tarefas.</p>

      <button onClick={() => setFiltro("todas")}>Todas</button>
      <button onClick={() => setFiltro("pendentes")}>Pendentes</button>
      <button onClick={() => setFiltro("concluidas")}>Concluídas</button>

      <p>Filtro selecionado: {filtro}</p>

      <ul>
        {tarefasVisiveis.map((tarefa) => (
          <Tarefa
            key={tarefa.id}
            tarefa={tarefa}
            aoConcluir={concluirTarefa}
            aoRemover={removerTarefa}
          />
        ))}
      </ul>

      <input
        type="text"
        placeholder="Nova tarefa"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            enviarTarefa();
          }
        }}
      />
      <button onClick={enviarTarefa}>Adicionar</button>
      <ListaUsuarios />
      <BuscaUsuario />
    </div>
  );
}

export default App;
