import analyzeUrl from "../services/scrapper.js";

export async function analyzeUrlHandler(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const result = await analyzeUrl(url);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function checkPhishing(req, res) {
  const data = req.body;

  // Dummey for check in FE
  const result = Math.random() < 0.5;

  res.status(200).json({ success: true, data: result });
}

export async function home(req, res) {
  // Dummey for check in FE
  const data = {
    "total_dataset": 11290,
    "total_scan": 33970,
  };
  res.status(200).json({ success: true, data: data });
}


