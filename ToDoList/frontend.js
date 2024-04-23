document.addEventListener("DOMContentLoaded", function(event) {
    // Define an array of month names
    const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)
    
    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
    toggle.addEventListener('click', ()=>{
    // show navbar
    nav.classList.toggle('show')
    // change icon
    toggle.classList.toggle('bx-x')
    // add padding to body
    bodypd.classList.toggle('body-pd')
    // add padding to header
    headerpd.classList.toggle('body-pd')
    })
    }
    }
    
    showNavbar('header-toggle','nav-bar','body-pd','header')
    
    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')
    
    function colorLink(){
    if(linkColor){
    linkColor.forEach(l=> l.classList.remove('active'))
    this.classList.add('active')
    }
    }
    linkColor.forEach(l=> l.addEventListener('click', colorLink))
    
    });
  
  var myLink = document.querySelectorAll('a[href="#"]');
  myLink.forEach(function(link){
    link.addEventListener('click', function(e) {
      e.preventDefault();
    });
    
    minDate();
  });
  
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // set min date of input type="date"
  function minDate() {
    // Get today's date
    var today = new Date();
  
    // Format the date as yyyy-mm-dd
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
  
    var minDate = yyyy + '-' + mm + '-' + dd;
  
    // Set the minimum date for the due date input
    document.getElementById('todoDueDate').setAttribute('min', minDate);
    document.getElementById('DueDate').setAttribute('min', minDate);
  }
  
  // close a Modal
  function closeModal(modalID){
    // Close the Bootstrap modal without jQuery
    var modal = document.getElementById(modalID);
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('style', 'display: none');
  
    var backdrop = document.querySelector('.modal-backdrop');
    backdrop.remove();
  }
  
  // Convert "April 24, 2024" to "2024-04-24"
  function formatStringToDate(dateString) {
      // Split the date string into its components
      const parts = dateString.split(' ');
  
      // Extract the month, day, and year
      const month = parts[0];
      const day = parseInt(parts[1].replace(',', ''), 10);
      const year = parseInt(parts[2], 10);
  
      // Create a Date object with the extracted components + 1 for day discrepancies
      const dateObject = new Date(year, monthNames.indexOf(month), day + 1);
  
      // Format the date to "YYYY-MM-DD"
      const formattedDate = dateObject.toISOString().split('T')[0];
      console.log(formattedDate + "format");
      return formattedDate;
  }
  
  // Convert "2024-04-24" to "April 4, 2024"
  function convertDateFormat(dateString) {
      // Create a new Date object from the input date string
      const date = new Date(dateString);
  
      // Extract the day, month index, and year components
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
  
      // Format the date string
      const formattedDate = monthNames[monthIndex] + ' ' + day + ', ' + year;
  
      return formattedDate;
  }
  