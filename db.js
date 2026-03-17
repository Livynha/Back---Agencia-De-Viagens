import postgres from "postgres";

const sql = postgres("postgres://user:user@localhost:5433/DestinoCerto");

export default sql;
