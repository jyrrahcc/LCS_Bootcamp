function setCollapse(toggle, navbar, filterCollapse) {
  toggle.setAttribute('data-bs-toggle', 'collapse');
  toggle.setAttribute('data-bs-target', '#filter-collapse');
  toggle.setAttribute('aria-expanded', 'false');
  if (navbar.classList.contains('show')) {
    filterCollapse.classList.add('show');
  }
}

function removeCollapse(toggle, filterCollapse) {
  toggle.removeAttribute('data-bs-toggle');
  toggle.removeAttribute('data-bs-target');
  toggle.removeAttribute('aria-expanded');
  filterCollapse.classList.remove('show');
}

function initialize(toggle, navbar,filterCollapse) {
  // Set attributes based on screen width
  if (window.innerWidth < 515) {
    setCollapse(toggle, navbar, filterCollapse);
  } else {
    removeCollapse(toggle, filterCollapse);
  }
}

// Function to show navbar and handle window resize
const showNavbar = () => {
  // Get toggle, nav, bodypd, and headerpd elements
  toggle = document.getElementById('header-toggle');
  navbar = document.getElementById('nav-bar');
  const bodypd = document.getElementById('body-pd');
  const headerpd = document.getElementById('header');

  // Validate that all variables exist
  if (toggle && navbar && bodypd && headerpd) {
      toggle.addEventListener('click', () => {
          // Hide filter
          const list = document.querySelector('#nav_list');
          list.classList.toggle('d-none');
          // Show authors
          const author = document.querySelector(".authors");
          author.classList.toggle('authors-move');
          // Toggle navbar
          navbar.classList.toggle('show');
          // Change icon
          toggle.classList.toggle('bx-x');
          // Toggle body padding
          bodypd.classList.toggle('body-pd');
          // Toggle header padding
          headerpd.classList.toggle('header-pd');
      });
  }
}

// Function to handle link colors
const linkColor = () => {
  const linkColors = document.querySelectorAll('.nav_link');
  if (linkColors) {
      linkColors.forEach(link => {
          link.addEventListener('click', function() {
              // Remove active class from all links
              linkColors.forEach(link => link.classList.remove('active'));
              // Add active class to the clicked link
              this.classList.add('active');
          });
      });
  }
};

// Function to prevent default behavior on links
const preventDefaultLinks = () => {
    const myLinks = document.querySelectorAll('a[href="#"]');
    myLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
};

// Function to handle rotation of icon
const rotateIcon = () => {
    const links = document.querySelectorAll('.nav_link');
    links.forEach(link => {
        link.addEventListener('click', function() {
            const icon = this.querySelector('.nav_icon');
            icon.classList.toggle('rotate-90');
        });
    });
};

document.addEventListener("DOMContentLoaded", function(event) {

  var filterCollapse = document.getElementById('filter-collapse');
  var navbar = document.getElementById('nav-bar');
  var toggle = document.getElementById('header-toggle');

  // Call initialize function
  initialize(toggle, navbar, filterCollapse)

  // Call preventDefaultLinks function
  preventDefaultLinks();
  
  // Call rotateIcon function
  rotateIcon();
  
  // Call showNavbar function
  showNavbar();

  // Call linkColor function
  linkColor();

  // Call minDate function
  minDate();

  // Add click event listener to each link
  const links = document.querySelectorAll('.nav_link');
  links.forEach(link => link.addEventListener('click', linkColor));

  // Add event listener for window resize
  window.addEventListener('resize', function() {
    filterCollapse = document.getElementById('filter-collapse');
    navbar = document.getElementById('nav-bar');
    toggle = document.getElementById('header-toggle');
    initialize(toggle, navbar,filterCollapse)
  });
});
