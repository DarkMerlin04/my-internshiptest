import React, { useState, useEffect } from 'react';
import { formatNumberInput } from '../util/formatUtil';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function History() {
    const getTransaction = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/transaction`,{
            withCredentials: true
        })
        console.log(data)
    }
    useEffect(() => {
        getTransaction()
        console.log("clickGear")
    },[])
    return (
        <div className='flex-col shadow-lg bg-gray-100 rounded-md p-4'>
            <div className='text-3xl font-medium'>
                History
            </div>
            <div className='flex justify-start items-center py-2'>
                <button className='bg-red-500 p-2 rounded-md hover:bg-red-300 text-base font-medium text-white'>
                    Transfer
                </button>
                <button className='bg-green-500 p-2 rounded-md hover:bg-green-300 text-base font-medium text-white'>
                    Receive
                </button>
            </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Datetime
                        </th>
                        <th scope="col" class="px-6 py-3">
                            User
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Remain
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                        <th scope="col" class="px-6 py-3">
                            From
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-6 py-2">
                            a
                        </td>
                        <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            b
                        </td>
                        <td class="px-6 py-4">
                            c
                        </td>
                        <td class="px-6 py-4">
                            d
                        </td>
                        <td class="px-6 py-4">
                            e
                        </td>
                        <td class="px-6 py-4">
                            f
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}