"use strict";
const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");
const jssoup = require("jssoup").default;

const url =
  "https://careers.abbvie.com/en/search-jobs/results?ActiveFacetID=798549-683504&CurrentPage=1&RecordsPerPage=100&Distance=100&RadiusUnitType=0&ShowRadius=False&IsPagination=False&FacetTerm=798549&FacetType=2&FacetFilters%5B0%5D.ID=798549&FacetFilters%5B0%5D.FacetType=2&FacetFilters%5B0%5D.Count=7&FacetFilters%5B0%5D.Display=Romania&FacetFilters%5B0%5D.IsApplied=true&FacetFilters%5B0%5D.FieldName=&SearchResultsModuleName=Search+Results&SearchFiltersModuleName=Search+Filters&SortCriteria=0&SortDirection=0&SearchType=3&OrganizationIds=14&ResultsType=0";

const company = { company: "Abbvie" };
let finalJobs = [];

const s = new scraper.ApiScraper(url);
s.headers.headers["Content-Type"] = "application/json";
s.headers.headers["Accept"] = "application/json";
s.headers.headers["Accept-Language"] = "en-GB,en;q=0.9";

s.get()
  .then((res) => {
    const html = res.results;

    const soup = new jssoup(html);

    const jobs = soup.findAll("li", { class: "search-results__item" });

    jobs.forEach((job) => {
      const id = uuid.v4();
      const job_title = job.find("h3").text.trim();
      const job_link =
        "https://careers.abbvie.com" +
        job.find("a", { class: "search-results__job-link" }).attrs.href;
      const city = job
        .find("span", { class: "job-location" })
        .text.split(",")[0]
        .trim();

      finalJobs.push({
        id: id,
        job_title: job_title,
        job_link: job_link,
        country: "Romania",
        city: city,
        company: company.company,
      });
    });
  })
  .then(() => {
    console.log(JSON.stringify(finalJobs, null, 2));

    scraper.postApiPeViitor(finalJobs, company);

    let logo =
      "https://tbcdn.talentbrew.com/company/14/v2_0/img/abbvie-logo-color.svg";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: company.company, logo: logo }]));
  });