"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url =
  "https://careers.smartrecruiters.com/WNSGlobalServices144/wns-rom-career-page";

const company = { company: "WNS" };
let finalJobs = [];

const s = new scraper.Scraper(url);

s.soup
  .then((soup) => {
    const jobs = soup.findAll("li", { class: "opening-job" });

    jobs.forEach((job) => {
      const id = uuid.v4();
      const job_title = job.find("h4", { class: "details-title" }).text.trim();
      const job_link = job.find("a").attrs.href;
      const country = "Romania";
      const city = "Romania";

      console.log(job_title + " -> " + city);

      finalJobs.push({
        id: id,
        job_title: job_title,
        job_link: job_link,
        country: country,
        city: city,
        company: company.company,
      });
    });
  })
  .then(() => {
    console.log("Total jobs: " + finalJobs.length);

    const apiKey = "182b157-bb68-e3c5-5146-5f27dcd7a4c8";
    const postPeviitor = scraper.postApiPeViitor(apiKey, finalJobs, company);

    let logo =
      "https://www.wnscareers.com/Portals/0/logo.png?ver=2020-02-03-150252-400";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: company.company, logo: logo }]));
  });
