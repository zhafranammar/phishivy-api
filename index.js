import express from "express";
import bodyParser from "body-parser";
import phishingRoute from "./routes/phishing.js";
import dotenv from "dotenv";

dotenv.config()
const app = express();
const PORT = process.env.PORT || 8000;

console.log(process.env.ALLOWED_ORIGINS)
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",").map(
  (origin) => origin
);

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  let isDomainAllowed = allowedOrigins.indexOf(req.header("Origin")) !== -1;
  if (isDomainAllowed) {
    corsOptions = {
      origin: [req.header("Origin")],
      optionsSuccessStatus: 200,
      credentials: true,
    };
  } else {
    // Disable CORS for this request
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.set("trust proxy", 1);
app.use(cors(corsOptionsDelegate));
app.use(express.json());
// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", phishingRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});