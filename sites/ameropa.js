"use strict";
const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url = "https://www.ameropa.ro/ro/joburi-disponibile/";

const company = { company: "ameropa" };
let finalJobs = [];
const SUFFIX = "#:~:text=";
const s = new scraper.Scraper(url);

s.soup
  .then((soup) => {
    const jobs = soup.findAll("a", { class: "elementor-accordion-title" });
    console.log(jobs.length);
    jobs.forEach((job) => {
      const id = uuid.v4();
      const job_title = job.text.trim();
      console.log(job_title);   
      const job_link = "https://www.ameropa.ro/ro/joburi-disponibile/" + SUFFIX + job_title;
      console.log(job_link);

      finalJobs.push({
        id: id,
        job_title: job_title,
        job_link: job_link,
        company: company.company,
        city: "Constanta",
        country: "Romania",
      });
    });
  })
  .then(() => {
    console.log(JSON.stringify(finalJobs, null, 2));
    scraper.postApiPeViitor(finalJobs, company,process.env.Marcel);

    let logo =
      "https://www.bandainamcoent.ro/wp-content/themes/namco/img/logo_small.jpg";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: company.company, logo: logo }]));
  });
