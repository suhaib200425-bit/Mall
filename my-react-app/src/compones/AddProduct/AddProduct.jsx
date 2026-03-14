import React, { useState, useRef } from "react";
import "./AddProduct.css";
import { API_END_POINT } from "../../assets/main";
import axios from "axios";

import { toast } from "react-toastify";
const AddProduct = ({ setProducts }) => {
  const inputRef = useRef();
  const token = localStorage.getItem('token')
  const [productData, setProductData] = useState({
    productName: "",
    rate: "",
    offerRate: null,
    per: "",
    category: "",
    image: null,
  });

  const categories = [
    "Classic AvilMilk",
    "Legends",
    "Fruited Delights",
    "Supreme",
    "Zero Sugar",
    "Tender",
    "Shakes",
    "Kids",
    "Wrap"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // hidden input required issue avoid cheyyan manual check
    if (!productData.image) {
      alert("Please select product image");
      return;
    }

    if (!productData.category) {
      alert("Please select category");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("rate", productData.rate);
    if (productData.offerRate)
      formData.append("offerRate", productData.offerRate);
    formData.append("categoryName", productData.category);
    formData.append("image", productData.image);
    formData.append("per", productData.per);

    console.log("Product Data:", productData);

    axios.post(`${API_END_POINT}/api/product/save`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token
      },
    })
      .then((res) => {
        console.log(res.data)
        if (res.data.status) {
          toast.success(res.data.message)
          setProducts(prev => [res.data.product, ...prev])
          setProductData(
            {
              productName: "",
              rate: "",
              offerRate: null,
              per: "",
              category: "",
              image: null,
            }
          )
        } else {
          toast.error(res.data.message)
        }
      })
      .catch((err) => console.log(err));

    alert("Product Added Successfully");
  };

  return (
    <div
      className="add-product-container"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="add-product-card">
        <h2>Add Product</h2>

        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label className="m-0 p-0">Product Image</label>
            <img
              onClick={() => {
                inputRef.current.click();
              }}
              className="productImage"
              src={
                productData.image
                  ? URL.createObjectURL(productData.image)
                  : "https://i.pinimg.com/1200x/ae/3f/c0/ae3fc0a9ed8e7f4edb630e7492ee22bd.jpg"
              }
              alt="Product Preview"
            />
            <input
              hidden
              ref={inputRef}
              type="file"
              accept="image/*"
              className="m-0"
              onChange={handleImageChange}
            />
          </div>

          <div className="form-group">
            <label className="m-0 p-0">Product Name</label>
            <input
              type="text"
              name="productName"
              className="m-0"
              placeholder="Enter product name"
              value={productData.productName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="form-group col-6">
              <label className="m-0 p-0">Rate</label>
              <input
                className="m-0"
                type="number"
                name="rate"
                placeholder="Enter product rate"
                value={productData.rate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group col-6">
              <label className="m-0 p-0">Offer Rate</label>
              <input
                type="number"
                className="m-0"
                name="offerRate"
                placeholder="Enter offer rate"
                value={productData.offerRate}
                onChange={handleChange}

              />
            </div>
          </div>

          {/* CATEGORY DROPDOWN */}
          <div className="row">
            <div className="form-group col-6">
              <label className="m-0 p-0">Per</label>
              <input
                type="text"
                className="m-0"
                name="per"
                placeholder="per rate"
                value={productData.per}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-6">
              <div className="form-group">
                <label className="m-0 p-0">Category</label>
                <select
                  name="category"
                  className="category-select"
                  value={productData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;