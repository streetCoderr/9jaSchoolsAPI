
const ppt = require('puppeteer');

const schoolsInfo = async () => {
  const browser = await ppt.launch();
  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/List_of_universities_in_Nigeria");
  await page.waitForSelector('td');
  
  const val = await page.evaluate(() => {
    const schools = []
    const res = document.querySelectorAll('.mw-parser-output > table tr > td');
    let i = 0;
    
    while (i < res.length) {
      schools.push({
        name: res[i].firstElementChild.innerText.trim(),
        wikiPage: `https://en.wikipedia.org/${res[i].getElementsByTagName('a')[0].getAttribute('href').trim()}`,
        state: res[++i].firstElementChild ? 
          res[i].firstElementChild.innerText.trim() : res[i].innerText.trim(),
        abbreviation: res[++i].innerText.trim(),
        location: res[++i].firstElementChild ? 
          res[i].firstElementChild.innerText.trim() : res[i].innerText.trim(),
        funding: res[++i].innerText.trim(),
        founded: res[++i].innerText.trim(),
      });
      i++;
    }
    return schools;
  })
  await browser.close();
  return val;
};

const run = async () => {
  const res = await schoolsInfo();
  console.log(res)
}
run()