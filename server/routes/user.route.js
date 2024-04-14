const express = require("express");
const {
    getAll,
    registerUser,
    loginUser,
    logoutUser,
    updateUserRole,
    currentUser,
    updateItem,
    updateUserPassword
} = require('../controller/user.controller');

const upload = require('../middleware/uploadFIles');

const {
    verify_jwt,
    verify_admin,
    isLoggedin
} = require('../middleware/authorization/authenticate');


const router = express.Router();

router.get('/all', getAll);
router.post('/register', isLoggedin, upload.single('img'), registerUser);
router.post('/login', isLoggedin, loginUser);
router.get('/logout', logoutUser);
router.post('/update_role', verify_jwt, verify_admin, updateUserRole);
router.get('/current_user', verify_jwt, currentUser);
router.post('/update/:id', verify_jwt, updateItem);
router.post('/update_password/:id', verify_jwt, updateUserPassword);

module.exports = router;