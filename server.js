const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sql, poolPromise } = require('./db');  // from your db.js file

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));  // serves index.html, script.js, etc.

// 🧾 GET all file/folder records
app.get('/api/files', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM FileSystem');
    res.json(result.recordset);
  } catch (err) {
    console.error('GET /api/files error:', err);
    res.status(500).send('Error fetching file structure');
  }
});

// 🔁 POST: Update ParentID when node is dragged
app.post('/api/move', async (req, res) => {
  const { draggedId, newParentId } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('draggedId', sql.Int, draggedId)
      .input('newParentId', sql.Int, newParentId)
      .query('UPDATE FileSystem SET ParentID = @newParentId WHERE NodeID = @draggedId');

    res.send({ success: true });
  } catch (err) {
    console.error('POST /api/move error:', err);
    res.status(500).send('Error updating parent');
  }
});

// 📊 GET: Recursive folder size calculation (matches your screenshot)
app.get('/api/folder-sizes', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      WITH RecursiveCTE AS (
        SELECT NodeID AS RootID, NodeID AS ChildID, SizeBytes
        FROM FileSystem
        UNION ALL
        SELECT r.RootID, f.NodeID, f.SizeBytes
        FROM RecursiveCTE r
        JOIN FileSystem f ON f.ParentID = r.ChildID
      )
      SELECT f.NodeID, f.NodeName, SUM(ISNULL(r.SizeBytes, 0)) AS SizeBytes
      FROM FileSystem f
      JOIN RecursiveCTE r ON f.NodeID = r.RootID
      GROUP BY f.NodeID, f.NodeName
      ORDER BY f.NodeID;
    `);

    console.log("📊 FOLDER SIZE RESULTS:", result.recordset);
    res.json(result.recordset);
  } catch (err) {
    console.error('GET /api/folder-sizes error:', err);
    res.status(500).send('Error calculating folder sizes');
  }
});


// 🚀 Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
