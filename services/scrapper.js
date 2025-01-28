import * as cheerio from "cheerio";

async function analyzeUrl(url) {
  try {
    // Request ke URL
    let cheerioSuccess = true;
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const html = await response.text();
      let $;

      $ = cheerio.load(html);
    } catch (err) {
      console.error("Error loading Cheerio:", err.message);
      cheerioSuccess = false;
    }

    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    const path = urlObj.pathname;

    return {
      length_url: url.length,
      length_hostname: hostname.length,
      ip: /\d+\.\d+\.\d+\.\d+/.test(hostname) ? 1 : 0,
      nb_dots: (url.match(/\./g) || []).length,
      nb_hyphens: (url.match(/-/g) || []).length,
      nb_at: (url.match(/@/g) || []).length,
      nb_qm: (url.match(/\?/g) || []).length,
      nb_and: (url.match(/&/g) || []).length,
      nb_or: (url.match(/\|/g) || []).length,
      nb_eq: (url.match(/=/g) || []).length,
      nb_underscore: (url.match(/_/g) || []).length,
      nb_tilde: (url.match(/~/g) || []).length,
      nb_percent: (url.match(/%/g) || []).length,
      nb_slash: (url.match(/\//g) || []).length,
      nb_star: (url.match(/\*/g) || []).length,
      nb_colon: (url.match(/:/g) || []).length,
      nb_comma: (url.match(/,/g) || []).length,
      nb_semicolumn: (url.match(/;/g) || []).length,
      nb_dollar: (url.match(/\$/g) || []).length,
      nb_space: (url.match(/ /g) || []).length,
      nb_www: (url.match(/www/gi) || []).length,
      nb_com: (url.match(/\.com/gi) || []).length,
      nb_dslash: (url.match(/\/\//g) || []).length,
      http_in_path: path.includes("http") ? 1 : 0,
      https_token: url.startsWith("https") ? 1 : 0,
      ratio_digits_url: (url.match(/\d/g) || []).length / url.length,
      ratio_digits_host: (hostname.match(/\d/g) || []).length / hostname.length,
      punycode: hostname.startsWith("xn--") ? 1 : 0,
      port: hostname.includes(":") ? 1 : 0,
      tld_in_path: path.includes(".com") ? 1 : 0,
      tld_in_subdomain: hostname.includes(".com") ? 1 : 0,
      abnormal_subdomain: (hostname.match(/\./g) || []).length > 2 ? 1 : 0,
      nb_subdomains: (hostname.match(/\./g) || []).length - 1,
      prefix_suffix: hostname.includes("-") ? 1 : 0,
      shortening_service: /bit\.ly|tinyurl\.com/.test(url) ? 1 : 0,
      path_extension: path.includes(".") ? 1 : 0,
      length_words_raw: url.split("/").length,
      char_repeat: Math.max(...Array.from(new Set(url)).map((char) => url.split(char).length - 1)),
      shortest_words_raw: Math.min(...url.split("/").map((word) => word.length)),
      longest_words_raw: Math.max(...url.split("/").map((word) => word.length)),
      avg_words_raw: url.split("/").reduce((acc, word) => acc + word.length, 0) / url.split("/").length,

      // Jika cheerio gagal, fitur ini diisi 0
      nb_hyperlinks: cheerioSuccess ? $("a").length : 0,
      nb_extCSS: cheerioSuccess ? $('link[rel="stylesheet"]').length : 0,
      login_form: cheerioSuccess ? ($('input[type="password"]').length > 0 ? 1 : 0) : 0,
      external_favicon: cheerioSuccess ? ($('link[rel="icon"]').attr("href")?.startsWith("http") ? 1 : 0) : 0,
      links_in_tags: cheerioSuccess ? $("a").length : 0,
      submit_email: cheerioSuccess ? (url.includes("mailto:") ? 1 : 0) : 0,
      iframe: cheerioSuccess ? $("iframe").length : 0,
      onmouseover: cheerioSuccess ? $("[onmouseover]").length : 0,
      empty_title: cheerioSuccess ? (!$("title").text().trim() ? 1 : 0) : 0,
      domain_in_title: cheerioSuccess ? ($("title").text().includes(hostname) ? 1 : 0) : 0,
    };
  } catch (error) {
    console.error("Error scraping URL:", error.message);
    throw new Error("Failed to scrape URL");
  }
}

export default analyzeUrl;
