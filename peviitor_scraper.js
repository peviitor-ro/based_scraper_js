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

function postApiPeViitor(data, company, apikey = null) {
  const V4cleanUrl = "https://api.peviitor.ro/v4/clean/";
  const V1cleanUrl = "https://api.peviitor.ro/v1/clean/";
  const V4updateUrl = "https://api.peviitor.ro/v4/update/";
  const V1updateUrl = "https://api.peviitor.ro/v1/update/";

  if (apikey == null) {
    apikey = process.env.APIKEY;
  } 

  const scraper = new ApiScraper();
  let resolveApi = "https://dev.laurentiumarian.ro/scraper/based_scraper_js/";
  let status = { status: company.company.toLowerCase() + ".js" };
  axios
    .post(resolveApi, JSON.stringify(status))
    .then((response) => {
      // if (response.data == "active") {
        scraper.url = V4cleanUrl;
        scraper.headers.headers["Content-Type"] =
          "application/x-www-form-urlencoded";
        scraper.headers.headers["apikey"] = apikey;

        scraper.post(company).then(() => {
          scraper.url = V4updateUrl;
          scraper.headers.headers["Content-Type"] = "application/json";

          scraper.post(JSON.stringify(data));
        });
      // } else {
      //   scraper.url = V1cleanUrl;
      //   scraper.headers.headers["Content-Type"] =
      //     "application/x-www-form-urlencoded";
      //   scraper.headers.headers["apikey"] = apikey;

      //   scraper
      //     .post(company)
      //     .then(() => {
      //       scraper.url = V1updateUrl;
      //       scraper.headers.headers["Content-Type"] = "application/json";

      //       scraper.post(JSON.stringify(data));
      //     })
      //     .then(() => {
      //       scraper.url = V4cleanUrl;
      //       scraper.headers.headers["Content-Type"] =
      //         "application/x-www-form-urlencoded";
      //       scraper.headers.headers["apikey"] = apikey;

      //       scraper.post(company);
      //     });
      // }
    })
    .catch((error) => {
      console.log("Error sending trigger for " + file);
      console.log(error);
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
  soup: soup,
};
