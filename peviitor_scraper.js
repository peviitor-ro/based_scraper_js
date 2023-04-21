"use strict"

const axios = require('axios');
const jssoup = require('jssoup').default;

class Scraper {
    constructor(url) {
        this.url = url;
        this.user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36";
        this.soup = this.get_soup();
    }

    async get_soup () {
        const response = await axios.get(this.url, {
            headers: {
                'User-Agent': this.user_agent,
            }
        });
        return new jssoup(response.data);
    }

}



module.exports = {
    Scraper: Scraper
}



