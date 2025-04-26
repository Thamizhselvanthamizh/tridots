const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dp = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Thamizh@2003',
  database: 'thamizhh',
  port: 3307
});

dp.connect(err => {
  if (err) {
    console.log("Database connection failed", err);
  } else {
    console.log("MySQL database connected");
  }
});

// CREATE
app.post("/create", (req, res) => {
  const { productName, price, oldPrice, categoryType, is_active, description, categoryList } = req.body;
  const sql = "INSERT INTO thamizh (productName, price, oldPrice, categoryType, is_active, description, categoryList) VALUES (?, ?, ?, ?, ?, ?, ?)";
  dp.query(sql, [productName, price, oldPrice, categoryType, is_active, description, categoryList], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(201).send({ message: "Inserted successfully" });
  });
});

// READ
app.get("/read", (req, res) => {
  const sql = "SELECT * FROM thamizh";
  dp.query(sql, (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).send(result);
  });
});

// UPDATE
app.put("/update/:id", (req, res) => {
  const { productName, price, oldPrice, categoryType, is_active, description, categoryList } = req.body;
  const { id } = req.params;
  const sql = "UPDATE thamizh SET productName=?, price=?, oldPrice=?, categoryType=?, is_active=?, description=?, categoryList=? WHERE id=?";
  dp.query(sql, [productName, price, oldPrice, categoryType, is_active, description, categoryList, id], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).send({ message: "Updated successfully" });
  });
});

// DELETE
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM thamizh WHERE id=?";
  dp.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).send({ message: "Deleted successfully" });
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
