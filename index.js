const express = require("express"); //Import the express dependency
const app = express(); //Instantiate an express app, the main work horse of this server
const port = 5000; //Save the port number where your server will be listening

app.use(express.json());
const browserObject = require("./browser");
const scraperController = require("./pageController");

//Idiomatic expression in express to route and respond to a client request
app.get("/", (req, res) => {
  //get requests to the root ("/") will route here
  res.sendFile("public/index.html", { root: __dirname }); //server responds by sending the index.html file to the client's browser
  //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

app.post("/scrape", async (req, res) => {
  const { urlToScrape } = req.body;
  try {
    //Start the browser and create a browser instance
    const browserInstance = await browserObject.startBrowser();
    // Pass the browser instance to the scraper controller
    const scrappedUrls = await scraperController(browserInstance, urlToScrape);
    browserObject.closeBrowser(browserInstance);
    res.json({ scrappedUrls: scrappedUrls, status: 200 });
  } catch (err) {
    res.json({ message: err, status: 400 });
  }
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
