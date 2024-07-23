// Script para mostrar todas las trnsacciones en la lista.
import {renderTransaction} from './render.js';
import {showErrorMessage} from './utils.js';

// Function to load transactions from local storage.
const loadTransactions = () => {
  return JSON.parse(localStorage.getItem('transactions'));
};

document.addEventListener('DOMContentLoaded', () => {
  const transactions = loadTransactions();
  const $transactionList = document.getElementById('transaction-list');
  if (transactions) {
    transactions.forEach((transaction, index) => {
      renderTransaction(transaction, index, $transactionList);
    });
    assignDeleteEvent(transactions);
  } else {
    showErrorMessage("No se han encontrado transacciones!!!\nPuedes crear una nueva, o cargar transacciones de muestra.");
  }

});

// Function to delete transaction.
const deleteTransaction = (id) => {
  const transactions = loadTransactions();
  transactions.splice(id, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  const transaction = document.getElementById(id);
  transaction.remove();

};

// Function to assign delete button event listener.
export const assignDeleteEvent = (transactions) => {
  transactions.forEach((transaction, index) => {
    const $deleteButton = document.getElementById(`${index}-delete`);
    $deleteButton.addEventListener('click', () => {
      deleteTransaction(index);
    });
  });
};