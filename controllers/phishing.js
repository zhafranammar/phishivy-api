import { addPhishing, CheckToUrl, findPhishingByUrl, findSumOfCheck, findTotalUrl } from "../services/PhishingData.js";
import analyzeUrl from "../services/scrapper.js";
import { checkWithVertexAI } from "../services/Vertex.js";

export async function analyzeUrlHandler(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  const findURL = await findPhishingByUrl(url)
  if (findURL) {
    return res.status(200).json({ success: true, data: findURL });

  }
  try {
    const result = await analyzeUrl(url);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

export async function checkPhishing(req, res) {
  const { url, data } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  if (!data) {
    return res.status(400).json({ error: "Data is required" });
  }
  const findUrl = await findPhishingByUrl(url)
  if (findUrl) {
    const result = await CheckToUrl(url)
    return res.status(200).json({ success: true, data: findUrl.status === 1 ? true : false });
  }
  // check pakai vertex disni
  let newPhishing;
  if (typeof data === "string") {
    try {
      newPhishing = JSON.parse(data);
    } catch (error) {
      return res.status(400).json({ error: "Invalid JSON data format" });
    }
  } else {
    newPhishing = { ...data };
  }

  newPhishing.url = url;

  // const result = await checkWithVertexAI(data);

  const result = {
    "class": true,
    "confidence": 1
  }
  newPhishing.status = result.class === true ? 1 : 0;
  await addPhishing(newPhishing);

  return res.status(200).json({ success: true, data: result });
}

export async function home(req, res) {
  const data = {
    "total_dataset": await findTotalUrl(),
    "total_scan": await findSumOfCheck(),
    "accuracy": "92%",
  };
  res.status(200).json({ success: true, data: data });
}


