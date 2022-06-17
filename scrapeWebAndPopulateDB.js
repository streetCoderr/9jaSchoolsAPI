require('dotenv').config()
const ppt = require('puppeteer');
const School = require('./models/school');
const connectDB = require('./db/connect');

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
        year_founded: Number(res[++i].innerText)  ? Number(res[i].innerText) : 0,
      });
      i++;
    }
    return schools;
  })
  await browser.close();
  return val;
};

const runPopulate = async () => {
  try {
    const schools = await schoolsInfo();
    await connectDB(process.env.MONGO_URI);
    await School.deleteMany();
    await School.create(schools);
    console.log('success');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

runPopulate();