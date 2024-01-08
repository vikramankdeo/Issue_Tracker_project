const express = require('express');
const router = express.Router();

const FilterConrtoller = require('../controllers/filter_controller');
// Route to fetch issues based on label and author selections
router.get('/',FilterConrtoller.filter_issues);    // router called by ajax request when filters are applied
router.get('/home',FilterConrtoller.all_issues);  // default route for issue_home page
router.get('/page/:id/search',FilterConrtoller.search_title_description);  

module.exports = router;