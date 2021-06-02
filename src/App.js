import React from 'react';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import './App.css';

function App() {
  return <>
    <Alert></Alert>
    <ExpenseForm />
    <ExpenseList />
  </>;
}

export default App;
