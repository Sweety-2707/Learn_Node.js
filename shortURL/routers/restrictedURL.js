const express = require("express");
const { generateNewURLFromOriginal, handleViewAllURL, handleRedirectURL, generateNewShortURL } = require("../controllers/url");

const router =express.Router();

router.post('/url',generateNewShortURL);

router.get('/urls/:shortURL',handleRedirectURL)

router.get('/views',handleViewAllURL)

router.get('/',generateNewURLFromOriginal)

module.exports = router;