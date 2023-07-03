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

      finalJobs.push({
        id: id,
        job_title: job_title,
        job_link: job_link,
        company: company.company,
        city: "Romania",
        country: "Romania",
      });
    });
  })
  .then(() => {
    console.log(JSON.stringify(finalJobs, null, 2));

    scraper.postApiPeViitor(finalJobs, company);

    let logo = "https://assets.jibecdn.com/prod/eaton/0.2.148/assets/logo.png";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: company.company, logo: logo }]));
  });