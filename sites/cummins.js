"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url = "https://cummins.jobs/rom/jobs/?offset=10&num_items=100&filter_path=%2Fjobs%2F"

const company = { company: "Cummins" };
let finalJobs = [];

const s = new scraper.Scraper(url);

s.soup.then((soup) => {
    const jobs = soup.findAll("li", { class: "direct_joblisting" });

    jobs.forEach((job) => {
        const id = uuid.v4();
        const job_title = job.find("a").text.trim();
        const job_link = "https://cummins.jobs" + job.find("a").attrs.href;
        const company = "Cummins";
        const country = "Romania";
        const city = job.find("span", { class: "hiringPlace" }).text.split(",")[0].trim();

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

    const apiKey = "182b157-bb68-e3c5-5146-5f27dcd7a4c8";
    const postPeviitor = scraper.postApiPeViitor(apiKey, finalJobs, company);

    let logo =
      "https://dn9tckvz2rpxv.cloudfront.net/cummins/img4/logo.svg";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: "Cummins", logo: logo }]));
});