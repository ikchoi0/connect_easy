const express = require("express");
const router = express.Router();
const getCategory = require("../controllers/category/getCategory");
router.get("/", async (req, res) => {
  getCategory(req, res);
});

module.exports = router;
