function Tarefa({ tarefa, aoConcluir, aoRemover }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={tarefa.concluida}
          onChange={() => aoConcluir(tarefa.id)}
        />
        {tarefa.texto}
      </label>
      <button onClick={() => aoRemover(tarefa.id)}>Remover</button>
    </li>
  );
}

export default Tarefa;
