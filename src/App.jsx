import React, { useState, useEffect } from 'react';
import TransactionsTable from "./TransactionsTable"
import NewTransactions from './NewTransactions';
import SearchBar from './SearchBar';

function App() {

  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then(res => {
        return res.json();
        })

      .then(data => {
          setTransactions(data);
        }
      )
  }, []);

  const addTransaction = (newTransaction) => {
    fetch('http://localhost:3000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    })
      .then(response => response.json())
      .then(data => {
        setTransactions([...transactions, data]);
      })
      .catch(error => console.error('Error adding transaction:', error));
  };

  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    amount: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addTransaction(formData);
    setFormData({
      date: '',
      description: '',
      category: '',
      amount: ''
    });
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
    <h1>BANK OF FLATIRON</h1>
    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    <TransactionsTable transactions={filteredTransactions}/>
    <NewTransactions
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  )
}

export default App
