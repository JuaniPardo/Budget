import {data} from './data.js';
import {renderIncomeCategoryCard, renderExpenditureCategoryCard} from './render.js';

// save initial data to localStorage
Object.entries(data).forEach(([key, value]) => {
  localStorage.setItem(key, JSON.stringify(value));
});


document.addEventListener('DOMContentLoaded', () => {
  const $incomeSummary = document.getElementById('income-summary');
  const $expenditureSummary = document.getElementById('expenditure-summary');

  // render incomeCategory cards from localStorage
  const incomeCategory = JSON.parse(localStorage.getItem('incomeCategory'));
  incomeCategory.forEach(category => {
    renderIncomeCategoryCard(category, $incomeSummary);
  });

// render expenditureCategory cards from localStorage
  const expenditureCategory = JSON.parse(localStorage.getItem('expenditureCategory'))
  expenditureCategory.forEach(category => {
    renderExpenditureCategoryCard(category, $expenditureSummary);
  })
});

