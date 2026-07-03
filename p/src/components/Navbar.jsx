import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold">
          <span className='text-green-500'> &lt;</span> 
          Pass
          <span className='text-green-500'>OP/&gt;</span>
          </div>
      {/* <ul>
        <li className='flex gap-4'>
            <a  className= 'hover:font-bold'  href="/">Home</a>
            <a  className='hover:font-bold' href="#">About</a>
            <a  className='hover:font-bold' href="#">Contact</a>
        </li>
      </ul> */}
      <div>
        <button className='bg-green-700 my-5 rounded-full flex justify-between items-center ring-white ring-1'>
        <img className='invert w-10 p-1'  src="github.png" alt="" />
        <span className='font-bold px-2'>Github</span>
        </button>
      </div>
      </div>
    </nav>
  )
 }
<ul>
    <li></li>
</ul>
export default Navbar