// Data import
import { addDummyDataToLocalStorage, deleteAllTransactions } from "./utils.js";
import { fetchInitialData} from "./fetch.js";
// HTML Element selection
const dropdownButton = document.getElementById('dropdown-button');
const dropdownMenu = document.getElementById('dropdown-menu');
const deleteTransactions = document.getElementById('delete-transactions');
const addDummyData = document.getElementById('add-dummy-data');
const $transactionList = document.getElementById('transaction-list');

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
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que quieres borrar todas las transacciones? Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'bg-red-500',
        cancelButton: 'bg-gray-500',
        popup: 'text-gray-100 bg-sky-950',
        title: 'text-red-500',
        focusConfirm: 'bg-red-800',
        focusCancel: 'bg-gray-800',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAllTransactions();
      }
    });
  });
}

if (addDummyData) {
  addDummyData.addEventListener('click', (e) => {
    e.preventDefault();
    addDummyDataToLocalStorage($transactionList).then(r => console.log(r));
  });
}