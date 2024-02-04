import React, { useState, useEffect } from 'react';
import TransactionsTable from "./TransactionsTable"

function App() {

  const [transactions, setTransactions] = useState([]);

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

  return (
    <>
    <h1>BANK OF FLATIRON</h1>
    <TransactionsTable transactions={transactions}/>
    </>
  )
}

export default App
