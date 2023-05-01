"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url = "https://www.zollner.ro/ro/cariera/posturi-disponibile";

const company = { company: "Zollner" };
let finalJobs = [];

const s = new scraper.Scraper(url);

s.soup
  .then((soup) => {
    const jobs = soup.find("ul", { class: "menustellenboerse" }).findAll("li");

    jobs.forEach((job) => {
      const id = uuid.v4();
      const job_title = job.find("a").text.trim();
      const job_link = "https://www.zollner.ro" + job.find("a").attrs.href;
      const company = "Zollner";
      const country = "Romania";
      const city = "Romania";

      console.log(job_title + " -> " + city);

      const jobObj = {
        id: id,
        job_title: job_title,
        job_link: job_link,
        company: company,
        city: city,
        country: country,
      };

      finalJobs.push(jobObj);
    });
  })
  .then(() => {
    console.log("Total jobs: " + finalJobs.length);

    const apiKey = "182b157-bb68-e3c5-5146-5f27dcd7a4c8";
    const postPeviitor = scraper.postApiPeViitor(apiKey, finalJobs, company);

    let logo =
      "https://www.zollner.ro/fileadmin/templatefiles/images/logo.svg";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: "Zollner", logo: logo }]));
  });
