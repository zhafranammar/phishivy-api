import { CheckToUrl, findPhishingByUrl, findSumOfCheck, findTotalUrl } from "../services/PhishingData.js";
import analyzeUrl from "../services/scrapper.js";

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
    console.log(result)
    return res.status(200).json({ success: true, data: findUrl.status === 1 ? true : false });
  }
  const result = Math.random() < 0.5;
  return res.status(200).json({ success: true, data: result });
}

export async function home(req, res) {
  const data = {
    "total_dataset": await findTotalUrl(),
    "total_scan": await findSumOfCheck(),
  };
  res.status(200).json({ success: true, data: data });
}


