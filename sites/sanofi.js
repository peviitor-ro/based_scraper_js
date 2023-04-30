"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

let url =
  "https://en.jobs.sanofi.com/search-jobs/results?ActiveFacetID=798549&CurrentPage=1&RecordsPerPage=100&Distance=50&RadiusUnitType=0&ShowRadius=False&IsPagination=False&FacetType=0&FacetFilters%5B0%5D.ID=798549&FacetFilters%5B0%5D.FacetType=2&FacetFilters%5B0%5D.Count=13&FacetFilters%5B0%5D.Display=Romania&FacetFilters%5B0%5D.IsApplied=true&SearchResultsModuleName=Search+Results&SearchFiltersModuleName=Search+Filters&SortCriteria=0&SortDirection=0&SearchType=5&ResultsType=0";

const company = { company: "Sanofi" };
let finalJobs = [];

const s = new scraper.ApiScraper(url);

s.headers.headers["Content-Type"] = "application/json";
s.headers.headers["X-Requested-With"] = "XMLHttpRequest";

s.get()
  .then((d, err) => {
    const soup = scraper.soup(d.results);

    const jobs = soup.find("ul", { class: "job-list" }).findAll("li");

    jobs.forEach((job) => {
      const id = uuid.v4();
      const job_title = job.find("h2").text.trim();
      const job_link = "https://en.jobs.sanofi.com" + job.find("a").attrs.href;
      const company = "Sanofi";
      const country = "Romania";
      const city = job
        .find("span", { class: "job-location" })
        .text.split(",")[0]
        .trim();

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

    const apiKey = "182b157-bb68-e3c5-5146-5f27dcd7a4c8";
    const postPeviitor = scraper.postApiPeViitor(apiKey, finalJobs, company);

    let logo =
      "https://www.sanofi.ro/dam/jcr:9f06f321-3c2b-485f-8a84-b6c33badc56a/logo-header-color-large.png";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: "Sanofi", logo: logo }]));
  });