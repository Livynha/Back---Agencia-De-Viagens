import express from "express";
import cors from "cors";
import sql from "./db.js";
import { CompararHash, CriarHash } from './utils.js';

const app = express();
app.use(cors());
app.use(express.json());

//Area Usuario
app.post("/cadastro", async (req, res) => {
  const { senha, nome, email } = req.body;

  const hash = await CriarHash(senha, 10)
  console.log("cadastrado");
  const cadastro =
    await sql`INSERT INTO usuario(email, nome, senha) values(${email}, ${nome}, ${hash} )`;
  return res.status(200).json(cadastro[0]);
});

app.post("/login/", async (req, res) => {
  const { email, senha } = req.body;
  const entrar = await sql`select * from usuarios where email = ${email}`;
  if (entrar[0]) {
    const verificar =
      await sql`select * from usuarios where email =${email} and senha= ${senha}`;

    const teste = await CompararHash(senha,
      entrar[0].senha)

    if (teste) {
      return res.status(200).json(verificar[0]);
    }
    return res.status(401).json({ message: "Usuário ou senha incorreto" });
  } else {
    return res.status(404).json("Usuário não encontrado");
  }
});

app.get("/ListarUsers", async (req, res) => {
  const listar = await sql`SELECT id_user, nome FROM usuarios;`
  return res.status(200).json(listar)
})

//Area Reservas
app.post("/Criar_Reserva", async (req, res) => {
  const { } = req.body

  const criar = await sql`INSERT INTO reservas(nome_completo, email, hotel, data_inicio, data_fim) VALUES(${urgencia}, ${funcao}, ${data}, ${localizacao}, ${id_usuario}, ${prazo}, ${responsavel})`;
  return res.status(200).json(criar[0])
})

app.put("/Editar_Reserva/:id", async (req, res) => {
  const { id } = req.params
  const { } = req.body
  const editar = await sql`UPDATE reservas
	SET nivel_urgencia=${urgencia}, funcao=${funcao}, data_requisicao=${data}, localizacao=${localizacao}, prazo=${prazo}, destinatario_req=${responsavel}
	WHERE id_requisicao = ${id}`
  return res.status(200).json(editar)
})

app.delete("/Apagar_Reserva/:id", async (req, res) => {
  const { id } = req.params
  const apagar = await sql`DELETE FROM reservas
WHERE id_requisicao = ${id};
`
  return res.status(200).json(apagar)
})

//Area Agendamentos
app.post("/Criar_Agendamento", async (req, res) => {
  const { } = req.body

  const criar = await sql`INSERT INTO agendamentos(nome_completo, email, hotel, data_inicio, data_fim) VALUES(${urgencia}, ${funcao}, ${data}, ${localizacao}, ${id_usuario}, ${prazo}, ${responsavel})`;
  return res.status(200).json(criar[0])
})

app.put("/Editar_Agendamento/:id", async (req, res) => {
  const { id } = req.params
  const { } = req.body
  const editar = await sql`UPDATE agendamentos
	SET nivel_urgencia=${urgencia}, funcao=${funcao}, data_requisicao=${data}, localizacao=${localizacao}, prazo=${prazo}, destinatario_req=${responsavel}
	WHERE id_requisicao = ${id}`
  return res.status(200).json(editar)
})

app.delete("/Apagar_Agendamento/:id", async (req, res) => {
  const { id } = req.params
  const apagar = await sql`DELETE FROM agendamentos
WHERE id_requisicao = ${id};
`
  return res.status(200).json(apagar)
})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

// CREATE TABLE agendamentos (
// id_agd SERIAL PRIMARY KEY,
// nome_comp VARCHAR(255) NOT NULL,
// email VARCHAR(255) UNIQUE NOT NULL
// num_pessoas VARCHAR(30) NOT NULL,
// forma_pag VARCHAR (50) NOT NULL 