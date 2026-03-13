const User = require("../../models/user");

const updateCoverPic = async (req, res) => {
  try {
    const userId = req.user.id; // verifyToken middleware il ninn varum
console.log(req.file);

    if (!req.file) {
      return res.json({
        status: false,
        message: "Cover image is required"
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        coverPic: req.file.secure_url // cloudinary aanenkil req.file.path
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({
        status: false,
        message: "User not found"
      });
    }

    res.json({
      status: true,
      message: "Cover image updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Server error"
    });
  }
};

module.exports = { updateCoverPic };