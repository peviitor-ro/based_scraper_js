"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url =
  "https://www.revolut.com/_next/data/2SYk-zqziWN7WKbqUafPT/en-GB/careers.json?city=Romania+-+Remote";

const company = { company: "Revolut" };
let finalJobs = [];

const s = new scraper.ApiScraper(url);

s.get()
  .then((data) => {
    const jobs = data.pageProps.positions;

    jobs.forEach((job) => {
      job.locations.forEach((location) => {
        if (location.country === "Romania") {
          const id = uuid.v4();
          const job_title = job.text;
          const job_link = "https://www.revolut.com/careers/position/" + job.id;
          const company = "Revolut";
          const city = "Romania";
          const country = "Romania";

          console.log(job_title + " -> " + city);

          const j = {
            id: id,
            job_title: job_title,
            job_link: job_link,
            company: company,
            city: city,
            country: country,
          };

          finalJobs.push(j);
        }
      });
    });
  })
  .then(() => {
    console.log("Total jobs: " + finalJobs.length);

    const apiKey = "182b157-bb68-e3c5-5146-5f27dcd7a4c8";
    const postPeviitor = scraper.postApiPeViitor(apiKey, finalJobs, company);

    const logo =
      "https://cdn.icon-icons.com/icons2/3914/PNG/512/revolut_logo_icon_248648.png";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: "Revolut", logo: logo }]));
  });
