"use strict"

const scraper = require(".././peviitor_scraper.js");
const axios = require('axios');
const uuid = require('uuid');

const url = "https://amdaris.com/jobs/";

const s = new scraper.Scraper(url);

const locations = ["bucharest", "timisoara", "romania"]

let finalJobs = [];
const company = {"company":"Amdaris"};

s.soup.then((soup) => {
    let jobs = soup.find('table', {"id":"jobs-data-table"}).find("tbody").findAll("tr");
    for (let job of jobs) {
        
        const location = job.find("td", {"class":"country-role"}).text.trim();
        if (locations.includes(location)) {
            const id = uuid.v4();
            const job_title = job.find("a").text.trim();
            const job_link = job.find("a").attrs.href;
            const company = "Amdaris";
            const city = location;
            const country = "Romania";

            const j = {
                "id": id,
                "job_title": job_title,
                "job_link": job_link,
                "company": company,
                "city": city,
                "country": country
            }

            finalJobs.push(j);

            console.log(job_title + " -> " + city);
        }
    }
}).then(() => {
    console.log("Total jobs: " + finalJobs.length);
    const apiKey = "182b157-bb68-e3c5-5146-5f27dcd7a4c8";
    const postPeviitor = scraper.postApiPeViitor(apiKey, finalJobs, company);
});




