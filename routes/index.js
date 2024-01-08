const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/', homeController.home);
router.get('/project/:id/issues',homeController.all_issues);
router.delete('/remove-issue/:project_id/:issue_id' , homeController.remove_issue);
router.delete('/remove-project/pid/:project_id' , homeController.remove_project);
router.use('/Create_Project', require('./CreateProject'));
router.use('/Create_issue', require('./Create_issue'));
router.use('/filteredIssues' , require('./Filter_issues'));
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;