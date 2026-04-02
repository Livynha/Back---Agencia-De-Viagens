import postgres from "postgres";

const sql = postgres("postgres://postgres:senaisp@192.168.1.49:5432/postgres");

export default sql;
