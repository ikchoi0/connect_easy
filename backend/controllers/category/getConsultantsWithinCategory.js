const Category = require("../../models/category");

const getConsultantsWithinCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;

    if (!categoryName) {
      return res.status(400).send("Please provide a category name");
    }

    const usersWithinCategory = await Category.find({
      name: categoryName,
    }).populate("users");

    return res.status(200).send({ data: usersWithinCategory[0].users });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = getConsultantsWithinCategory;
