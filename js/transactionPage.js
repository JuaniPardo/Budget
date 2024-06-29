import { data } from './data.js';
import { renderTransaction } from './render.js';

document.addEventListener('DOMContentLoaded', () => {
    const $transactionList = document.getElementById('transaction-list');
    const transactions = data.transactions;

    transactions.forEach(transaction => {
        renderTransaction(transaction, $transactionList);
    });
});
