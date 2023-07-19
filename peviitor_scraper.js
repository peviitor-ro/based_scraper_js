"use strict";

const axios = require("axios");
const jssoup = require("jssoup").default;
const { Scraper, ApiScraper } = require("./lib");

function postApiPeViitor(data, company, apikey = null) {
  const V4cleanUrl = "https://api.peviitor.ro/v4/clean/";
  const V4updateUrl = "https://api.peviitor.ro/v4/update/";

  const scraper = new ApiScraper();
  const resolveApi = "https://dev.laurentiumarian.ro/scraper/based_scraper_js/";
  const status = { status: `${company.company.toLowerCase()}.js` };
  axios
    .post(resolveApi, JSON.stringify(status))
    .then((response) => {
      // if (response.data == "active") {
      scraper.url = V4cleanUrl;
      scraper.headers.headers["Content-Type"] =
        "application/x-www-form-urlencoded";
      scraper.headers.headers.apikey = apikey || process.env.APIKEY;

      scraper.post(company).then(() => {
        scraper.url = V4updateUrl;
        scraper.headers.headers["Content-Type"] = "application/json";

        scraper.post(JSON.stringify(data));
      });
    })
    .catch((error) => {
      console.log(`Error sending trigger for ${file}`);
      console.log(error);
    });
}

// Utility functions

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const soup = (html) => new jssoup(html);

module.exports = {
  Scraper,
  ApiScraper,
  postApiPeViitor,
  range,
  soup,
};
