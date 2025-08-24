import mysql from "mysql2/promise";

let _pool;

function getPool() {
  if (!_pool) {
    _pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: true } : undefined,
    });
  }
  return _pool;
}

export async function query(sql, values = []) {
  const pool = getPool();
  const [rows] = await pool.execute(sql, values);
  return rows;
}
