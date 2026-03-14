const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true
    },

    categoryName: {
      type: String,
      required: true,
      trim: true
    },

    per: {
      type: String,
      required: true,
      trim: true
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // company user model
      required: true
    },

    rate: {
      type: Number,
      required: true,
      min: 0
    },
    
    offerRate: {
      type: Number,
      min: 0,
      default: null,
      validate: {
        validator: function (value) {
          if (value == null) return true;
          return value <= this.rate;
        },
        message: "Offer rate cannot be greater than rate"
      }
    },

    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);