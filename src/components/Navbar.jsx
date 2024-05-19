import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-600 text-white p-2 flex-col md:flex-row'>
        <div className="logo cursor-pointer">
            <span className='font-bold text-xl mx-9 cursor-pointer'>iTask</span>
        </div>
        <ul className='flex gap-10 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
