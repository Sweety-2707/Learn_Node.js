const express = require("express");
const { generateNewURLFromOriginal, handleViewAllURL, handleRedirectURL, generateNewShortURL, handleRestrictedViews } = require("../controllers/url");
const { restrictAccess } = require("../middlewares/auth");

const router =express.Router();

router.post('/url',generateNewShortURL);

router.get('/urls/:shortURL',handleRedirectURL)

router.get('/views',handleViewAllURL)

router.get('/',generateNewURLFromOriginal)


router.get('/admin/url',restrictAccess(["ADMIN"]),handleRestrictedViews)

module.exports = router;