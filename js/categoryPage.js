import { data } from './data.js';
// store data in localStorage
import { renderIncomeCategoryCard, renderExpenditureCategoryCard } from './render.js';

document.addEventListener('DOMContentLoaded', () => {
    const $incomeSummary = document.getElementById('income-summary');
    const $expenditureSummary = document.getElementById('expenditure-summary');

    const incomeCategory = data.incomeCategory;
    const expenditureCategory = data.expenditureCategory;

    incomeCategory.forEach(category => {
        renderIncomeCategoryCard(category, $incomeSummary);
    });

    expenditureCategory.forEach(category => {
        renderExpenditureCategoryCard(category, $expenditureSummary);
    });
});
