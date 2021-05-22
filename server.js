const mysql = require('mysql2') //connect to the MYSQL Database
const express = require('express');
const inputCheck = require('./utils/inputCheck');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(    //This code will connect the app to the MYSQL database
    {
        port: 3306,
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'Itprofessional@31',
        database: 'election'
    },
    console.log('Connected to the election database.')
);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// GET a single candidate
// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];
// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// Create a candidate
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });

});


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});
