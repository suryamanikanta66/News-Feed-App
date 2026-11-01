// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "094d1af6920d407aa1542df7a6b38666"
const BASE_URL = "https://gnews.io/api/v4";

app.get("/news", async (req, res) => {
  const { q = "latest" } = req.query;
  const response = await fetch(`${BASE_URL}/search?q=${q}&lang=en&token=${API_KEY}`);
  const data = await response.json();
  res.json(data);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
