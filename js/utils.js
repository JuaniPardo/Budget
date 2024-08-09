import { fetchDummyTransactions } from "./fetch.js";
import { renderTransaction } from "./render.js";
import { assignDeleteEvent } from "../pages/transactionLogPage.js";
import { loadTransactions} from "../pages/transactionLogPage.js";


function showMessage(title, message, type) {
  // Type css configuration
  const typeClasses = {
    info: {
      title: 'text-blue-400',
      confirmButton: 'bg-blue-400',
      cancelButton: 'bg-gray-500',
      timerProgressBar: 'bg-blue-400',
    },
    success: {
      title: 'text-green-400',
      confirmButton: 'bg-green-400',
      timerProgressBar: 'bg-green-400',
    },
    warning: {
      title: 'text-yellow-400',
      confirmButton: 'bg-yellow-400',
      timerProgressBar: 'bg-yellow-400',
    },
    error: {
      title: 'text-red-400',
      confirmButton: 'bg-red-400',
      timerProgressBar: 'bg-red-400',
    },
  }

  Swal.fire({
    title: title,
    text: message,
    icon: type,
    showConfirmButton: false,
    showCancelButton: false,
    timer: 1500,
    timerProgressBar: true,
    customClass: {
      popup: 'text-gray-100 bg-sky-950',
      cancelButton: 'bg-gray-500',
      ...typeClasses[type],

    }
  })
}

// Transaction deletion
const deleteAllTransactions = () => {
  localStorage.removeItem('transactions');
  window.location.reload();
};

// Dummy data generation
async function addDummyDataToLocalStorage($transactionList) {
  const dummyTransactions = await fetchDummyTransactions();
  const existingTransactions = loadTransactions();
  const allTransactions = [...existingTransactions, ...dummyTransactions];
  localStorage.setItem('transactions', JSON.stringify(allTransactions));
  dummyTransactions.forEach((transaction, index) => {
    renderTransaction(transaction, index, $transactionList);
  });
  assignDeleteEvent(dummyTransactions);
}

export {showMessage, deleteAllTransactions, addDummyDataToLocalStorage};