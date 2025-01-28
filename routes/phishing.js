import express from "express";
import { analyzeUrlHandler, checkPhishing, home } from "../controllers/phishing.js";

const phishingRoute = express.Router();

phishingRoute.get("/data", home);
phishingRoute.get("/check-phishing", checkPhishing);
phishingRoute.post("/analyze-url", analyzeUrlHandler);

export default phishingRoute;
