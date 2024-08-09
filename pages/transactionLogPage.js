import { renderTransaction } from '../js/render.js';
import { showMessage } from '../js/utils.js';
import Transaction from '../js/models/Transaction.js';

// Function to load transactions from local storage.
export const loadTransactions = () => {
  const transctionsData = JSON.parse(localStorage.getItem('transactions')) || [];
  return transctionsData.map(transactionData => new Transaction(transactionData.id, transactionData.type, transactionData.amount, transactionData.category, transactionData.tag, transactionData.comment));
};

document.addEventListener('DOMContentLoaded', () => {
  const transactions = loadTransactions();
  const $transactionList = document.getElementById('transaction-list');
  if (transactions.length > 0) {
    transactions.forEach((transaction, index) => {
      renderTransaction(transaction, index, $transactionList);
    });
    assignDeleteEvent(transactions);
  } else {
    $transactionList.innerHTML = `<h3 class="block text-center text-yellow-400 text-xl mb-4">No se han registrado transacciones</h3>`;
    //showMessage("Atención", "No se han encontrado transacciones!", "warning");
  }

});

// Function to delete transaction.
const deleteTransaction = (id) => {
  const transactions = loadTransactions();
  transactions.splice(id, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  const $transactionList = document.getElementById('transaction-list');
  const $transactionElement = document.getElementById(id);
  if ($transactionElement) {
    $transactionList.removeChild(document.getElementById(id));
  }
  // IDs are now out of sync, so we need to reassign them.
  transactions.forEach((transaction, newIndex) => {
    const $transactionElement = document.getElementById(newIndex);
    if ($transactionElement) {
      $transactionElement.id = newIndex;
      const $deleteButton = document.getElementById(`${newIndex}-delete`);
      $deleteButton.id = `${newIndex}-delete`;
    }
  });
};

// Function to assign delete button event listener.
export const assignDeleteEvent = (transactions) => {
  transactions.forEach((transaction, index) => {
    const $deleteButton = document.getElementById(`${index}-delete`);
    if ($deleteButton) {
      $deleteButton.addEventListener('click', () => {
        deleteTransaction(index);
      });
    }
  });
};