"use strict";

const axios = require("axios");
const jssoup = require("jssoup").default;

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

function postApiPeViitor(apikey, data, company) {
  const cleanUrl = "https://api.peviitor.ro/v4/clean/";
  const updateUrl = "https://api.peviitor.ro/v4/update/";
  const scraper = new ApiScraper(cleanUrl);

  scraper.headers.headers["Content-Type"] = "application/x-www-form-urlencoded";
  scraper.headers.headers["apikey"] = apikey;

  scraper.post(company).then((d, err) => {
    if (err) {
      console.log(err);
    }
    console.log("Cleaned company: " + company.company);

    scraper.url = updateUrl;
    scraper.headers.headers["Content-Type"] = "application/json";

    scraper.post(JSON.stringify(data)).then((data, err) => {
      if (err) {
        console.log(err);
      }
      console.log("Updated company: " + company.company);
    });
  });
}

// Utility functions

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const soup = (html) => new jssoup(html);

module.exports = {
  Scraper: Scraper,
  ApiScraper: ApiScraper,
  postApiPeViitor: postApiPeViitor,
    range: range,
    soup: soup
};
