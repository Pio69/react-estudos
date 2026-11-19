import { useState } from "react";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function buscarUsuarios() {
    setCarregando(true);
    setErro("");

    try {
      // Busca os usuários e verifica se a API respondeu com sucesso.
      const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!resposta.ok) throw new Error("Erro na resposta da API");

      // Converte a resposta para JavaScript e atualiza a lista na tela.
      const dados = await resposta.json();
      setUsuarios(dados);
    } catch {
      // Exibe uma mensagem caso a requisição ou a leitura dos dados falhe.
      setErro("Não foi possível carregar os usuários.");
    } finally {
      // Encerra o carregamento, tanto no sucesso quanto no erro.
      setCarregando(false);
    }
  }

  return (
    
    <section>
      <button onClick={buscarUsuarios} disabled={carregando}>Buscar usuários</button>
      <h2>Usuários da API</h2>
      {carregando && <p>Carregando usuários...</p>}
      {erro && <p>{erro}</p>}
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>{usuario.name} - {usuario.email}</li>
        ))}
      </ul>
    </section>
  );
}

export default ListaUsuarios;
