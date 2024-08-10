const URL = require("../models/url");
const shortid = require("shortid");

async function generateNewShortURL(req, res) {
  if (!req.body.url) {
    return res.status(400).json({ alert: "URL is required" });
  }

  const shortURL = shortid();
  await URL.create({
    shortURL: shortURL,
    requiredURL: req.body.url,
    history: [],
  });
  return res.render("home",{
    url:shortURL
  })
  return res.status(200).json({ ShortURL: `${shortURL}` });
}

async function handleRedirectURL(req, res) {
  const shortURL = req.params.shortURL;
  const entry = await URL.findOneAndUpdate(
    {
      shortURL,
    },
    {
      $push: {
        history: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.requiredURL);
}

async function handleViewAllURL(req,res){
    const allURLS=await URL.find({});
    return res.render("viewAllURL",{
        urls:allURLS,                   
    })
}

async function generateNewURLFromOriginal(req,res){
    return res.render("home");
}

module.exports = {
  generateNewShortURL,
  handleRedirectURL,
  handleViewAllURL,
  generateNewURLFromOriginal
};
