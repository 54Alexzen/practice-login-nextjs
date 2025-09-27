import Database from "better-sqlite3";

const db = new Database("data.db");

db.prepare(
  `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        name TEXT
    )`
).run();

export default db;