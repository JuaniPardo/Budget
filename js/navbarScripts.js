// Data import
import {fetchDummyTransactions} from "./fetch.js";
import { renderTransaction } from "./render.js";
import {assignDeleteEvent} from "./transactionLogPage.js";

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

// Transaction deletion
const deleteAllTransactions = () => {
  localStorage.removeItem('transactions');
  window.location.reload();
};

// Dummy data generation
async function addDummyDataToLocalStorage() {
  const dummyTransactions = await fetchDummyTransactions();
  console.log(dummyTransactions);
  localStorage.setItem('transactions', JSON.stringify(dummyTransactions));
  dummyTransactions.forEach((transaction, index) => {
    renderTransaction(transaction, index, $transactionList);
  });
  assignDeleteEvent(dummyTransactions);
}

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
    addDummyDataToLocalStorage();
  });
}