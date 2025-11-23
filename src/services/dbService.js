import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "world.sqlite3");
const db = new Database(dbPath, { readonly: true });

export const getCurrencies = () => {
  // Fetch countries with their currency, flag, and codes
  // We filter out entries without currency or currency_name to ensure valid data
  const query = `
        SELECT 
            name, 
            iso2, 
            iso3, 
            currency, 
            currency_name, 
            currency_symbol, 
            emoji 
        FROM countries 
        WHERE currency IS NOT NULL 
        AND currency != ''
        ORDER BY name ASC
    `;

  try {
    return db.prepare(query).all();
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return [];
  }
};
