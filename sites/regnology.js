"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url = "https://www.regnology.net/en/careers/?city=Romania#jobs";

const company = { company: "Regnology" };
let finalJobs = [];

const s = new scraper.Scraper(url);

s.soup
  .then((soup) => {
    const jobs = soup.find("ul", { class: "link-list" }).findAll("li");

    jobs.forEach((job) => {
      const id = uuid.v4();
      const job_title = job.find("a").text.trim();
      const job_link = "https://www.regnology.net" + job.find("a").attrs.href;
      const city = "Romania";

      console.log(job_title + " -> " + city);

      finalJobs.push({
        id: id,
        job_title: job_title,
        job_link: job_link,
        city: city,
        country: "Romania",
        company: company.company,
      });
    });
  })
  .then(() => {
    console.log("Total jobs: " + finalJobs.length);

    const apiKey = "182b157-bb68-e3c5-5146-5f27dcd7a4c8";
    const postPeviitor = scraper.postApiPeViitor(apiKey, finalJobs, company);

    let logo =
      "https://www.altfi.com/images/companies/regnology.png";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: company.company, logo: logo }]));
  });
