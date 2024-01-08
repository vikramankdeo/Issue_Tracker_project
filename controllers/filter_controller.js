const Issue = require('../models/issues'); // Import your Issue model


module.exports.filter_issues =  async (req, res) => {
    console.log("filter_issue called");
    try {
      const { labels, authors } = req.query;
  
      // Create an empty filter object
      const filter = {};
  
      // If labels are selected, add them to the filter
      if (labels) {
        filter.label = { $in: labels.split(',') };
      }
  
      // If authors are selected, add them to the filter
      if (authors) {
        filter.author = { $in: authors.split(',') };
      }
      console.log(filter);
      // Find issues based on the filter
      const filteredIssues = await Issue.find(filter);
      console.log(filteredIssues);
        return res.json(filteredIssues);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
  }

  module.exports.all_issues = async function(req , res){
    try {
        const distinctLabels = await Issue.distinct('label');
        const distinctAuthors = await Issue.distinct('author');
        console.log(distinctLabels , distinctAuthors);
        return res.render('./issues_home.ejs' , {labels : distinctLabels , authors : distinctAuthors});
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    
  }

  module.exports.search_title_description = async function(req , res){
        const searchText = req.query.text; // Get the search text from the query parameters
        const id = req.params.id;
        console.log(id);
        console.log(searchText);
        try {
          // Perform a search in your MongoDB database
          //filter this by id as well which ia passed in req.params.id
        //   const foundIssues = await Issue.find({
        //     $or: [
        //         { title: { $regex: searchText, $options: 'i' } }, // Case-insensitive search in 'title' field
        //         {
        //           $or: [
        //             { description: { $regex: searchText, $options: 'i' } }, // Case-insensitive search for partial match in 'description'
        //             { description: searchText } // Exact match in 'description'
        //           ]
        //         }
        //       ]
            
        // }) 
        //   ;

        const foundIssues = await Issue.find({
          $and: [
            { pid: req.params.id }, // Match by specific pid (req.params.id)
            {
              $or: [
                { title: { $regex: searchText, $options: 'i' } }, // Case-insensitive search in 'title' field
                {
                  $or: [
                    { description: { $regex: searchText, $options: 'i' } }, // Case-insensitive search for partial match in 'description'
                    { description: searchText } // Exact match in 'description'
                  ]
                }
              ]
            }
          ]
        });
        
          console.log(foundIssues);
          return res.json(foundIssues); // Send the matched issues as a response
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
    }
      ;
  