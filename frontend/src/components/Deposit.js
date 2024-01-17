export default function Deposit() {
    return (
        <div>
            <div className="w-96 p-6 shadow-lg bg-gray-100 rounded-md">
                <h1 className="text-2xl font-medium">Deposit</h1>
                <div className="flex py-4">
                    <label className="block text-base mb-2 px-2 font-medium">Amount</label>
                    <input type="text" className="border w-full text-base focus:outline-none focus:ring-0 focus:border-gray-600"></input>
                </div>
                <button className='bg-green-400 p-2 rounded-md mt-2 text-base font-medium text-white'>
                    Submit
                </button>
            </div>
        </div>
    )
}