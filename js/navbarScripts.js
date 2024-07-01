// Dropdown menu toggle
const dropdownButton = document.getElementById('dropdown-button');
const dropdownMenu = document.getElementById('dropdown-menu');
dropdownButton.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle('hidden');
});

// Hide dropdown menu when clicking outside of it
window.addEventListener('click', (event) => {
  if (!dropdownMenu.classList.contains('hidden')) {
    dropdownMenu.classList.add('hidden');
  }
});

// TODO - add event listener to toggle the hamburger menu
// TODO = add function to delete the transactions saved in the local storage