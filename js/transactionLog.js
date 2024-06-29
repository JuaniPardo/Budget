// Función para renderizar una tarjeta de transacción
const renderTransaction = (transaction) => {
    const transactionElement = document.createElement('div');
    transactionElement.classList.add('p-4', 'mb-2', 'backdrop-blur-sm', 'bg-white/5', 'shadowmd', transaction.type === 'income' ? 'shadow-green-500' : 'shadow-red-500', 'rounded-lg', 'shadow-md');
    transactionElement.innerHTML = `
        <div class="flex justify-between items-center ">
            <div>
                <p class="font-bold">${transaction.category}</p>
                <p class="text-xs font-bold text-yellow-300">${transaction.tag}</p>
            </div>
            <div class="text-center">
                <p class="text-sm">${transaction.comment}</p>
            </div>
            <div class="text-right">
                <p class="font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}">
                    ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}
                </p>
            </div>
        </div>
    `;
    $transactionList.appendChild(transactionElement);
};

// Rendeizo las transacciones existentes
transactions.forEach(transaction => {
    renderTransaction(transaction);
});