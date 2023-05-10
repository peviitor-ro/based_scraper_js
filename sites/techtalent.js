"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url = "https://www.techtalent.ro/careers/";

const company = { company: "TechTalent" };
let finalJobs = [];

const s = new scraper.Scraper(url);

s.soup
  .then((soup) => {
    const jobs = soup.findAll("div", { class: "job-box-index-container" });

    jobs.forEach((job) => {
      const id = uuid.v4();
      const job_title = job.find("span", { class: "job-title" }).text.trim();
      const job_link = job.find("a").attrs.href;
      const country = "Romania";
      const city = job.find("span", { class: "job-city" }).text.trim();

      console.log(job_title + " -> " + city);

      finalJobs.push({
        id: id,
        job_title: job_title,
        job_link: job_link,
        company: company.company,
        country: country,
        city: city,
      });
    });
  })
  .then(() => {
    console.log("Total jobs: " + finalJobs.length);

    const apiKey = "182b157-bb68-e3c5-5146-5f27dcd7a4c8";
    const postPeviitor = scraper.postApiPeViitor(apiKey, finalJobs, company);

    let logo =
      "https://www.techtalent.ro/wp-content/uploads/2021/02/logo.png";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: company.company, logo: logo }]));
  });
