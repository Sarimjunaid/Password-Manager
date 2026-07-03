import React, { Component, useEffect, useState } from 'react'
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: '', username: '', password: '' });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async() => {
    let req =await fetch("http://localhost:3000/");
    let passwords =await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  }
  useEffect(() => {
    getPasswords(); 
  }, []);

  const copyText = (text) => {
    toast('🦄 Copy to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }
  const showPassword = () => {
    passwordRef.current.type = "text"
    console.log(ref.current.src)
    if (ref.current.src.includes("eyeclose.png")) {
      ref.current.src = "eye.png"
      passwordRef.current.type = "text"
    }
    else {
      ref.current.src = "eyeclose.png"
      passwordRef.current.type = "password"
    }
  }
  const savePassword = async() => {
    if(form.site.length >3 && form.username.length > 3 && form.password.length > 3){
      const newId = uuidv4();
      const newItem = { ...form, id: newId };
      setPasswordArray([...passwordArray, newItem]);
      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newItem) })
    // localStorage.setItem('passwords', JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
    // console.log([...passwordArray, form]);
    setform({ site: '', username: '', password: '' });

    toast('🦄 Password saved !', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
    else{
      toast('🦄 Error: Password not saved ')
    }
    }
  const deletePassword = async(id) => {
    
    let c = confirm("Are you sure you want to delete this password?");
    if(c){
    setPasswordArray(passwordArray.filter(item => item.id !== id));
    await fetch("http://localhost:3000/" , { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id}) }); 
    // localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item => item.id !== id)));
    toast('🦄 Password deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    }
  }
  const editPassword = (id) => {
    setform({ ...passwordArray.filter(i => i.id === id)[0], id:id });
    setPasswordArray(passwordArray.filter(item => item.id!==id));
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">tgbtg</div></div>
      <div className="p-3 mycontainer  md:mycontainer min-h-[75.8vh]">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-500'> &lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span></h1>
        <p className='text-green-900 text-lg text-center'>Your own paassword Manager</p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' type="text " className='bg-white rounded-full border border-green-500 w-full p-4 py-1' name='site' />
          <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' type="text " className='bg-white rounded-full border border-green-500 w-full p-4 py-1' name='username' />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' type="password " className='bg-white rounded-full border border-green-500 w-full p-4 py-1' name='password' />
              <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} className=' p-1' width={26} src="eye.png" alt="eye" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='bg-green-500 rounded-full flex justify-center items-center p-2 w-fit hover:bg-green-400 gap-2 px-8 border border-green-900'>

            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'block' }}
            >
              <rect x="3" y="3" width="10" height="10" rx="2" fill="#181A2A" />
              <rect x="19" y="3" width="10" height="10" rx="2" fill="#181A2A" />
              <rect x="3" y="19" width="10" height="10" rx="2" fill="#181A2A" />
              {/* Bigger and longer plus sign */}
              <rect x="20" y="23" width="10" height="3" rx="1.5" fill="#181A2A" />
              <rect x="23.5" y="18" width="3" height="12" rx="1.5" fill="#181A2A" />
            </svg>

            Save Password</button>
        </div>
        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords saved yet</div>}
          {passwordArray.length != 0 && <table className='table-auto w-full rounded-md overflow-hidden mb-10'>
            <thead className="bg-green-800 text-white">
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Edit</th>
                <th className='py-2'>Delete</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item, index) => (
                <tr key={index}>
                  <td className=' py-2 border border-white text-center'>
                    <div className='flex items-center justify-center gap-1'>
                      <span> {item.site} </span>
                      <div className=' pt-1 cursor-pointer w-4 items-center justify-center' onClick={() => { copyText(item.site) }}>
                        <img src="copy.png" alt="" />
                      </div>
                    </div>
                  </td >
                  <td className=' py-2 border border-white text-center'>
                    <div className='flex items-center justify-center gap-1'>
                      <span> {item.username} </span>
                      <div className=' pt-1 cursor-pointer w-4 items-center justify-center' onClick={() => { copyText(item.username) }}>
                        <img src="copy.png" alt="" />
                      </div>
                    </div>
                  </td >
                  <td className=' py-2 border border-white text-center'>
                    <div className='flex items-center justify-center gap-1'>
                      <span> {"*".repeat(item.password.length)} </span>
                      <div className=' pt-1 cursor-pointer w-4 items-center justify-center' onClick={() => { copyText(item.password) }}>
                        <img src="copy.png" alt="" />
                      </div>
                    </div>
                  </td >
                  <td className=' py-2 border border-white text-center'>
                    <div className='flex items-center justify-center gap-1'>
                    
                      <div className=' pt-1 cursor-pointer w-6 items-center justify-center' onClick={() => { editPassword(item.id) }}>
                        <img src="Editt.gif" alt="" />
                      </div>
                    </div>
                  </td >
                  <td className=' py-2 border border-white text-center'>
                    <div className='flex items-center justify-center gap-1'>
                    
                      <div className=' pt-1 cursor-pointer w-6 items-center justify-center' onClick={() => { deletePassword(item.id) }}>
                        <img src="delete.gif" alt="" />
                      </div>
                    </div>
                  </td >
                </tr>
              ))}
            </tbody>
          </table>}
        </div>
      </div>

    </>
  )
}

export default Manager
