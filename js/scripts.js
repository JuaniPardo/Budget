
// Listener para detectar cambios en el DOM
document.addEventListener('DOMContentLoaded', () => {
    const transactionType = data.transactionType;
    const expenditureCategory = data.expenditureCategory;
    const incomeCategory = data.incomeCategory;
    const tags = data.tags;
    const transactions = data.transactions;

    const $transactionTypeSelect = document.getElementById('transaction-type');
    const $categorySelect = document.getElementById('category');
    const $tagSelect = document.getElementById('tag');
    const $amountInput = document.getElementById('amount');
    const $commentInput = document.getElementById('comment');
    const $submitButton = document.getElementById('submit');
    const $incomeSummary = document.getElementById('income-summary');
    const $expenditureSummary = document.getElementById('expenditure-summary');
    const $transactionList = document.getElementById('transaction-list');

    // Creo el select del tipo de transacción
    transactionType.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        $transactionTypeSelect.appendChild(option);
    });

    // Función para crear el select de categorías en base al tipo de transacción
    const populateCategorySelect = () => {
        $categorySelect.innerHTML = ''; // Borro los elementos previos
        const categories = $transactionTypeSelect.value === 'Ingreso' ? incomeCategory : expenditureCategory;
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            $categorySelect.appendChild(option);
        });
    };

    // Ejecuto la función para crear el select de categorías
    populateCategorySelect();

    // Actualizar categorías al cambiar el tipo de transacción
    $transactionTypeSelect.addEventListener('change', populateCategorySelect);

    // Paso los tags al select
    tags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        $tagSelect.appendChild(option);
    });

    // Función para crear las tarjetas de categorias de ingreso
    const renderIncomeCategoryCard = (category,) => {
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
        $incomeSummary.appendChild(categoryElement);
    };

    // Rendeizo las categorías de ingreso
    incomeCategory.forEach(category => {
        renderIncomeCategoryCard(category);
    });

    // Función para crear las tarjetas de categorias de gasto
    const renderExpenditureCategoryCard = (category) => {
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
        $expenditureSummary.appendChild(categoryElement);
    };

    // Rendeizo las categorías de gasto
    expenditureCategory.forEach(category => {
        renderExpenditureCategoryCard(category);
    });

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

    // Listener para el botón de submit
    $submitButton.addEventListener('click', (e) => {
        e.preventDefault();

        const newTransaction = {
            id: Date.now(),
            type: $transactionTypeSelect.value,
            amount: parseFloat($amountInput.value),
            category: $categorySelect.value,
            tag: $tagSelect.value,
            comment: $commentInput.value
        };

        transactions.push(newTransaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        renderTransaction(newTransaction);

        // Elimino el contenido de los inputs
        $amountInput.value = '';
        $commentInput.value = '';
        $tagSelect.value = '';
    });
});
