const express = require('express');
const router = express.Router();

const AddProjectConrtoller = require('../controllers/add_project_controller');
router.get('/', AddProjectConrtoller.create_project);
router.post('/add_project', AddProjectConrtoller.add_project);


module.exports = router;