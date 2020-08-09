const request = require('request-promise');
const cheerio = require("cheerio");

const url = "https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof";

(async ()=>{
    try{
        const htmlResult = await request.get(url);
        console.log(htmlResult);
    }catch(err){
        console.error(err);
    }
})()
