import axios from "axios";
import { GoogleAuth } from "google-auth-library";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config(); // Load .env

const PROJECT_ID = process.env.GOOGLE_PROJECT_ID;
const REGION = process.env.GOOGLE_REGION;
const ENDPOINT_ID = process.env.GOOGLE_ENDPOINT_ID;
const SERVICE_ACCOUNT_PATH = process.env.GOOGLE_CREDENTIALS_PATH;

const SERVICE_ACCOUNT_KEY = JSON.parse(
  fs.readFileSync(path.resolve(SERVICE_ACCOUNT_PATH), "utf-8")
);

const API_URL = `https://${REGION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${REGION}/endpoints/${ENDPOINT_ID}:predict`;

async function getAccessToken() {
  try {
    const auth = new GoogleAuth({
      credentials: SERVICE_ACCOUNT_KEY,
      scopes: ["https://www.googleapis.com/auth/cloud-platform"], // Cek scope yang benar
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    return accessToken;
  } catch (error) {
    console.error("Error getting access token: ", error.message);
    return null;
  }
}


export async function checkWithVertexAI(data) {
  try {
    const token = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${token.token}`,
      "Content-Type": "application/json",
    };
    const formattedData = JSON.parse(data)
    const cleanData = Object.fromEntries(
      Object.entries(formattedData).map(([key, value]) => [key, String(value)])
    );
    const requestData = {
      instances: cleanData,
    };

    const response = await axios.post(API_URL, requestData, { headers });
    const { scores, classes } = response.data.predictions[0];
    console.log(scores)
    console.log(classes)
    let resultClass = 'True'
    let result = {
      confidence: 0,
      class: true
    }
    if (scores[0] > scores[1]) {
      result.confidence = scores[0]
      resultClass = classes[0]
    } else {
      result.confidence = scores[1]
      resultClass = classes[1]
    }
    if (resultClass === 'False') {
      result.class = false
    } else {
      result.class = true
    }
    return result;
  } catch (error) {
    console.error("Error Vertex AI:", error.response?.data || error.message);
    return null;
  }
}
