"use strict"

const scraper = require("../peviitor_scraper.js");
const uuid = require('uuid');

const url = "https://jobs.continental.com/en/api/result-list/pagetype-jobs/";

const s = new scraper.ApiScraper(url);

let data = {
    "tx_conjobs_api[filter][locationSuggestChecksums][]":"97df691231f6e638f96c63c52454e425",
    "tx_conjobs_api[itemsPerPage]":200,
    "tx_conjobs_api[currentPage]":1
}

s.headers.headers['Content-Type'] = 'application/x-www-form-urlencoded';

let totalPages;

s.post(data).then((d, err) => {
    if (err) {
        console.log(err);
    } 
    totalPages = d.result.pagination.pagesCount;
}).then(() => {
    let finalJobs = [];
    const company = {"company":"Continental"};

    let jobs = [];
    
    let fetchData = () =>{
        return new Promise((resolve, reject) => {
            for (let i = 1; i <= totalPages; i++) {
                data["tx_conjobs_api[currentPage]"] = i;
                s.post(data).then((d) => {
                    let response = d.result.list;
                    response.forEach(element => {
                        jobs.push(element);
                        
                    });
                    if (jobs.length === d.result.numFound) {
                        resolve(jobs);
                    };
                });
            };
        });
    };

    fetchData().then((jobs) => {
        jobs.forEach(job => {
            const id = uuid.v4();
            const job_title = job.title;
            const job_link = "https://jobs.continental.com/en/detail-page/job-detail/" + job.url;
            const company = "Continental";
            const city = job.cityLabel;
            const country = job.countryLabel;

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

        });

        console.log("Total jobs: " + finalJobs.length);
        const apiKey = "182b157-bb68-e3c5-5146-5f27dcd7a4c8";
        const postPeviitor = scraper.postApiPeViitor(apiKey, finalJobs, company);
    });
});



