import {renderIncomeCategoryCard, renderExpenditureCategoryCard} from '../js/render.js';

document.addEventListener('DOMContentLoaded', () => {
  const $incomeSummary = document.getElementById('income-summary');
  const $expenditureSummary = document.getElementById('expenditure-summary')
  const transactions = JSON.parse(localStorage.getItem('transactions'));
  const incomeCategory = JSON.parse(localStorage.getItem('incomeCategory'));
  const expenditureCategory = JSON.parse(localStorage.getItem('expenditureCategory'));

  const categorySum = (category, transactions) => {
    return transactions.reduce((sum, transaction) => {
      if (transaction.category === category) {
        return sum + transaction.amount;
      }
      return sum;
    }, 0);
  };

  incomeCategory.forEach((category) => {
    const amount = categorySum(category, transactions)
    renderIncomeCategoryCard(category, amount, $incomeSummary);
  });

  expenditureCategory.forEach((category) => {
    const amount = categorySum(category, transactions);
    renderExpenditureCategoryCard(category, amount, $expenditureSummary);
  });
});
