const scraperObject = {
  async scraper(browser, url = "http://books.toscrape.com") {
    //https://www.digitalocean.com/community/tutorials/how-to-scrape-a-website-using-node-js-and-puppeteer
    let page = await browser.newPage();
    console.log(`Navigating to ${url}...`);
    // Navigate to the selected page
    await page.goto(url, {
      waitUntil: "networkidle0",
    });

    // Wait for the required DOM to be rendered
    await page.waitForSelector(".page_inner");
    // Get the link to all the required books
    let urls = await page.$$eval("section ol > li", (links) => {
      // Make sure the book to be scraped is in stock
      links = links.filter(
        (link) =>
          link.querySelector(".instock.availability > i").textContent !==
          "In stock"
      );
      // Extract the links from the data
      links = links.map((el) => el.querySelector("h3 > a").href);
      return links;
    });
    // return urls;

    const photos = await page.$$eval("img", (imgs) => {
      return imgs.map((x) => x.src);
    });
    return photos;
    console.log(photos);
  },
};

module.exports = scraperObject;
