const Category = require("../../models/category");

const getCategory = async (req, res) => {
  try {
    const categoryData = await Category.find({});
    const categoryList = categoryData.map((category) => {
      return {
        id: category._id,
        name: category.name,
        description: category.description,
        pictureUrl: category.pictureUrl,
      };
    });
    return res.status(200).send({ categoryList });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = getCategory;
