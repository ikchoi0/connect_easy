const express = require("express");
const router = express.Router();
const getCategory = require("../controllers/category/getCategory");
const getConsultantsWithinCategory = require("../controllers/category/getConsultantsWithinCategory");

router.get("/", async (req, res) => {
  getCategory(req, res);
});

router.get("/:categoryName", getConsultantsWithinCategory);

module.exports = router;
