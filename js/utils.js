import { fetchDummyTransactions } from "./fetch.js";
import { renderTransaction } from "./render.js";
import {assignDeleteEvent} from "../pages/transactionLogPage.js";

// Function to show error message.
function showErrorMessage(message) {
  Swal.fire({
    title: 'Error️',
    text: message,
    icon: 'error',
    showConfirmButton: false,
    showCancelButton: false,
    timer: 1500,
    timerProgressBar: true,
    customClass: {
      confirmButton: 'bg-red-400',
      cancelButton: 'bg-gray-500',
      popup: 'text-gray-100 bg-sky-950',
      title: 'text-red-400',
      timerProgressBar: 'bg-red-400',
    }
  });
}

function showWarningMessage(message) {
  Swal.fire({
    title: 'Atención',
    text: message,
    icon: 'warning',
    showConfirmButton: false,
    showCancelButton: false,
    timer: 1500,
    timerProgressBar: true,
    customClass: {
      confirmButton: 'bg-yellow-400',
      cancelButton: 'bg-gray-500',
      popup: 'text-gray-100 bg-sky-950',
      title: 'text-yellow-400',
      timerProgressBar: 'bg-yellow-400',
    }
  });
}

// Transaction deletion
const deleteAllTransactions = () => {
  localStorage.removeItem('transactions');
  window.location.reload();
};

// Dummy data generation
async function addDummyDataToLocalStorage($transactionList) {
  const dummyTransactions = await fetchDummyTransactions();
  console.log(dummyTransactions);
  localStorage.setItem('transactions', JSON.stringify(dummyTransactions));
  dummyTransactions.forEach((transaction, index) => {
    renderTransaction(transaction, index, $transactionList);
  });
  assignDeleteEvent(dummyTransactions);
}

export {showErrorMessage, showWarningMessage, deleteAllTransactions, addDummyDataToLocalStorage};