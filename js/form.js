import { fetchInitialData } from './fetch.js';

const createAndAppendOption = (selectElement, value, textContent) => {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = textContent;
  selectElement.appendChild(option);
};

const populateCategorySelect = (transactionTypeSelect, categorySelect, incomeCategory, expenditureCategory) => {
  categorySelect.innerHTML = '';
  const categories = transactionTypeSelect.value === 'ingreso' ? incomeCategory : expenditureCategory;
  categories.forEach(category => {
    createAndAppendOption(categorySelect, category, category);
  });
};

export const initializeForm = async (transactionTypeSelect, categorySelect, tagSelect) => {
  try {
    const initialData = await fetchInitialData();

    const {transactionType, incomeCategory, expenditureCategory, tags} = initialData;

    transactionType.forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      transactionTypeSelect.appendChild(option);
    });
    populateCategorySelect(transactionTypeSelect, categorySelect, incomeCategory, expenditureCategory);

    transactionTypeSelect.addEventListener('change', () => populateCategorySelect(transactionTypeSelect, categorySelect, incomeCategory, expenditureCategory));

    tags.forEach(tag => {
      const option = document.createElement('option');
      option.value = tag;
      option.textContent = tag;
      tagSelect.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
};