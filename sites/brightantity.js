"use strict";
const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url = "https://brightantity.com/engineering-product-development-rd/";
const url2 = "https://brightantity.com/it-software-development/";

const s = new scraper.Scraper(url);
const s2 = new scraper.Scraper(url2);

let finalJobs = [];
const company = { company: "brightantity" };

Promise.all([s.soup, s2.soup])
    .then(([soup, soup2]) => {
        const jobsS = Object.values(soup.findAll("h2", { class: "eael-entry-title" }));
        const jobsS2 = Object.values(soup2.findAll("h2", { class: "eael-entry-title" }));
        console.log("Type of jobsS:", typeof jobsS);
        console.log("Type of jobsS2:", typeof jobsS2);
        const jobs = [...jobsS, ...jobsS2];
        jobs.forEach((job) => {
            const id = uuid.v4();
            const job_title = job.find("a").text.trim();
            console.log(job_title);
            const job_link = job.find("a").attrs.href;
            console.log(job_link);
            finalJobs.push({
                id: id,
                job_title: job_title,
                job_link: job_link,
                company: company.company,
                city: "Bucharest",
                country: "Romania",
            });

        })

    })
    .then(() => {
        console.log(JSON.stringify(finalJobs, null, 2));

        scraper.postApiPeViitor(finalJobs, company);

        let logo =
            "https://i0.wp.com/brightantity.com/wp-content/uploads/2020/08/1123Asset-2-1.png?resize=768%2C265&ssl=1";

        let postLogo = new scraper.ApiScraper(
            "https://api.peviitor.ro/v1/logo/add/"
        );
        postLogo.headers.headers["Content-Type"] = "application/json";
        postLogo.post(JSON.stringify([{ id: company.company, logo: logo }]));
    })
