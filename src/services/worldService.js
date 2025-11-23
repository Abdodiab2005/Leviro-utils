import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "world.sqlite3");
const db = new Database(dbPath, { readonly: true });

export const getCountries = ({ page = 1, limit = 10, search = "" }) => {
  const offset = (page - 1) * limit;
  const searchTerm = `%${search}%`;

  // Base query
  let query = `
        SELECT * FROM countries 
        WHERE 1=1
    `;

  const params = [];

  if (search) {
    query += ` AND (
            name LIKE ? OR 
            iso2 LIKE ? OR 
            iso3 LIKE ? OR 
            currency_name LIKE ? OR 
            capital LIKE ? OR
            native LIKE ?
        )`;
    params.push(
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm
    );
  }

  // Count total for pagination
  const countQuery = `SELECT COUNT(*) as total FROM (${query})`;
  const totalResult = db.prepare(countQuery).get(...params);
  const total = totalResult.total;

  // Fetch data
  query += ` ORDER BY name ASC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const data = db.prepare(query).all(...params);

  return {
    data,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getStates = ({ page = 1, limit = 10, search = "" }) => {
  const offset = (page - 1) * limit;
  const searchTerm = `%${search}%`;

  let query = `
        SELECT s.*, c.name as country_name, c.emoji as country_emoji
        FROM states s
        LEFT JOIN countries c ON s.country_id = c.id
        WHERE 1=1
    `;

  const params = [];

  if (search) {
    query += ` AND (
            s.name LIKE ? OR 
            s.state_code LIKE ? OR
            c.name LIKE ?
        )`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  const countQuery = `SELECT COUNT(*) as total FROM (${query})`;
  const totalResult = db.prepare(countQuery).get(...params);
  const total = totalResult.total;

  query += ` ORDER BY s.name ASC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const data = db.prepare(query).all(...params);

  return {
    data,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getCities = ({ page = 1, limit = 10, search = "" }) => {
  const offset = (page - 1) * limit;
  const searchTerm = `%${search}%`;

  let query = `
        SELECT ci.*, s.name as state_name, c.name as country_name, c.emoji as country_emoji
        FROM cities ci
        LEFT JOIN states s ON ci.state_id = s.id
        LEFT JOIN countries c ON ci.country_id = c.id
        WHERE 1=1
    `;

  const params = [];

  if (search) {
    query += ` AND (
            ci.name LIKE ? OR 
            s.name LIKE ? OR
            c.name LIKE ?
        )`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  const countQuery = `SELECT COUNT(*) as total FROM (${query})`;
  const totalResult = db.prepare(countQuery).get(...params);
  const total = totalResult.total;

  query += ` ORDER BY ci.name ASC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const data = db.prepare(query).all(...params);

  return {
    data,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
