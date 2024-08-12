const URL = require("../models/url");
const shortid = require("shortid");
const User = require("../models/user");

async function generateNewShortURL(req, res) {
  if (!req.body.url) {
    return res.status(400).json({ alert: "URL is required" });
  }

  const shortURL = shortid();
  console.log(req.user.id);
  
  await URL.create({
    shortURL: shortURL,
    requiredURL: req.body.url,
    history: [],
    createdBy:req.user.id,
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
    const allURLS=await URL.find({createdBy:req.user.id});
    return res.render("viewAllURL",{
        urls:allURLS,                   
    })
}

async function generateNewURLFromOriginal(req,res){
    return res.render("home");
}

async function handleRestrictedViews(req,res){
  const Users = await User.find({})
  
  const allURLS=await URL.find({});
    return res.render("viewAllURL",{
        urls:allURLS,             
    })
}

module.exports = {
  generateNewShortURL,
  handleRedirectURL,
  handleViewAllURL,
  generateNewURLFromOriginal,
  handleRestrictedViews
};