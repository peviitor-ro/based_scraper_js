"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url =
  "https://jobs.schaeffler.com/search/?createNewAlert=false&q=&locationsearch=Romania&optionsFacetsDD_country=&optionsFacetsDD_customfield1=&optionsFacetsDD_shifttype=&optionsFacetsDD_lang=&optionsFacetsDD_customfield2=&optionsFacetsDD_customfield4=";

const s = new scraper.Scraper(url);

s.soup.then((soup) => {
  let jobs = [];
  const company = { company: "Schaeffler" };
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  let pattern = /jobRecordsFound: parseInt\("(.*)"\)/g;

  const totalJobs = parseInt(soup.text.match(pattern)[0].split('"')[1]);
  const steps = range(0, totalJobs, 100);

  let fetchData = () => {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < steps.length; i++) {
        let url = `https://jobs.schaeffler.com/tile-search-results/?q=&locationsearch=Romania&startrow=${steps[i]}&_=1682543695317`;
        const s = new scraper.Scraper(url);

        s.soup.then((soup) => {
          let results = soup.findAll("li", { class: "job-tile" });

          results.forEach((job) => {
            const id = uuid.v4();
            const job_title = job.find("a").text.trim();
            const job_link =
              "https://jobs.schaeffler.com" + job.find("a").attrs.href;
            const company = "Schaeffler";
            const city = job
              .find("div", { class: "city" })
              .find("div")
              .text.trim();
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

            jobs.push(j);
          });
          if (jobs.length === totalJobs) {
            resolve(jobs);
          }
        });
      }
    });
  };

  fetchData().then((jobs) => {
    console.log("Jobs found: " + jobs.length);
    const apiKey = "182b157-bb68-e3c5-5146-5f27dcd7a4c8";
    const postPeviitor = scraper.postApiPeViitor(apiKey, jobs, company);
  });
});