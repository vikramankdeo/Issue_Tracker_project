// requiring mongooose because we need to use mongoose as ODS tool
// which will help us to work with db without knowing mongodb
const mongoose = require('mongoose');


const issue = new mongoose.Schema({
   title : {
    type : String , 
    required: true,
    unique : true
   },
   description :{
   type : String,
   required : true 
   },
   label :{
    type : String,
    required : true 
    },
   author : {
    type : String,
    required : true
   },
   pid : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project' // Reference to the issues model
   }
   
}
,
// we want to create two more fields created_at and updated_at
   // created_at - will change when the user is created
   // updated at will change when some thing related to user will change
   // during first sign up created and updated will same
// please make a note that timestamps is the second parameter
// of mongoose.schema()
   {
    timestamps : true
   }
);


const issues = mongoose.model('issues' , issue);

module.exports = issues;











