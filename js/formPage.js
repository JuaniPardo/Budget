import { data } from './data.js';
import { initializeForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
    const $transactionTypeSelect = document.getElementById('transaction-type');
    const $categorySelect = document.getElementById('category');
    const $tagSelect = document.getElementById('tag');
    const $amountInput = document.getElementById('amount');
    const $commentInput = document.getElementById('comment');
    const $submitButton = document.getElementById('submit');

    initializeForm($transactionTypeSelect, $categorySelect, $tagSelect);

    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    $submitButton.addEventListener('click', (e) => {
        e.preventDefault();

        const newTransaction = {
            id: Date.now(),
            type: $transactionTypeSelect.value,
            amount: parseFloat($amountInput.value),
            category: $categorySelect.value,
            ...(!!$tagSelect.value && { tag: $tagSelect.value.trim() }),
            ...(!!$commentInput.value && { comment: $commentInput.value.trim() })
        };

        transactions.push(newTransaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        $amountInput.value = '';
        $commentInput.value = '';
        $tagSelect.value = '';
    });
});
