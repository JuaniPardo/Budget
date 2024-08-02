// Data import
import { deleteAllTransactions, addDummyDataToLocalStorage } from "../js/utils.js";
// HTML Element selection
const dropdownButton = document.getElementById('dropdown-button');
const dropdownMenu = document.getElementById('dropdown-menu');
const deleteTransactions = document.getElementById('delete-transactions');
const addDummyData = document.getElementById('add-dummy-data');
const $transactionList = document.getElementById('transaction-list');


// Dropdown menu toggle
const toggleDropdownMenu = (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle('hidden');
};

// Close dropdown menu when clicking outside of it
const hideDropdownMenu = (event) => {
  if (!dropdownMenu.classList.contains('hidden') && !dropdownButton.contains(event.target)) {
    dropdownMenu.classList.add('hidden');
  }
};

// Event listeners
if (dropdownButton && dropdownMenu) {
  dropdownButton.addEventListener('click', toggleDropdownMenu);
  window.addEventListener('click', hideDropdownMenu);
}

if (deleteTransactions) {
  deleteTransactions.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('¿Estás seguro de que quieres borrar todas las transacciones? Esta acción no se puede deshacer')) {
      deleteAllTransactions();
    }
  });
}

if (addDummyData) {
  addDummyData.addEventListener('click', (e) => {
    e.preventDefault();
    addDummyDataToLocalStorage($transactionList).then(r => console.log(r));
  });
}