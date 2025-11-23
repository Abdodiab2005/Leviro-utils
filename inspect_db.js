import Database from "better-sqlite3";
const db = new Database("data/world.sqlite3");

const tables = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table'")
  .all();
console.log("Tables:", tables);

tables.forEach((table) => {
  const columns = db.prepare(`PRAGMA table_info(${table.name})`).all();
  console.log(`\nSchema for ${table.name}:`, columns);

  // Also print a sample row to see data format
  const sample = db.prepare(`SELECT * FROM ${table.name} LIMIT 1`).get();
  console.log(`Sample row for ${table.name}:`, sample);
});
