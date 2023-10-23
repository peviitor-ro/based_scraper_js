"use strict";

const axios = require("axios");
const jssoup = require("jssoup").default;
/**
 * @deprecated Prefer using peviitor_jsscraper library
 */
class Scraper {
  constructor(url) {
    this.url = url;
    this.headers = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
      },
    };
    this.soup = this.get_soup();
  }

  async get_soup() {
    const response = await axios.get(this.url, this.headers);
    return new jssoup(response.data);
  }
}

/**
 * @deprecated Prefer using peviitor_jsscraper library
 */
class ApiScraper {
  constructor(url) {
    this.url = url;
    this.user_agent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36";
    this.headers = {
      headers: {
        "User-Agent": this.user_agent,
      },
    };
  }

  async get() {
    const response = await axios.get(this.url, this.headers);
    return response.data;
  }

  async post(data) {
    const response = await axios.post(this.url, data, this.headers);
    return response.data;
  }
}

/**
 * @deprecated Prefer using peviitor_jsscraper library
 */
async function postApiPeViitor(data, company, apikey) {
  const url = "https://api.peviitor.ro";

  const versions = [1, 4];

  if (typeof apikey === "undefined") {
    apikey = process.env.APIKEY;
  }

  async function clean() {
    versions.map(async (version) => {
      const scraper = new ApiScraper(url + "/v" + version + "/clean/");
      scraper.headers.headers["Content-Type"] =
        "application/x-www-form-urlencoded";
      scraper.headers.headers["apikey"] = apikey;
      return await scraper.post(company);
    });
  }

  async function update() {
    versions.map(async (version) => {
      const scraper = new ApiScraper(url + "/v" + version + "/update/");
      scraper.headers.headers["Content-Type"] = "application/json";
      scraper.headers.headers["apikey"] = apikey;
      return await scraper.post(JSON.stringify(data));
    });
  }

  async function postDataSet() {
    const file = `${company.company.toLowerCase()}.js`;
    const url = `https://dev.laurentiumarian.ro/dataset/based_scraper_js/${file}/`;
    const scraper = new ApiScraper(url);
    const dataObj = {
      data: data.length,
    };
    scraper.headers.headers["Content-Type"] = "application/json";
    scraper.headers.headers["apikey"] = apikey;
    return await scraper.post(JSON.stringify(dataObj));
  }

  await clean();
  await update().then(() => {
    console.log("Success scraping " + company.company);
  });

  await postDataSet();
}

// Utility functions
/**
 * @deprecated Prefer using peviitor_jsscraper library
 */
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

/**
 * @deprecated Prefer using peviitor_jsscraper library
 */
const soup = (html) => new jssoup(html);

module.exports = {
  /**
   * @deprecated Prefer using peviitor_jsscraper library
   */
  Scraper: Scraper,
  /**
   * @deprecated Prefer using peviitor_jsscraper library
   */
  ApiScraper: ApiScraper,
  /**
   * @deprecated Prefer using peviitor_jsscraper library
   */
  postApiPeViitor: postApiPeViitor,
  /**
   * @deprecated Prefer using peviitor_jsscraper library
   */
  range: range,
  /**
   * @deprecated Prefer using peviitor_jsscraper library
   */
  soup: soup,
};
