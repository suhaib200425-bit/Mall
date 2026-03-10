const User = require("../../models/user");

const getCompany = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const skip = (page - 1) * limit;

    const companys = await User.find({ role: { $ne: "user" } })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments({ role: { $ne: "user" } });

    res.json({
      status: true,
      companys,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.json({
      status: false,
      message: error.message
    });
  }
};

module.exports = getCompany