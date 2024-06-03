// index.js
const express = require('express');
const { createEntity } = require('./entity');
const { createEntry, readEntries } = require('./crud');

const app = express();
const PORT = 3000;

app.use(express.json());

// Create Entity endpoint
app.post('/entity', async (req, res) => {
  const { tableName, attributes } = req.body;
  try {
    await createEntity(tableName, attributes);
    res.status(201).send('Entity created successfully.');
  } catch (error) {
    res.status(500).send('Error creating entity.');
  }
});

// CRUD endpoints
app.post('/:tableName', async (req, res) => {
  const { tableName } = req.params;
  const data = req.body;
  try {
    const entry = await createEntry(tableName, data);
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).send('Error creating entry.');
  }
});

app.get('/:tableName', async (req, res) => {
  const { tableName } = req.params;
  try {
    const entries = await readEntries(tableName);
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).send('Error fetching entries.');
  }
});

// Implement update and delete endpoints similarly

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
