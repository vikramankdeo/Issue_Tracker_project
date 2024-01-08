
// module.exports.actionName = function(req, res){}
// Import necessary modules and setup Express app
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Project = require('../models/project'); // Assuming the Mongoose model for 'Project' exists
const Issue = require('../models/issues');

// Route to fetch all records and render them using EJS
module.exports.home = async function(req , res){
  try {
    // Fetch all records from the 'projects' collection
    const projects = await Project.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order

    // Render the 'projects' EJS template and pass the fetched data
    res.render('home_project', { projects });
  } catch (err) {
    res.status(500).send('Error fetching projects');
  }
};

module.exports.all_issues = async function(req , res){
  try {
      console.log(req.params.id);
      const id = req.params.id;
      const project = await Project.find({ _id: id });
      console.log(project[0].title);
      const issues = await Issue.find({ pid: id });
      const distinctLabels = await Issue.distinct('label', { pid: id });
      const distinctAuthors = await Issue.distinct('author' ,{ pid: id });
      console.log(distinctLabels , distinctAuthors);
      return res.render('./issues_home.ejs' , {project :project , issues: issues ,  labels : distinctLabels , authors : distinctAuthors , pid : id});
    } catch (err) {
      console.log("PART");
      res.status(500).json({ message: err.message });
    }
  
}

module.exports.remove_issue = async function(req , res){
  try {
      // Update project to remove issueId from the issues array
      const project_id =req.params.project_id;
      const issue_id = req.params.issue_id;
      console.log("deleting",project_id , issue_id);
      const updateResult = await Project.updateOne(
          { _id: project_id },
          { $pull: { issues: issue_id } }
      );

      if (updateResult.nModified === 0) {
          // Handle case where issueId was not found in the project
          console.log(`Issue ID ${issue_id} not found in the project with ID ${project_id}`);
          return; // Exit the function or throw an error
      }

      // Remove the issue from the issues collection
      const deleteResult = await Issue.deleteOne({ _id: issue_id });

      if (deleteResult.deletedCount === 0) {
          // Handle case where issueId was not found in the issues collection
          console.log(`Issue ID ${issue_id} not found in the issues collection`);
          return; // Exit the function or throw an error
      }

      console.log(`Issue ID ${issue_id} removed successfully from the project and issues collection`);
      // Handle success case
      return res.status(200).json({ success: true, message: 'Project removed successfully' });

  } catch (error) {
      console.error('Error removing issue from project:', error);
      // Handle error
  }
}

module.exports.remove_project = async function(req , res){
  try {
      // Remove project and get the removed project document
      console.log("removing project");
      const project_id =req.params.project_id;
      console.log(project_id);
      const removedProject = await Project.findOneAndDelete({ _id: project_id });
      
      if (!removedProject) {
          // If project doesn't exist or has already been removed
          return { success: false, message: 'Project not found or already removed' };
      }

      // Get the issues associated with the project
      const projectIssues = removedProject.issues;

      // Remove the issues from the Issue collection
      await Issue.deleteMany({ _id: { $in: projectIssues } });
      console.log("working");
      res.status(200).json({ success: true, message: 'Project removed successfully' });

  } catch (error) {
      return { success: false, message: error.message };
  }
}