import React, { useState, useEffect, useContext } from 'react';
import { formatNumberInput } from '../util/formatUtil';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { userContext } from '../UserContext';

export default function History() {
    const [allTransaction, setAllTransaction] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const {user} = useContext(userContext);

    const getAllTransaction = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/transaction`, {
                withCredentials: true
            });
            setAllTransaction(data);
            const selectedTransaction = data.filter((item) => item.type === "Transfer" && item.sender._id === user._id)
            setTransaction([...selectedTransaction]);
        } catch (error) {
            console.error("Error fetching transaction data:", error);
        }
    };

    const setTransactionToTransfer = () => {
        const selectedTransaction = allTransaction.filter((item) => item.type === "Transfer" && item.sender._id === user._id)
        setTransaction([...selectedTransaction]);
    }

    const setTransactionToReceive = () => {
        const selectedTransaction = allTransaction.filter((item) => item.type === "Transfer" && item.receiver._id === user._id)
        setTransaction([...selectedTransaction]);
    }

    const setTransactionToDeposit = () => {
        const selectedTransaction = allTransaction.filter((item) => item.type === "Deposit" && item.sender._id === user._id)
        setTransaction([...selectedTransaction]);
    }

    const setTransactionToWithdraw = () => {
        const selectedTransaction = allTransaction.filter((item) => item.type === "Withdraw" && item.sender._id === user._id)
        setTransaction([...selectedTransaction]);
    }

    useEffect(() => {
        getAllTransaction();
    }, []);

    return (
        <div className='flex-col shadow-lg bg-gray-100 rounded-md p-4'>
            <div className='text-3xl font-medium'>
                History
            </div>
            <div className='flex justify-start items-center py-2 gap-4'>
                <button onClick={setTransactionToTransfer} className='bg-red-500 p-2 rounded-md hover:bg-red-300 text-base font-medium text-white'>
                    Transfer
                </button>
                <button onClick={setTransactionToReceive} className='bg-green-500 p-2 rounded-md hover:bg-green-300 text-base font-medium text-white'>
                    Receive
                </button>
                <button onClick={setTransactionToDeposit} className='bg-yellow-500 p-2 rounded-md hover:bg-yellow-300 text-base font-medium text-white'>
                    Deposit
                </button>
                <button onClick={setTransactionToWithdraw} className='bg-blue-500 p-2 rounded-md hover:bg-blue-300 text-base font-medium text-white'>
                    Withdraw
                </button>
            </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Datetime
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                        <th scope="col" class="px-6 py-3">
                            From
                        </th>
                        <th scope="col" class="px-6 py-3">
                            To
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Remain
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transaction.map((item) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-6 py-2">
                                {item.timestamp}
                            </td>
                            <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                {item.type}
                            </td>
                            <td class="px-6 py-4">
                                {item.sender.username}
                            </td>
                            <td class="px-6 py-4">
                                {item.receiver.username}
                            </td>
                            <td class="px-6 py-4">
                                {item.amount}
                            </td>
                            <td class="px-6 py-4">
                                {item.sender.balance}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}