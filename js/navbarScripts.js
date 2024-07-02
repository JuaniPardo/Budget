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
const deleteTransactions = document.getElementById('delete-transactions');
deleteTransactions.addEventListener('click', (e) => {
  e.preventDefault();
  confirm('¿Estás seguro de que quieres borrar todas las transacciones? Esta acción no se puede deshacer') && deleteAllTransactions();
});

function deleteAllTransactions() {
  localStorage.removeItem('transactions');
  window.location.reload();
}