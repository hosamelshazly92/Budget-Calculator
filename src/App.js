import React, { useState, useEffect } from 'react';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

/*
const initialExpenses = [
  {
    id: uuidv4(),
    charge: "rent",
    amount: 1600
  },
  {
    id: uuidv4(),
    charge: "car payment",
    amount: 400
  },
  {
    id: uuidv4(),
    charge: "credit card bill",
    amount: 1200
  }
];
*/

const initialExpenses = localStorage.getItem('expenses')? JSON.parse(localStorage.getItem('expenses')) : [];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);

  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const handleCharge = e => {
    setCharge(e.target.value);
  }
  const handleAmount = e => {
    setAmount(e.target.value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== '' && amount > 0) {
      if(edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id? {...item, charge: charge, amount: amount} : item;
        });

        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: 'Item edited successfully!' });
      } else {
        const singleExpense = {
          id: uuidv4(),
          charge: charge,
          amount: amount
        };
  
        setExpenses([...expenses, singleExpense]);
      }
      
      setCharge('');
      setAmount('');

      handleAlert({ type: 'success', text: 'Item added successfully!' });
    } else {
      handleAlert({ type: 'danger', text: 'Invalid inputs were entered' });
    }
  }

  const [alert, setAlert] = useState({ show: false });
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  }

  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: 'danger', text: 'All items deleted' });
  }
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: 'danger', text: 'Item deleted' });
  }

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  return <>
    { alert.show && <Alert type={alert.type} text={alert.text} /> }
    <Alert />
    <h1>Budget Calculator</h1>
    <main className="App">
      <ExpenseForm 
        charge={charge} 
        amount={amount}
        handleCharge={handleCharge}
        handleAmount={handleAmount}
        handleSubmit={handleSubmit}
        edit={edit}
      />
      <ExpenseList 
        expenses={expenses}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        clearItems={clearItems}
      />
    </main>
    <h1>
      total spending: <span className="total">$ { expenses.reduce((acc, cur) => { return acc += parseInt(cur.amount)}, 0) }</span>
    </h1>
  </>;
}

export default App;
