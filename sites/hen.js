"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url =
  "https://www.henkel.ro/ajax/collection/ro/1338824-1338824/queryresults/asJson?Career_Level_18682=&Functional_Area_18674=&Digital_1030670=&Locations_279384=Europe&Europe_877522=ROU&search_filter=&startIndex=0&loadCount=10&ignoreDefaultFilterTags=true";

const company = { company: "Henkel" };
let finalJobs = [];

const s = new scraper.ApiScraper(url);

s.get()
  .then((response) => {
    const jobs = response.results;

    jobs.forEach((job) => {
      const id = uuid.v4();
      const job_title = job.title;
      const job_link = "https://www.henkel.ro" + job.link;
      const company = "Henkel";
      const country = "Romania";
      let city;
      try {
        city = job.location.split(",")[1].trim();
      } catch (e) {
        city = "Romania";
      }

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

    scraper.postApiPeViitor(finalJobs, company);

    let logo =
      "https://www.henkel.ro/resource/blob/737324/1129f40d0df611e51758a0d35e6cab78/data/henkel-logo-standalone-svg.svg";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: "Henkel", logo: logo }]));
  });
