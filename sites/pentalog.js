"use strict"

const scraper = require(".././peviitor_scraper.js");
const uuid = require('uuid');

const url = "https://www.pentalog.com/api/jobs";

const s = new scraper.ApiScraper(url);
s.headers.headers["Content-Type"] = "application/x-www-form-urlencoded";

let finalJobs = [];
const company = {"company":"Pentalog"};

const data = {
   "MIME Type":"application/x-www-form-urlencoded",
    "action":"search_jobs",
    "index_name":"jobs",
    "prefacets[0][field]":"locations",
    "prefacets[0][limit]":20,
    "prefacets[1][field]":"technologies",
    "prefacets[1][limit]":2000,
    "facets[0][field]":"profile_names",
    "facets[0][limit]":30,
    "facets[1][field]":"is_remote",
    "facets[1][limit]":10,
    "search":"*",
    "ga":"GA1.2.1968100881.1682088935",
    "mkto":"id:232-EET-259&token:_mch-pentalog.com-1682088936408-58463",
    "limit":100,
    "filters[locations][relation]":"or",
    "filters[locations][values][0]":"Iasi, Romania",
    "filters[locations][values][1]":"Craiova, Romania",
    "filters[locations][values][2]":"Timișoara, Romania",
    "filters[locations][values][3]":"Cluj-Napoca, Romania",
    "filters[locations][values][4]":"Bucharest, Romania",
    "filters[locations][values][5]":"Brasov, Romania",
}

s.post(data).then((data) => {
    const jobs = data.data.data;
    jobs.forEach((job) => {
        
            const id = uuid.v4();
            const job_title = job.title;
            const job_link = "https://www.pentalog.com/jobs/" + job.slug;
            const company = "Pentalog";
            const city = job.locations[0].split(",")[0].trim();
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
    })
}).then(() => {
    console.log("Total jobs: " + finalJobs.length);
    scraper.postApiPeViitor(finalJobs, company);
})