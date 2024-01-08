const new_project = require('../models/project.js');
const new_issue = require('../models/issues.js');
module.exports.add_project = function(req, res){
    //adding project in project schema
    new_project.create(req.body);
    console.log(req.body);
    //return res.render('create_project_view.ejs', { title: 'Create Project' });
    return res.redirect('/');
    };
module.exports.create_project = function(req , res){
    // Render a template and send it as the response
    //const issue = new_issue.create(req.body);
    return res.render('create_project_view.ejs', { title: 'Create Project'});
}
