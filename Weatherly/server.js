import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();
const apikey = process.env.ApiKey;
const app = express();
const port = 5501;

app.use(cors());
app.use(express.static("Public"));

app.get("/api/weather", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
