// Script para mostrar todas las trnsacciones en la lista
import { renderTransaction } from './render.js';

const  transactions  = JSON.parse(localStorage.getItem('transactions'));
document.addEventListener('DOMContentLoaded', () => {
    const $transactionList = document.getElementById('transaction-list');

    transactions.forEach(transaction => {
        renderTransaction(transaction, $transactionList);
    });
});
