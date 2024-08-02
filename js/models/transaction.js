class Transaction {
  constructor(id, type, amount, category, tag, comment) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.category = category;
    // tag is optional
    this.tag = tag || '';
    // comment is optional
    this.comment = comment || '';
  }
}

export default Transaction;