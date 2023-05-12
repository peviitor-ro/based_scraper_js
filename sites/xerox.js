"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url =
  "https://xerox.avature.net/en_US/careers/SearchJobs/?5854=%5B970855%5D&5854_format=3770&listFilterMode=1&jobSort=relevancy&jobSortDirection=ASC&jobRecordsPerPage=100&";

const company = { company: "Xerox" };
let finalJobs = [];

const s = new scraper.Scraper(url);

s.soup
  .then((soup) => {
    const jobs = soup.findAll("article", { class: "article--result" });

    jobs.forEach((job) => {
      const id = uuid.v4();
      const job_title = job.find("a").text.trim();
      const job_link = job.find("a").attrs.href;
      const country = "Romania";
      const city = job
        .find("div", { class: "article__header__text__subtitle" })
        .findAll("p")[0]
        .text.split(":")[1]
        .trim();

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

    let logo = "https://1000logos.net/wp-content/uploads/2017/05/Xerox-logo-768x369.png";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: company.company, logo: logo }]));
  });
