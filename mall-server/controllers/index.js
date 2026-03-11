const getCategorys = require('./userControllers/GetCategory');
const getCategoryCompanys = require('./userControllers/GetCategoryCompany');
const getCompany = require('./userControllers/GetCompany ');
const loginUser = require('./userControllers/LoginUser');
const registerUser = require('./userControllers/RegisterUser');


module.exports= {
    registerUser,
    loginUser,
    getCompany,
    getCategorys,
    getCategoryCompanys
}