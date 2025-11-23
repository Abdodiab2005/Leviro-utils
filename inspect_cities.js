import Database from "better-sqlite3";
const db = new Database("public/world.sqlite3");

try {
  const columns = db.prepare("PRAGMA table_info(cities)").all();
  console.log("Schema for cities:", columns);

  const sample = db.prepare("SELECT * FROM cities LIMIT 1").get();
  console.log("Sample row for cities:", sample);
} catch (error) {
  console.error("Error checking cities table:", error);
}
