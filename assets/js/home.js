function createnewproject(){
    window.location.href = '/Create_Project/'
  }
  function removeProject(project_id){
    const url = `/remove-project/pid/${project_id}`; // Replace this with your actual URL
  console.log(url);


  fetch(url, {
      method: 'DELETE'
  })
  .then(response => {
      if (response.ok) {
          console.log('Project removed successfully');
          const elementToRemove = document.getElementById(project_id);
          if (elementToRemove) {
              elementToRemove.remove();
              console.log(`Removed element with ID: ${project_id}`);
          } else {
              console.log(`Element with ID ${project_id} not found`);
          }
          console.log(url);
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






  //window.location.href = url;
  