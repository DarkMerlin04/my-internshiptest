import React, { useState, useContext } from 'react';
import axios from 'axios';
import { userContext } from '../UserContext';
import Swal from 'sweetalert2';

export default function Transfer() {
    const [amount, setAmount] = useState('');
    const {user} = useContext(userContext);
    const [targetUser, setTargetUser] = useState('');
    
    const alertSuccess = () => {
        Swal.fire({
          title: "Transfer Successfully",
          icon: "success"
        });
      }

    const createTransfer = async () => {
        try {
            const getUser = await axios.post(`${process.env.REACT_APP_API}/auth/userbyname`, {
                username: targetUser,
            }, {withCredentials: true});

            const response = await axios.post(`${process.env.REACT_APP_API}/transaction/transfer`, {
                sender: user._id,
                receiver: getUser.data._id,
                amount: parseFloat(amount),
                type: "Transfer"
            }, {withCredentials: true});
            console.log('Transfer created:', response.data);
            setAmount('');
            alertSuccess();
        } catch (error) {
            console.error('Error creating deposit:', error);
        }
    };

    return (
        <div>
            <div className="w-96 p-6 shadow-lg bg-gray-100 rounded-md">
                <h1 className="text-2xl font-medium">Transfer</h1>
                <div className="flex py-4">
                    <label className="block text-base mb-2 px-2 font-medium">Receiver</label>
                    <input 
                    value={targetUser}
                    onChange={(e) => setTargetUser(e.target.value)}
                    type="text" 
                    className="border w-full text-base focus:outline-none focus:ring-0 focus:border-gray-600"></input>
                </div>
                <div className="flex py-4">
                    <label className="block text-base mb-2 px-2 font-medium">Amount</label>
                    <input 
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border w-full text-base focus:outline-none focus:ring-0 focus:border-gray-600"></input>
                </div>
                <button className='bg-blue-400 p-2 rounded-md mt-2 text-base font-medium text-white' onClick={createTransfer}>
                    Submit
                </button>
            </div>
        </div>
    )
}