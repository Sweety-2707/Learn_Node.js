const express = require("express");
const { generateNewURLFromOriginal, handleViewAllURL, handleRedirectURL, generateNewShortURL, handleRestrictedToAdminViews } = require("../controllers/url");
const { restrictAccess } = require("../middlewares/auth");

const router =express.Router();

router.post('/url',generateNewShortURL);

router.get('/urls/:shortURL',handleRedirectURL)

router.get('/views',handleViewAllURL)

router.get('/',generateNewURLFromOriginal)


router.get('/admin/url',restrictAccess(["ADMIN"]),handleRestrictedToAdminViews)

module.exports = router;