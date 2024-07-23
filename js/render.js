// Income Caategory Card
export const renderIncomeCategoryCard = (category, amount, container) => {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('aspect-square', 'p-4', 'mb-2', 'backdrop-blur-sm', 'bg-green-600/5', 'shadowmd', 'rounded-lg', 'shadow-md');
    categoryElement.innerHTML = `
        <div class="grid grid-rows-2 gap-4">
            <div>
                <p class="font-bold text-center">${category}</p>
            </div>
            <div class="text-center">
                <p class="font-bold text-green-600">${amount.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}</p>
            </div>
        </div>
    `;
    container.appendChild(categoryElement);
};

// Expenditure Category Card
export const renderExpenditureCategoryCard = (category, amount, container) => {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('aspect-square', 'p-4', 'mb-2', 'backdrop-blur-sm', 'bg-red-600/5', 'shadowmd', 'rounded-lg', 'shadow-md');
    categoryElement.innerHTML = `
        <div class="grid grid-rows-2 gap-4">
            <div>
                <p class="font-bold text-center">${category}</p>
            </div>
            <div class="text-center">
                <p class="font-bold text-red-600">${amount.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}</p>
            </div>
        </div>
    `;
    container.appendChild(categoryElement);
};

// Transaction Card
export const renderTransaction = (transaction, id, container) => {
    const transactionElement = document.createElement('div');
    transactionElement.classList.add('p-4', 'mb-2', 'backdrop-blur-sm', 'bg-white/5', 'rounded-lg', 'shadow-sm', transaction.type === 'Ingreso' ? 'shadow-green-500' : 'shadow-red-500');
    transactionElement.id = id;
    transactionElement.innerHTML = `
        <div class="flex gap-5">
            <div class="flex justify-between items-center flex-grow">
                <div>
                    <p class="font-bold">${transaction.category}</p>
                    <p class="text-xs font-bold text-yellow-300">${transaction.tag || ''}</p>
                </div>
                <div class="text-center">
                    <p class="text-sm">${transaction.comment || ''}</p>
                </div>
                <div class="text-right">
                    <p class="font-bold ${transaction.type === 'Ingreso' ? 'text-green-600' : 'text-red-600'}">
                        ${transaction.amount.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}
                    </p>
                </div>
            </div>
            <div id="${id}-delete" 
                 class="flex justify-center items-center text-red-400 hover:text-red-600 hover:animate-bounce- hover:no-underline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" 
                          stroke-linejoin="round" 
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </div>
            
        </div>
    `;
    container.appendChild(transactionElement);
};

// Delete Transaction
export const deleteTransaction = (id, container) => {
    const deleteButton = document.getElementById(`${id}-delete`);
    deleteButton.addEventListener('click', () => {
        const transaction = document.getElementById(id);
        transaction.remove();
    });
};
