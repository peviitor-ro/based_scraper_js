"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url =
  "https://www.borgwarner.com/careers/job-search?indexCatalogue=default&wordsMode=0&1Country=Romania";
const company = { company: "BorgWarner" };
let finalJobs = [];
const s = new scraper.Scraper(url);

let logo;

s.soup
  .then((soup) => {
    logo =
      "https://www.borgwarner.com" +
      soup.find("link", { rel: "icon" }).attrs.href;

    const jobs = soup.findAll("h3", { class: "bw-global-list-h3" });

    jobs.forEach((job) => {
      const id = uuid.v4();
      const job_title = job.text.trim();
      const job_link = "https://www.borgwarner.com" + job.find("a").attrs.href;
      const company = "BorgWarner";
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
    });
  })
  .then(() => {
    console.log("Total jobs: " + finalJobs.length);

    const apiKey = "182b157-bb68-e3c5-5146-5f27dcd7a4c8";
    const postPeviitor = scraper.postApiPeViitor(apiKey, finalJobs, company);

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: "BorgWarner", logo: logo }]));
  });
