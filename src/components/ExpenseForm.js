import React from 'react';
import { MdSend } from 'react-icons/md';

const ExpenseForm = ({ charge, amount, handleCharge, handleAmount, handleSubmit, edit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="charge">Charge</label>
                    <input 
                        className="form-control" 
                        id="charge" 
                        type="text" 
                        name="charge"
                        placeholder="e.g. rent"
                        value={charge}
                        onChange={handleCharge}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input 
                        className="form-control" 
                        id="amount" 
                        type="number" 
                        name="amount"
                        placeholder="e.g. 100"
                        value={amount}
                        onChange={handleAmount}
                    />
                </div>
            </div>

            <button className="btn" type="submit">
                {edit? "Edit" : "Submit"}
                <MdSend className="btn-icon" />
            </button>
        </form>
    )
}

export default ExpenseForm;