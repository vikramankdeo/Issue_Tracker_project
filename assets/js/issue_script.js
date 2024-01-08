console.log("js included");
function myFunction() {
  // Your code to execute when the body loads
  console.log('Body has loaded.');
}
document.getElementById('filterForm').addEventListener('submit', async function(event) {
  console.log("script called");
    event.preventDefault(); // Prevents the default form submission behavior
    
    const formData = new FormData(this); // Creates a FormData object from the submitted form
    const labels = formData.getAll('labels').join(','); // Retrieves all values with the name 'labels'
    const authors = formData.getAll('authors').join(','); // Retrieves all values with the name 'authors'
  
    const url = `/filteredIssues?labels=${labels}&authors=${authors}`; // Constructs URL with labels and authors as query parameters
  
    try {
      console.log("fetcg is called from event listn r");
      const response = await fetch(url); // Performs a fetch request to the constructed URL
      const data = await response.json(); // Parses the response data as JSON
      
      // Handle retrieved 'data' (filtered issues)
      // Implement your logic to display the filtered issues
      console.log(data);
      renderIssues(data);
    } catch (error) {
      console.error('Error fetching filtered issues:', error);
    }
  });
  
  async function searchWithId(id , event) {
    event.preventDefault();
    console.log("id found us" , id);
    const searchText = document.getElementById('searchText').value;
  
    try {
      const response = await fetch(`/filteredIssues/page/${id}/search?text=${searchText}`);
      const data = await response.json();
  
      // Handle retrieved 'data' (matched issues)
      console.log("data look " , data);
      // Implement logic to display or process matched issues on the client-side
      renderIssues(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  
  function renderIssues(data) {
    const issuesList = document.querySelector('.issues-list');
    issuesList.innerHTML = ''; // Clear existing content
  
    // Loop through the received 'data' and create HTML elements to display issues
    data.forEach(issue => {
      const issueItem = document.createElement('div');
      issueItem.classList.add('issue-item');
      issueItem.innerHTML = `
        <p><strong>Issue</strong> ${issue.title}</p>
        <p><strong>Description:</strong> ${issue.description}</p>
        <p><strong>Label:</strong> ${issue.label}</p>
        <p><strong>Author:</strong> ${issue.author}</p>
        <!-- Add any other issue details as needed -->
      `;
      issuesList.appendChild(issueItem);
    });
  }


  // JavaScript function to toggle dropdown visibility
  function toggleDropdown(dropdownId) {
    const dropdownContent = document.getElementById(dropdownId);
    dropdownContent.classList.toggle("show");
  }

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



  // Function to handle search and pass req.params.id to issue_script.js
  function handleSearch(id){
    // Call your existing search function and pass id to issue_script.js
    console.log(id);
    console.log("calllled");
    searchWithId(id , event);
  }
  function removeIssue(project_id , issue_id){
    const url = `/remove-issue/${project_id}/${issue_id}`; // Replace this with your actual URL
    console.log(url);
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log('Project removed successfully');
            const elementToRemove = document.getElementById(issue_id);
            if (elementToRemove) {
                elementToRemove.remove();
                console.log(`Removed element with ID: ${issue_id}`);
            } else {
                console.log(`Element with ID ${issue_id} not found`);
            }
            //location.reload()
            // Redirect to the constructed URL
          
            }
            // Reload the page or perform any necessary update
            //location.reload()
         else {
            console.error('Failed to remove project');
            // Handle error conditions if necessary
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error conditions if necessary
    });

  }
  function createnewissue(project_id){
      window.location.href = `/Create_issue/page/${project_id}`;
    }
    
    // Redirect to the constructed URL
    