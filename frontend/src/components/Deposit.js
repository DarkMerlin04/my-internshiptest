import React, { useState, useContext } from 'react';
import axios from 'axios';
import { userContext } from '../UserContext';

export default function Deposit() {
    const [amount, setAmount] = useState('');
    const {user} = useContext(userContext);

    const createDeposit = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/transaction/deposit`, {
                sender: user._id,
                receiver: user._id,
                amount: parseFloat(amount),
                type: "Deposit"
            }, {withCredentials: true});
            console.log('Deposit created:', response.data);

            setAmount('');
        } catch (error) {
            console.error('Error creating deposit:', error);
        }
    };

    return (
        <div>
            <div className="w-96 p-6 shadow-lg bg-gray-100 rounded-md">
                <h1 className="text-2xl font-medium">Deposit</h1>
                <div className="flex py-4">
                    <label className="block text-base mb-2 px-2 font-medium">Amount</label>
                    <input 
                        type="text" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border w-full text-base focus:outline-none focus:ring-0 focus:border-gray-600"
                    ></input>
                </div>
                <button className='bg-green-400 p-2 rounded-md mt-2 text-base font-medium text-white' onClick={createDeposit}>
                    Submit
                </button>
            </div>
        </div>
    )
}