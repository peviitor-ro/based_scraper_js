"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url = "https://www.quanticlab.com/career/"

const company = { company: "QuanticLab" };
let finalJobs = [];

const s = new scraper.Scraper(url);

s.soup.then((soup) => {
    const jobs = soup.find("div", {class:"ut-accordion-module"}).findAll("div", { class: "ut-accordion-module-item " });

    jobs.forEach((job) => {
        const id = uuid.v4();
        const job_title = job.find("h3").text.trim();
        const job_link = url;
        const company = "QuanticLab";
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