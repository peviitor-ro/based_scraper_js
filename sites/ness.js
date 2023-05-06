"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url = "https://ness-usa.ttcportals.com/search/jobs/in/country/romania"

const company = { company: "Ness" };
let finalJobs = [];

const s = new scraper.Scraper(url);

s.soup.then((soup) => {
    const jobs = soup.findAll("div", { class: "jobs-section__item" });

    jobs.forEach((job) => {
        const id = uuid.v4();
        const job_title = job.find("a").text.trim();
        const job_link = job.find("a").attrs.href;
        const company = "Ness";
        const country = "Romania";
        const city = job.find("div", { class: "large-4" }).text.split(",")[0].replace("Location: ", "").trim();

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
});