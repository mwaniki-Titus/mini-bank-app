import React, { useEffect, useState } from "react";
import TransactionForm from "./TransactionForm";
import TransactionTable from "./TransactionTable";
import "./App.css"

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
    .then((response) => response.json())
    .then((data) => setTransactions(data))
    .catch((error) => console.error("Error fetching data:", error));

  },[]);

  const addTransaction = (newTransaction) => {
    const newId = Math.max(...transactions.map((t) => t.id)) +1;
    newTransaction.id = newId;
    
    setTransactions([...transactions, newTransaction]);

  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Mini Bank App</h1>
      <TransactionForm onAddTransaction={addTransaction} />
      <div>
        <label htmlFor="search">Search Transactions:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
};

export default App;






