const express = require("express");
const {generateNewShortURL, handleRedirectURL, handleViewAllURL, generateNewURLFromOriginal} = require("../controllers/url")

const router =express.Router();

router.post('/url',generateNewShortURL);

router.get('/urls/:shortURL',handleRedirectURL)

router.get('/views',handleViewAllURL)

router.get('/',generateNewURLFromOriginal)

module.exports=router;