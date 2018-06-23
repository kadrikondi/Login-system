const express =require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const homeController = require('../controllers/homeController')
const {ensureAuthenticated} = require('../helpers/auth')

router.get('/',ensureAuthenticated,homeController.displayHomepage)
router.get('/register',userController.registerpage);
router.post('/register',userController.processregister);
router.get('/login',userController.loginUser);
router.post('/login', userController.loginProcess);
router.get('/logout',userController.logoutprocess);
router.get('/confirm',userController.confirmMail);
router.post('/confirm',userController.confirmMailprocess);


module.exports = router;
