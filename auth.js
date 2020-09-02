const request = require('request-promise').defaults({ jar: true });
const fs = require('fs');

async function main() {

    const headers = {
        Referer: 'https://accounts.craigslist.org/login?rp=%2Flogin%2Fhome&rt=L',
    }

    headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebK'
  var options = {
    method: 'POST',
    uri: 'https://accounts.craigslist.org/login',
    form: {
      inputEmailHandle: 'elompv@carpin.org',
      inputPassword: 'mSJru9C2e9sYwiL',
    },
    headers: {
        ...headers
    },
    simple: false,
    followAllRedirects: true,
    jar: true,
  };

  try {
    // const html = await request.post('', {
    //   simple: false,
    //   followAllRedirects: true,
    //   jar: true,

    // });

    const html = await request(options);

    fs.writeFileSync('./login.html', html);
  } catch (err) {
    console.log(err);
  }
}

main();
