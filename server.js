const mysql = require('mysql2') //connect to the MYSQL Database
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to database
const db = mysql.createConnection(    //This code will connect the app to the MYSQL database
    { port: 3306, 
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

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});
app.get('/', (req, res) => {
    res.json({
        messege: 'Hello World'
    });
});
// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
