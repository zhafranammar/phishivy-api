import express from "express";
import bodyParser from "body-parser";
import phishingRoute from "./routes/phishing.js";


const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", phishingRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});