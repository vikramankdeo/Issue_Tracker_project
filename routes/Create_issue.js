const express = require('express');
const router = express.Router();

const CreateIssueConrtoller = require('../controllers/create_issue_controller');
//router.get('/', AddIssueConrtoller.create_project);
router.get('/page/:id', CreateIssueConrtoller.create_issue);
router.post('/page/:id/submitIssue', CreateIssueConrtoller.add_issue);


module.exports = router;