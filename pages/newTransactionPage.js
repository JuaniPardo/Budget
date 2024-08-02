import { initializeForm } from '../js/form.js';
import Transaction from '../js/models/Transaction.js';

document.addEventListener('DOMContentLoaded', () => {
  const $transactionTypeSelect = document.getElementById('transaction-type');
  const $categorySelect = document.getElementById('category');
  // $tagSelect is a datalist. Used to show the available tags
  const $tagSelect = document.getElementById('tag');
  // $tagInput is the input of said datalist. Used to get the value of the selected tag
  const $tagInput = document.getElementById('tags');
  const $amountInput = document.getElementById('amount');
  const $commentInput = document.getElementById('comment');
  const $submitButton = document.getElementById('submit');

  initializeForm($transactionTypeSelect, $categorySelect, $tagSelect).then(r => console.log(r));

  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  $submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const newTransaction = new Transaction(
      Date.now(),
      $transactionTypeSelect.value,
      parseFloat($amountInput.value),
      $categorySelect.value,
      $tagInput.value,
      $commentInput.value.trim()
    );

    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Reset form
    $amountInput.value = '';
    $commentInput.value = '';
    $tagInput.value = '';
  });
});
