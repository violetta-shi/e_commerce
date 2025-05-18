const router = require('express').Router();
const categoryRouter = require('express').Router({ mergeParams: true });
const categoriesController = require('../controller/categories.controller');
const {ensureAdminRole} = require("../middleware/authentication.middleware");
const {upload} = require("../middleware/multipartform.middleware");

router.route('/')
    .get(categoriesController.findAll)
    .post(ensureAdminRole, upload.single('image'), categoriesController.createCategory);
module.exports = router;
