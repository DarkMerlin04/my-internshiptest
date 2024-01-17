import { useEffect, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { AiFillBank } from "react-icons/ai";
import { PiPiggyBankBold } from "react-icons/pi";
import { TbCashBanknote } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { AiOutlineHistory } from "react-icons/ai";
import Deposit from '../components/Deposit';
import Withdraw from '../components/Withdraw';
import Transfer from '../components/Transfer';
import History from '../components/History';

export default function HomePage() {
  const [open, setOpen] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [option, setOption] = useState("Deposit");
  useEffect(() => {
    if (option === "Deposit")
    {
      setSelectedComponent(<Deposit/>)
    }
    else if (option === "Withdraw")
    {
      setSelectedComponent(<Withdraw/>)
    }
    else if (option === "Transfer")
    {
      setSelectedComponent(<Transfer/>)
    }
    else if (option === "History")
    {
      setSelectedComponent(<History/>)
    }
  }, [option])

  return (
    <div className="flex">
      <div className={`bg-blue-950 h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}>
        <BsArrowLeftShort className={`bg-white text-blue-950 text-3xl rounded-full 
          absolute -right-3 top-9 border-blue-950 cursor-pointer ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)} />

        <div className='inline-flex float-left'>
          <AiFillBank className={`bg-blue-300 text-4xl rounded cursor-pointer block mr-2 duration-500 ${open && "rotate-[360deg]"}`} />
          <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>Bank App</h1>
        </div>

        <ul className='pt-8 mt-8'>
          <li className='text-gray-300 text-xl flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-700 rounded-md mt-2' onClick={() => setOption("Deposit")}>
          <PiPiggyBankBold className='text-2xl'/>
            <span className={`font-medium ${!open && "hidden"}`} >Deposit</span>
          </li>
          <li className='text-gray-300 text-xl flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-700 rounded-md mt-2' onClick={() => setOption("Withdraw")}>
            <TbCashBanknote className='text-2xl'/>
            <span className={`font-medium ${!open && "hidden"}`} >Withdraw</span>
          </li>
          <li className='text-gray-300 text-xl flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-700 rounded-md mt-2' onClick={() => setOption("Transfer")}>
            <FaMoneyBillTransfer className='text-2xl'/>
            <span className={`font-medium ${!open && "hidden"}`} >Transfer</span>
          </li>
          <li className='text-gray-300 text-xl flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-700 rounded-md mt-2' onClick={() => setOption("History")}>
            <AiOutlineHistory className='text-2xl'/>
            <span className={`font-medium ${!open && "hidden"}`} >History</span>
          </li>
        </ul>

        {/* <button className={`bg-blue-300 p-2 rounded-md mt-4 text-base font-medium ${!open && "hidden"}`}>
          Logout
        </button> */}
      </div>
      <div className='bg-white w-full flex items-center justify-center'>
        <div className=''>
        {selectedComponent}
        </div>
      </div>
    </div>
  )
}