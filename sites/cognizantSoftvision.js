"use strict"

const scraper = require(".././peviitor_scraper.js");
const uuid = require('uuid');

const url = "https://www.cognizantsoftvision.com/job-search/?location=romania";

const s = new scraper.Scraper(url);

let finalJobs = [];
const company = {"company":"CognizantSoftvision"};

s.soup.then((soup) => {
    const json = JSON.parse(soup.find("script", {"type":"application/json"}).text);

    json.props.pageProps.jobOpenings.jobs.forEach((job) => {
        if (job.location == "Romania") {
            const id = uuid.v4();
            const job_title = job.title;
            const job_link = "https://www.cognizantsoftvision.com" + job.link;
            const company = "CognizantSoftvision";
            const city = job.location;
            const country = "Romania";

            console.log(job_title + " -> " + city);

            const j = {
                "id": id,
                "job_title": job_title,
                "job_link": job_link,
                "company": company,
                "city": city,
                "country": country
            }

            finalJobs.push(j);
        }
    })
}).then(() => {
    console.log("Total jobs: " + finalJobs.length);
    const apiKey = "182b157-bb68-e3c5-5146-5f27dcd7a4c8";
    const postPeviitor = scraper.postApiPeViitor(apiKey, finalJobs, company);
})