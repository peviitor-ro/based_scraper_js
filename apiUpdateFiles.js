"use strict";

const axios = require("axios");

const url = "https://dev.laurentiumarian.ro/scraper/based_scraper_js/";

axios.post(url, {"update": true}).then((response) => {
    if (response.succes) {
        console.log("Success updating files");
        console.log(response.succes);
    } else {
        console.log("Error updating files");
        console.log(response.error);
    }
}).catch((error) => {
    console.log("Error updating files");
    console.log(error);
});