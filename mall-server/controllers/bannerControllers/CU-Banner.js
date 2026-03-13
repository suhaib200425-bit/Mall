const Banner = require("../../models/banner");

const bannerChanges = async (req, res) => {
  try {

    const { main } = req.query;
    const userId = req.user.id
    const banner = req.file ? req.file.secure_url : null; // multer/cloudinary use cheyyumbo

    if (!userId) {
      return res.json({
        status: false,
        message: "User ID required"
      });
    }

    const existingBanner = await Banner.findOne({ userId });

    let result;

    if (!existingBanner) {
      // CREATE
      result = await Banner.create({
        banner,
        userId,
        main:false
      });

    } else {
      // UPDATE
      result = await Banner.findOneAndUpdate(
        { userId },
        {
          banner: banner || existingBanner.banner,
          main: main !== undefined ? main : false
        },
        { new: true }
      );
    }

    res.json({
      status: true,
      data: result
    });

  } catch (error) {
    res.json({
      status: false,
      message: error.message
    });
  }
};

module.exports = { bannerChanges };