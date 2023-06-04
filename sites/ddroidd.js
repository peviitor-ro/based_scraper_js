"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url =
  "https://api.storyblok.com/v2/cdn/stories/?version=published&starts_with=vacancies%2F&&&excluding_ids=-1&token=4pOFw3LnvRlerPVVh0AB1Qtt&cv=undefined";

const company = { company: "DDroidd" };
let finalJobs = [];

const s = new scraper.ApiScraper(url);

s.get().then((response) => {
  const jobs = response.stories;

    jobs.forEach((job) => {
        const id = uuid.v4();
        const job_title = job.name;
        const job_link = "https://www.ddroidd.com/" + job.full_slug;
        const company = "DDroidd";
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
}).then(() => {
    console.log("Total jobs: " + finalJobs.length);

    scraper.postApiPeViitor(finalJobs, company);
});
