import express from "express";
import cors from "cors";
import sql from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());


app.get("/produtos", async (req, res) => {
  const produtos = await sql`SELECT * FROM produtos`;
  return res.status(200).json(produtos);
});


app.get("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const produto = await sql`SELECT * FROM produtos WHERE id = ${id}`;
  return res.status(200).json(produto[0]);
});


app.post("/Usuarios/login", async (req, res) => {
  const { email, password } = req.body;

  const usuario = await sql`
    SELECT * FROM usuario WHERE email = ${email} AND senha = ${password}
  `;

  if (usuario[0]) {
   
    const tipo = "user";
    if (usuario[0].email === "admin@empresa.com") {
      tipo = "admin";
    }

    return res.status(200).json({
      email: usuario[0].email,
      nome: usuario[0].nome,
      tipo: tipo
    });
  }

  return res.status(401).json({ mensagem: "Usuário ou senha incorretos" });
});


app.post("/agendamento", async (req, res) => {
  const { nomep, numHospedes, valor } = req.body;

  await sql`
    INSERT INTO Agendamento (nome, numHospedes, valor)
    VALUES (${nomep}, ${numHospedes}, ${valor})
  `;
  return res.status(201).json("Agendado com sucesso!");
});


app.post("/cadastrar", async (req, res) => {
  const { nome, email, password } = req.body;
  try {
    await sql`
      INSERT INTO usuario (nome, email, senha)
      VALUES (${nome}, ${email}, ${password})
    `;
    return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao cadastrar usuário" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
