const { bannerChanges } = require('./bannerControllers/CU-Banner');
const { getBanner } = require('./bannerControllers/GetBanner');
const addToCart = require('./CartControllers/AddToCart');
const allCart = require('./CartControllers/allCarts');
const { decreaseCartQty } = require('./CartControllers/decreaseCartQty ');
const { deleteCartItem } = require('./CartControllers/DeleteCart');
const { getProducts } = require('./productControllers/GetProducts');
const addProduct = require('./productControllers/ProductAdd');
const updateProduct = require('./productControllers/UpdateProduct');
const getCategorys = require('./userControllers/GetCategory');
const getCategoryCompanys = require('./userControllers/GetCategoryCompany');
const getCompany = require('./userControllers/GetCompany ');
const loggedUser = require('./userControllers/Logged');
const loginUser = require('./userControllers/LoginUser');
const registerUser = require('./userControllers/RegisterUser');
const { updateCoverPic } = require('./userControllers/UpdateCoverPic');


module.exports = {
    //USER MODEL RELATED
    registerUser,
    loginUser,
    getCompany,
    getCategorys,
    getCategoryCompanys,
    loggedUser,
    updateCoverPic,
    //BANNER MODEL RELATED
    bannerChanges,
    getBanner,
    //PRODUCT MODEL RELATED
    addProduct,
    updateProduct,
    getProducts,
    //CART MODEL RELATED
    addToCart,
    decreaseCartQty,
    allCart,
    deleteCartItem

}