import { Builder, By, Key, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import path from "path";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function getQualityLinks(movieName) {

    const uBlockPath = path.resolve('E:/Codes/WEBD/dharavahik/lib/ublock.crx');
    const CDpath = path.resolve('E:/Codes/WEBD/dharavahik/lib/chromedriver.exe'); //chromedriver path

    const options = new chrome.Options();

    options.addExtensions(uBlockPath);
    options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');

    const service = new chrome.ServiceBuilder(CDpath);

    let driver;
    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .setChromeService(service)
        .build();

    try {
        const name = movieName.replace(' ', '+');
        await driver.get('https://luxmovies.live');

        const searchBox = await driver.findElement(By.id('s'));
        await searchBox.sendKeys(movieName, Key.RETURN);

        const moviePageElement = await driver.findElement(By.className('listing-content'));
        const moviePage = await moviePageElement.findElement(By.tagName('a')).getAttribute('href');
        if (moviePage) {
            await driver.get(moviePage);
        }
        await sleep(3000);

        await driver.executeScript('window.scrollBy(0, 1500);');

        await driver.wait(until.elementLocated(By.xpath("//a[contains(@onclick, \"formsubmit('https:\")]")), 30000);

        // Find the <a> tag element with the specific 'onclick' attribute
        let elements = await driver.findElements(By.xpath("//a[contains(@onclick, \"formsubmit('https://nexdrive.fun/\")]"));

        const qualityLinks = [];

        for (const element of elements) {
            qualityLinks.push((await element.getAttribute('onclick')).slice(12, -17));
        }

        const h5Elements = await driver.findElements(By.tagName('h5'));
        const qualityNames = [];
        for (const element of h5Elements) {
            if (element) {
                qualityNames.push(await element.getText());
            }
        }

        const goToLinks = {};
        for (let i = 0; i < qualityNames.length; i++) {
            goToLinks[qualityNames[i]] = qualityLinks[i];
        }

        console.log(goToLinks);

        return goToLinks;

    } finally {
        await driver.quit();
    }
}

getQualityLinks('chhichhore');