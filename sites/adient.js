"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url =
  " https://adient.wd3.myworkdayjobs.com/wday/cxs/adient/External/jobs";

const s = new scraper.ApiScraper(url);

s.headers.headers["Content-Type"] = "application/json";
s.headers.headers["Accept"] = "application/json";

let data = {
  appliedFacets: { Location_Country: ["f2e609fe92974a55a05fc1cdc2852122"] },
  limit: 20,
  offset: 0,
  searchText: "",
};
s.post(data).then((d, err) => {
  let step = 20;
  let totalJobs = d.total;

  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  let finalJobs = [];
  const company = { company: "Adient" };

  let jobs = [];

  let steps = range(0, totalJobs, step);

  let fetchData = () => {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < steps.length; i++) {
        data["offset"] = steps[i];
        s.post(data).then((d) => {
          let response = d.jobPostings;
          response.forEach((element) => {
            jobs.push(element);
          });
          if (jobs.length === totalJobs) {
            resolve(jobs);
          }
        });
      }
    });
  };

  fetchData().then((jobs) => {
    jobs.forEach((job) => {
      const id = uuid.v4();
      const job_title = job.title;
      const job_link =
        "https://adient.wd3.myworkdayjobs.com/en-US/External" +
        job.externalPath;
      const company = "Adient";
      const city = job.locationsText;
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
    console.log("Total jobs: " + finalJobs.length);
    const apiKey = "182b157-bb68-e3c5-5146-5f27dcd7a4c8";
    const postPeviitor = scraper.postApiPeViitor(apiKey, finalJobs, company);

    let logo =
      "https://www.adient.com/wp-content/uploads/2021/09/Adient_Logo.png";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: "Adient", logo: logo }]));
  });
});
