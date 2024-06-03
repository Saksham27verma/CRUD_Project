// entity.js
const pool = require('./db');

async function createEntity(tableName, attributes) {
  const attributeString = attributes.map(attr => `${attr.name} ${attr.type}`).join(', ');
  const queryString = `CREATE TABLE IF NOT EXISTS ${tableName} (${attributeString})`;
  try {
    const result = await pool.query(queryString);
    console.log(`Table ${tableName} created successfully.`);
    return result;
  } catch (error) {
    console.error(`Error creating table ${tableName}:`, error);
    throw error;
  }
}

module.exports = { createEntity };
