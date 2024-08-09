// Function to fetch categories from ../data/categories.json
async function fetchInitialData() {
  try {
    const response = await fetch("../data/categories.json");
    if (!response.ok) {
      console.info(response);
      switch (response.status) {
        case 404:
          throw new Error(`Error 404!\nFile not found!`);
        case 500:
          throw new Error(`Error 500!\nServer error!`); //
        default:
          throw new Error(`Error ${response.status}!`);
      }

    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Function to fetch dummy transactions from ../data/dummyTransactions.json
async function fetchDummyTransactions() {
  const response = await fetch("../data/dummyTransactions.json");
  return await response.json();
}

export {fetchInitialData, fetchDummyTransactions};