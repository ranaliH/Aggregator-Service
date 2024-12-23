const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 6000;

// Database connection details
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Middleware to parse JSON bodies
app.use(express.json());

// Test database connection
db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Endpoint to get aggregate data
app.get('/aggregated-data', (req, res) => {
  // Example aggregation query
  const query = `
    SELECT COUNT(*) as appointmentCount, doctorId FROM appointments
    GROUP BY doctorId
  `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Aggregator Service is running on port ${port}`);
});
