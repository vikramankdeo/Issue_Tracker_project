const new_project = require('../models/project.js');
const new_issue = require('../models/issues.js');

module.exports.create_issue = function(req, res){
    //adding project in project schema
    //new_project.create(req.body);
    console.log(req.body);
    console.log(req.params.id);
    //return res.render('create_project_view.ejs', { title: 'Create Project' });
    
    return res.render('./create_issue' , {issue_id : req.params.id});
    //return res.send('<h1>project code responded </h1>');
    };
module.exports.add_issue =async function(req , res){
    // Render a template and send it as the response
    //return res.render('create_project_view.ejs', { title: 'Create Project' });
    const id = req.params.id; // Extract the ID from the URL
    const mergedData = {
    ...req.body, // Merge req.body
    pid: id} // Add the ID from req.params to the merged object
    console.log(mergedData);
    const created_issue =await new_issue.create(mergedData);
    new_project.findById(id)
    .then(project => {
        if (!project) {
        throw new Error('Project not found');
        }

        //Push the 'issueId' into the 'issues' array of the project
        project.issues.push(created_issue._id);

    // Save the updated project and return the updated project
    project.save();
  })
  .then(updatedProject => {
    console.log('Updated Project:', updatedProject);
    return res.redirect(`/project/${id}/issues`);
  })
  .catch(err => {
    console.error(err);
  });
    
};