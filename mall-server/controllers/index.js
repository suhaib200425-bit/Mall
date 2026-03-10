const getCompany = require('./userControllers/GetCompany ');
const loginUser = require('./userControllers/LoginUser');
const registerUser = require('./userControllers/RegisterUser');


module.exports= {
    registerUser,
    loginUser,
    getCompany
}