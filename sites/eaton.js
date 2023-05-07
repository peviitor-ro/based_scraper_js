"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url =
  "https://jobs.eaton.com/api/jobs?location=Romania&woe=12&stretchUnit=MILES&sortBy=relevance&descending=false&internal=false";

const s = new scraper.ApiScraper(url);

const company = { company: "Eaton" };
let finalJobs = [];

s.get()
  .then((response) => {
    const jobs = response.jobs;

    jobs.forEach((job) => {
      const id = uuid.v4();
      const job_title = job.data.title;
      const job_link =
        "https://jobs.eaton.com/jobs/" +
        job.data.slug +
        "?lang=en-us&previousLocale=en-US";
      const company = "Eaton";
      const country = "Romania";
      const city = "Romania";

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
    });
  })
  .then(() => {
    console.log("Total jobs: " + finalJobs.length);

    const apiKey = "182b157-bb68-e3c5-5146-5f27dcd7a4c8";
    const postPeviitor = scraper.postApiPeViitor(apiKey, finalJobs, company);

    let logo = "https://assets.jibecdn.com/prod/eaton/0.2.148/assets/logo.png";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: "Eaton", logo: logo }]));
  });
