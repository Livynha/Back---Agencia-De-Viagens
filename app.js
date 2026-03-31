import express from "express";
import cors from "cors";
import sql from "./db.js";
import { CompararHash, CriarHash } from './utils.js';

const app = express();
app.use(cors());
app.use(express.json());

//Area Usuario
app.post('/cadastro/user', async (req, res) => {
  const { nome, email, senha } = req.body;

  const hash = await CriarHash(senha, 10)

  await sql`insert into usuarios(nome, email, senha,nivel)values(${nome},${email},${hash},1)`;

  if (res.status(200)) {
    return res.status(200).json("Usuário criado com sucesso");
  } else {
    return res.status(500).json("Erro ao cadastrar usuário");
  }
})

app.post("/usuarios/login", async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await sql`select id_user,nome,nivel,senha from usuarios where email = ${email}`;

  console.log(usuario[0].senha);
  if (usuario[0].length !== 0) {
    const senhaValida = await CompararHash(senha, usuario[0].senha);
    if (senhaValida) {
      return res.status(200).json({id_user: usuario[0].id_user, nome: usuario[0].nome, nivel: usuario[0].nivel});
    }
    return res.status(401).json("Senha incorreta");
  }
  return res.status(401).json("Erro ao cadastrar usuário");
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
  console.log("Servidor rodando na porta 3000 ");
});

// CREATE TABLE agendamentos (
// id_agd SERIAL PRIMARY KEY,
// nome_comp VARCHAR(255) NOT NULL,
// email VARCHAR(255) UNIQUE NOT NULL
// num_pessoas VARCHAR(30) NOT NULL,
// forma_pag VARCHAR (50) NOT NULL 