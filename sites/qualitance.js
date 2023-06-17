"use strict";
const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url = "https://qualitance.com/careers/";

const company = { company: "Qualitance" };
let finalJobs = [];

const s = new scraper.Scraper(url);

s.soup
  .then((soup) => {
    const jobs = soup.findAll("div", { class: "career-item-wrap" });

    jobs.forEach((job) => {
      const id = uuid.v4();
      const job_title = job.find("a").text.trim();
      const job_link = job.find("a").attrs.href;

      finalJobs.push({
        id: id,
        job_title: job_title,
        job_link: job_link,
        country: "Romania",
        city: "Romania",
        company: company.company,
      });
    });
  })
  .then(() => {
    console.log(finalJobs);

    scraper.postApiPeViitor(finalJobs, company);

    let logo =
      "https://www.magurelesciencepark.ro/wp-content/uploads/2021/01/logo-Qualitance.jpg";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: company.company, logo: logo }]));
  });
