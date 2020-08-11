const request = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof';

const scrapResults = [];

const scrapeJobsHeader = async () => {
  try {
    const htmlResult = await request.get(url);
    const $ = cheerio.load(htmlResult);

    $('.result-info').each((index, element) => {
      const resultTitle = $(element).children('.result-title');
      const title = resultTitle.text();
      const url = resultTitle.attr('href');
      const datePosted = new Date($(element).children('time').attr('datetime'));
      const hood = $(element).find('.result-hood').text();

      const scrapResult = { title, url, datePosted, hood };
      scrapResults.push(scrapResult);
    });

    return scrapResults;
  } catch (err) {
    console.error(err);
  }
};

const scrapeDescription = async (jobsWithHeader) => {
  return await Promise.all(
    jobsWithHeader.map(async (job) => {
      const htmlResult = await request.get(job.url);
      const $ = cheerio.load(htmlResult);
      $('.print-qrcode-container').remove();
      job.description = $('#postingbody').text();
      const officeLocationText = $('#postingbody').find('strong')[0];

      if (officeLocationText) {
        const sibling = officeLocationText.nextSibling;
        job.address = sibling;
      }

      return job;
    })
  );
};

(async () => {
  const jobsWithHeader = await scrapeJobsHeader();
  const jobsFullData = await scrapeDescription(jobsWithHeader);
  console.log(jobsFullData[0].address.data);
})();
