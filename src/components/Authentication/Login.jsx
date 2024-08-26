import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { IoSettingsOutline } from "react-icons/io5";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setLoginIn,orgval }) => {
  const [showError, setShowError] = useState(false);
  const [createorg,setcreateorg]=useState(false)
  const [RselectedOrg,setRselectedorg]=useState('')
  const [showRegister,setshowRegister]=useState(false)
  const [allOrganizations,setAllorganization]=useState([])
  const [org_name,setorg_name]=useState('')
  const [org_loc,setorg_loc]=useState('')
  const [org_enitity,setorg_entity]=useState('')
  const [org_email,setorg_email]=useState('')
  const [org_web,setorg_web]=useState('')
  const [Rrole,setRrole]=useState('')
  const Navigate=useNavigate()

  useEffect(()=>{
    const setOrganizations=async()=>{
      const response=await axios.post('http://localhost:8999/getOrganizations')
      console.log(response.data)
      if(response.data.status==200)
      {
        setAllorganization(response.data.data)
      }
    }
    setOrganizations()
    
  },[])

  useEffect(()=>{
    const setOrganizations=async()=>{
      console.log('hi3')
      const response=await axios.post('http://localhost:8999/getOrganizations')
      
      if(response.data.status==200)
      {
        console.log("--->",response.data.data)
        setAllorganization(response.data.data)
      }
    }
    setOrganizations()
  },[orgval])

  const RegisterUser=async()=>{
    const email = document.getElementById('Remail').value;
    const password = document.getElementById('Rpassword').value; 
    let role=''
    let organization=''
    if(RselectedOrg.length<=0)
    {
       organization=document.getElementById('Rorg').value
    }
    else{
      organization=RselectedOrg
    }
    if(Rrole.length<=0)
    {
      role=role=document.getElementById('Rrole').value
    }
    else{
      role=Rrole
    }
    const response=await axios.post('http://localhost:8999/registerUser',{
      email:email,
      password:password,
      role:role,
      organization:organization
    })
    if(response.data.status==200)
    {
      alert('User Registered')
      setshowRegister(false)
      setcreateorg(false)
    }else{
      alert('error')
    }
    
  }
  const setloginfun=()=>{
    setshowRegister(false)
    setcreateorg(false)
  }
  const Signup=()=>{
    setshowRegister(true)
    setcreateorg(false)
  }

  const CreateOrganizationFun=async()=>{
    const name=org_name
    const location=org_loc
    const entity=org_enitity
    const email=org_email
    const website=org_web

    const response=await axios.post('http://localhost:8999/createOrganization',{
      name:name,
      location:location,
      entity:entity,
      email:email,
      website:website
    })

    if(response.data.status==200)
    {
      alert('Organization Created..')
      setcreateorg(false)
      setshowRegister(false)
    }
  }
  const CreateOrganization=()=>{
    setcreateorg(true)
    setshowRegister(false)
  }

  const loginUser = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await axios.post('http://localhost:8999/login', {
        email: email,
        password: password
      });
      console.log(response.data.status)
      const status = response.data.status;
      if (status == 200) {
        localStorage.setItem('login',true)
        localStorage.setItem("email", email);
        localStorage.setItem("role",response.data.role)
        
        setLoginIn(true);
        Navigate('/dashboard')
        window.location.reload()
      } 
      if(status==-200)
      {
          Navigate("/")
          setShowError(true);
        
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='font-roboto w-[100%] h-screen bg-gray-200 flex items-center justify-center'>
      <div className='flex relative flex-row w-[60%] h-[70%] bg-white rounded-xl border-gray-300 borddr-[1px] shadow-md'>
        <div className='space-y-3 z-40 flex-col absolute w-[50%] h-[100%] bg-blue-500 rounded-r-xl shadow-lg shadow-gray-400 border-r-[1px] border-gray-300 flex items-center justify-center text-white'>
          <p className='text-[25px] tracking-wider'>Incube Web Login</p>
          <div className='flex flex-row h-[5%] w-[100%] items-center justify-center'>
            <div className='text-[14px] w-[60px] h-[100%] flex items-center justify-center pt-[2px]'>
            </div>
          </div>
        </div>
        <div className='text-gray-600 flex flex-row space-y-2 w-[100%] h-[100%] items-center justify-center'>
          {!createorg &&!showRegister?
            
            <div className='flex flex-col space-y-2 ml-[50%] h-[100%] w-[50%] items-center justify-center'>
              <p className='text-[16px] '>Login User</p>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1'>Email</p>
                <input id='email' type='text' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='Email' />
              </div>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1'>Password</p>
                <input id='password' type='password' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='Password' />
              </div>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1'>Organization</p>
                <select id='org' className='text-[14px] rounded-md border-gray-300 border-[1px] h-[40px]' onChange={(e)=>setselectedorg(e.target.value)} >
                  {
                    allOrganizations.map(organization=>
                    <option key={organization._id} className='text-gray-400'>{organization.name}</option>
                  )
                  }
                </select>
              </div>
              <div className='flex flex-row space-x-2 w-[70%] h-[15%] items-center justify-center'>
                  <div className='bg-gradient-to-r from-red-500 to-red-600 h-[40px] rounded-md hover:bg-blue-800 select-none cursor-pointer flex items-center justify-center w-[80px]' onClick={loginUser}>
                  <p className='text-white text-[14px]'>Login</p>
                </div>
                <div className='bg-gradient-to-r from-sky-500 to-blue-600 h-[40px] rounded-md hover:bg-blue-800 select-none cursor-pointer flex items-center justify-center w-[80px]' onClick={Signup}>
                  <p className='text-white text-[14px]'>Sign up</p>
                </div>
                <div className='bg-gradient-to-r from-sky-500 to-blue-600 h-[40px] rounded-md hover:bg-blue-800 select-none cursor-pointer flex items-center justify-center w-[180px]' onClick={CreateOrganization}>
                  <p className='text-white text-[14px]'>Create Organization</p>
                </div>
              </div>
              <div className='flex flex-col w-[100%] h-[10%] items-center justify-center'>
                {showError? <p className='text-[14px] text-red-400'>Incorrect email or password</p>:<></>}
              </div>
            </div>
            :
            createorg &&!showRegister?
            <div className='space-y-2 flex flex-col ml-[50%] h-[90%] w-[50%] items-center justify-center'>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1'>Name</p>
                <input onChange={(e)=>setorg_name(e.target.value)} type='text' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='Name' />
              </div>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1'>Location</p>
                <input onChange={(e)=>setorg_loc(e.target.value)} type='text' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='eg.India' />
              </div>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1'>Entity</p>
                <input onChange={(e)=>setorg_entity(e.target.value)} type='text' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='pvt.' />
              </div>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1'>Email</p>
                <input onChange={(e)=>setorg_email(e.target.value)} type='text' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='abc@incube.com' />
              </div>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1'>Website</p>
                <input onChange={(e)=>setorg_web(e.target.value)} type='text' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='incube.com' />
              </div>
              <div className='flex flex-row space-x-2 w-[70%] h-[15%] items-center justify-center'>
                  <div className='bg-gradient-to-r from-sky-500 to-blue-600 h-[40px] rounded-md hover:bg-blue-800 select-none cursor-pointer flex items-center justify-center w-[80px]' onClick={setloginfun}>
                  <p className='text-white text-[14px]'>Login</p>
                </div>
                <div  className='bg-gradient-to-r from-sky-500 to-blue-600 h-[40px] rounded-md hover:bg-blue-800 select-none cursor-pointer flex items-center justify-center w-[80px]' onClick={Signup}>
                  <p className='text-white text-[14px]'>Sign up</p>
                </div>
                <div className='bg-gradient-to-r from-red-500 to-red-600 h-[40px] rounded-md hover:bg-blue-800 select-none cursor-pointer flex items-center justify-center w-[180px]' onClick={CreateOrganizationFun}>
                  <p className='text-white text-[14px]'>Create Organization</p>
                </div>
              </div>

            </div>
            :
            <div className=' flex space-y-2 flex-col ml-[50%] h-[100%] w-[50%] items-center justify-center'>
              <p className=' text-[16px]'>Sign up User</p>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1'>Email</p>
                <input id='Remail' type='text' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='Email' />
              </div>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1'>Password</p>
                <input id='Rpassword' type='password' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='Password' />
              </div>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1'>Organization</p>
                <select id='Rorg' className='text-[14px] rounded-md border-gray-300 border-[1px] h-[40px]' onChange={(e)=>setRselectedorg(e.target.value)} >
                  {
                      allOrganizations.map(organization=>
                      <option key={organization._id} className='text-gray-400'>{organization.name}</option>
                    )
                  }
                </select> 
              </div>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1'>Role</p>
                <select id='Rrole' className='text-[14px] rounded-md border-gray-300 border-[1px] h-[40px]' onChange={(e)=>setRrole(e.target.value)} >
                  <option className='text-gray-400'>super admin</option>
                  <option className='text-gray-400'>admin</option>
                  <option className='text-gray-400'>team lead</option>
                </select> 
              </div>
              <div className='flex flex-row space-x-2 w-[70%] h-[15%] items-center justify-center'>
                  <div className='bg-gradient-to-r from-sky-500 to-blue-600 h-[40px] rounded-md hover:bg-blue-800 select-none cursor-pointer flex items-center justify-center w-[80px]' onClick={setloginfun}>
                  <p className='text-white text-[14px]'>Login</p>
                </div>
                <div  className='bg-gradient-to-r from-red-500 to-red-600 h-[40px] rounded-md hover:bg-blue-800 select-none cursor-pointer flex items-center justify-center w-[80px]' onClick={RegisterUser}>
                  <p className='text-white text-[14px]'>Sign up</p>
                </div>
                <div className='bg-gradient-to-r from-sky-500 to-blue-600 h-[40px] rounded-md hover:bg-blue-800 select-none cursor-pointer flex items-center justify-center w-[180px]' onClick={CreateOrganization}>
                  <p className='text-white text-[14px]'>Create Organization</p>
                </div>
              </div>
              </div>
            
        
        }
        </div>
      </div>
    </div>
  );
};

export default Login;
