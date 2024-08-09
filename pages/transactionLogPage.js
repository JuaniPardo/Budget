import {renderTransaction} from '../js/render.js';
import {fetchInitialData} from "../js/fetch.js";
import Transaction from '../js/models/Transaction.js';

// Initial data used in the edit forms.
let transactionType, incomeCategory, expenditureCategory, tags;

async function initializeData() {
  const initialData = await fetchInitialData();
  transactionType = initialData.transactionType;
  incomeCategory = initialData.incomeCategory;
  expenditureCategory = initialData.expenditureCategory;
  tags = initialData.tags;
}

initializeData().then(r => console.log(r));

// Function to load transactions from local storage.
export const loadTransactions = () => {
  const transctionsData = JSON.parse(localStorage.getItem('transactions')) || [];
  return transctionsData.map(transactionData => new Transaction(transactionData.id, transactionData.type, transactionData.amount, transactionData.category, transactionData.tag, transactionData.comment));
};

document.addEventListener('DOMContentLoaded', () => {
  const transactions = loadTransactions();
  const $transactionList = document.getElementById('transaction-list');
  if (transactions.length > 0) {
    transactions.forEach((transaction, index) => {
      renderTransaction(transaction, index, $transactionList);
    });
    assignEditTransactionEvent(transactions);
    assignDeleteEvent(transactions);
  } else {
    $transactionList.innerHTML = `<h3 class="block text-center text-yellow-400 text-xl mb-4">No se han registrado transacciones</h3>`;
    //showMessage("Atención", "No se han encontrado transacciones!", "warning");
  }

});
//Function to edit transaction.
const editTransaction = (transaction) => {
  const transactionTypeOptions = transactionType.map(type => `<option value="${type}" ${transaction.type === type ? 'selected' : ''}>${type}</option>`).join('');
  const categoryOptions = [...incomeCategory, ...expenditureCategory].map(category => `<option value="${category}" ${transaction.category === category ? 'selected' : ''}>${category}</option>`).join('');
  const tagOptions = tags.map(tag => `<option value="${tag}" ${transaction.tag === tag ? 'selected' : ''}>${tag}</option>`).join('');
// Create a form to edit the transaction
  const form = document.createElement('form');
  form.classList.add('mb-4');
  form.innerHTML = `
    <div class="mb-2 block"> <!--? Tipo -->
        <label class="block text-sm font-medium text-gray-500">Tipo</label>
        <select id="transaction-type" class="w-full border-gray-300 rounded mt-1">
        ${transactionTypeOptions}
        </select>
    </div>
    <div class="mb-2 block"> <!--? Categoria -->
        <label class="block text-sm font-medium text-gray-500">Categoría</label>
        <select name="category" id="category" class="w-full border-gray-300 rounded mt-1">
        ${categoryOptions}
        </select>
    </div>
    <div class="mb-2"> <!--? Monto -->
        <label class="block text-sm font-medium text-gray-500">Cantidad</label>
        <input type="number" id="amount" class="w-full border-gray-300 rounded mt-1" value="${transaction.amount}" required>
    </div>
    <div class="mb-2"> <!--? TAG -->
        <label class="block text-sm font-medium text-gray-500">Etiqueta (opcional)</label>
        <input list="tag" id="tags" class="w-full border-gray-300 rounded mt-1">
        <datalist id="tag">
        ${tagOptions}
        </datalist>
    </div>
    <div class="mb-2"> <!--? Comentario -->
        <label class="block text-sm font-medium text-gray-500">Comentario (opcional)</label>
        <textarea id="comment" class="w-full border-gray-300 rounded mt-1" rows="2">${transaction.comment || ''}</textarea>
    </div>
`
  Swal.fire({
    title: 'Editar Transacción',
    html: form,
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    customClass: {
      popup: 'text-gray-100 bg-sky-950',
      confirmButton: 'bg-sky-600',
      cancelButton: 'bg-gray-500',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(result);
      const updatedTransaction = {
        ...transaction,
        type: document.getElementById('transaction-type').value,
        category: document.getElementById('category').value,
        amount: isNaN(parseFloat(document.getElementById('amount').value)) ? 0 : parseFloat(document.getElementById('amount').value),
        tag: document.getElementById('tags').value,
        comment: document.getElementById('comment').value,
      };

      updateTransactionToLocalStorage(updatedTransaction);
      window.location.reload();
    }
  });
};

const updateTransactionToLocalStorage = (updatedTransaction) => {
  const transactions = loadTransactions();
  const transactionIndex = transactions.findIndex(transaction => transaction.id === updatedTransaction.id);
  if (transactionIndex !== -1) {
    transactions[transactionIndex] = updatedTransaction;
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
};

// Function to delete transaction.
const deleteTransaction = (id) => {
  const transactions = loadTransactions();
  transactions.splice(id, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  const $transactionList = document.getElementById('transaction-list');
  const $transactionElement = document.getElementById(id);
  if ($transactionElement) {
    $transactionList.removeChild(document.getElementById(id));
  }
  // IDs are now out of sync, so we need to reassign them.
  transactions.forEach((transaction, newIndex) => {
    const $transactionElement = document.getElementById(newIndex);
    if ($transactionElement) {
      $transactionElement.id = newIndex;
      const $deleteButton = document.getElementById(`${newIndex}-delete`);
      $deleteButton.id = `${newIndex}-delete`;
    }
  });
};

// Function to edit transaction.
const assignEditTransactionEvent = (transactions) => {
  transactions.forEach((transaction, index) => {

    const $editButton = document.getElementById(`${index}-edit`);
    if ($editButton) {
      $editButton.addEventListener('click', () => {
        editTransaction(transaction);
      });
    }
  });
};

// Function to assign delete button event listener.
export const assignDeleteEvent = (transactions) => {
  transactions.forEach((transaction, index) => {
    const $deleteButton = document.getElementById(`${index}-delete`);
    if ($deleteButton) {
      $deleteButton.addEventListener('click', () => {
        deleteTransaction(index);
      });
    }
  });
};