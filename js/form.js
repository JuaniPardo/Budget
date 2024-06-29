import { data } from './data';

export const initializeForm = (transactionTypeSelect, categorySelect, tagSelect) => {
    const { transactionType, expenditureCategory, incomeCategory, tags } = data;

    transactionType.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        transactionTypeSelect.appendChild(option);
    });

    const populateCategorySelect = () => {
        categorySelect.innerHTML = '';
        const categories = transactionTypeSelect.value === 'Ingreso' ? incomeCategory : expenditureCategory;
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    };

    populateCategorySelect();

    transactionTypeSelect.addEventListener('change', populateCategorySelect);

    tags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        tagSelect.appendChild(option);
    });
};
