import {fetchDummyTransactions} from "./fetch.js";
import { renderTransaction } from "./render.js";
import {assignDeleteEvent} from "../pages/transactionLogPage.js";
// Function to show error message.
function showErrorMessage(message) {
  alert(message);
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

export {showErrorMessage, deleteAllTransactions, addDummyDataToLocalStorage};