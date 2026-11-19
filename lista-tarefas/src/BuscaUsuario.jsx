import { useEffect, useState } from "react";

function BuscaUsuario() {
  const [id, setId] = useState("1");
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    const controlador = new AbortController();

    async function buscarUsuario() {
      try {
        const resposta = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          { signal: controlador.signal },
        );

        if (!resposta.ok) throw new Error("Erro na resposta da API");

        const usuario = await resposta.json();
        if (!controlador.signal.aborted) {
          setResultado({ id, usuario, erro: "" });
        }
      } catch {
        if (controlador.signal.aborted) return;
        setResultado({ id, usuario: null, erro: "Não foi possível buscar o usuário." });
      }
    }

    buscarUsuario();

    return () => {
      controlador.abort();
    };
  }, [id]);

  const carregando = resultado === null || resultado.id !== id;

  return (
    <section>
      <h2>Busca de usuário por ID</h2>
      <label>
        Escolha um ID: {" "}
        <select value={id} onChange={(evento) => setId(evento.target.value)}>
          {Array.from({ length: 10 }, (_, indice) => (
            <option key={indice + 1} value={indice + 1}>
              {indice + 1}
            </option>
          ))}
        </select>
      </label>

      {carregando && <p>Buscando usuário...</p>}
      {!carregando && resultado.erro && <p>{resultado.erro}</p>}
      {!carregando && resultado.usuario && (
        <p>{resultado.usuario.name} — {resultado.usuario.email}</p>
      )}
    </section>
  );
}

export default BuscaUsuario;
