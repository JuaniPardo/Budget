export const renderIncomeCategoryCard = (category, container) => {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('aspect-square', 'p-4', 'mb-2', 'backdrop-blur-sm', 'bg-green-600/5', 'shadowmd', 'rounded-lg', 'shadow-md');
    categoryElement.innerHTML = `
        <div class="grid grid-rows-2 gap-4">
            <div>
                <p class="font-bold text-center">${category}</p>
            </div>
            <div class="text-center">
                 <!-- TODO: Sumar los ingresos de la categoría -->
                <p class="font-bold text-green-600">+$1200.00</p>
            </div>
        </div>
    `;
    container.appendChild(categoryElement);
};

export const renderExpenditureCategoryCard = (category, container) => {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('aspect-square', 'p-4', 'mb-2', 'backdrop-blur-sm', 'bg-red-600/5', 'shadowmd', 'rounded-lg', 'shadow-md');
    categoryElement.innerHTML = `
        <div class="grid grid-rows-2 gap-4">
            <div>
                <p class="font-bold text-center">${category}</p>
            </div>
            <div class="text-center">
                <p class="font-bold text-red-600">-$1200.00</p>
            </div>
        </div>
    `;
    container.appendChild(categoryElement);
};

export const renderTransaction = (transaction, container) => {
    const transactionElement = document.createElement('div');
    transactionElement.classList.add('p-4', 'mb-2', 'backdrop-blur-sm', 'bg-white/5', 'shadowmd', 'rounded-lg', 'shadow-sm', transaction.type === 'Ingreso' ? 'shadow-green-500' : 'shadow-red-500');
    transactionElement.innerHTML = `
        <div class="flex justify-between items-center ">
            <div>
                <p class="font-bold">${transaction.category}</p>
                <p class="text-xs font-bold text-yellow-300">${transaction.tag || ''}</p>
            </div>
            <div class="text-center">
                <p class="text-sm">${transaction.comment || ''}</p>
            </div>
            <div class="text-right">
                <p class="font-bold ${transaction.type === 'Ingreso' ? 'text-green-600' : 'text-red-600'}">
                    ${transaction.type === 'Ingreso' ? '+' : '-'}$${transaction.amount.toFixed(2)}
                </p>
            </div>
        </div>
    `;
    container.appendChild(transactionElement);
};
