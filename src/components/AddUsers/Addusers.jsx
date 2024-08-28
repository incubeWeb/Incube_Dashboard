import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FiPlus, FiSearch } from 'react-icons/fi'
import CreateUser from './CreateUser'
import axios from 'axios'
import Editusers from './Editusers'
import { Link } from 'react-router-dom'
import { IoAddCircleSharp, IoKey, IoSearchOutline } from 'react-icons/io5'
import { FaUser, FaUserEdit, FaUserMinus } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import { MdEmail } from 'react-icons/md'
import { GrUserAdmin } from 'react-icons/gr'
import { Bars } from 'react-loader-spinner'

const Addusers = ({setActiveField}) => {
    const [adduser,setAdduser]=useState(false)
    const [allUsers,setAllusers]=useState([])
    const [edit,setEdit]=useState(false)
    const [selectedemail,setSelectedemail]=useState('')
    const [selectedpassword,setSelectedpass]=useState('')
    const [selectedrole,setSelectedrole]=useState('')
    const [searchUser,setSearchUser]=useState('')
    const [showsearch,setshowsearch]=useState(false)
    const [loading,setloading]=useState(true)

    useEffect(()=>{
        const setUsers=async()=>{
            let organization=localStorage.getItem('organization')
            if(searchUser.length<=0)
            {
                const response=await axios.post('http://localhost:8999/fetchallusers',{
                    organization:organization
                })
                setAllusers(response.data.data)
                
            }
            else if(searchUser.includes('\\'))
            {
                console.log(searchUser)
                setAllusers([])
            }
            else{
                const response=await axios.post('http://localhost:8999/findUsers',{
                    user:searchUser,
                    organization:organization
                })
                setAllusers(response.data.data)
                
                
            }
            setTimeout(()=>{  
                setloading(false)
              },1000)
        }
        setUsers()
        
    },[searchUser])
    
    
    

    const handleDelete=async(email)=>{
        let organization=localStorage.getItem('organization')
        const response=await axios.post('http://localhost:8999/deleteUser',{
            doneBy:localStorage.getItem('email'),
            email:email,
            organization:organization
        })
        if(response.data.status==200)
        {
            const response=await axios.post('http://localhost:8999/findUsers',{
                user:searchUser,
                organization:organization
            })
            setAllusers(response.data.data)
        }
    }
    

    const handleSearch=(e)=>{
        setSearchUser(e.target.value)
    }
    const handleEdit=(email,password,role)=>{
        setSelectedemail(email)
        setSelectedpass(password)
        setSelectedrole(role)
        setEdit(!edit)
    }
    const handleAddUser=()=>{
        setAdduser(!adduser)
    }
    useEffect(()=>{
        const getUser=async()=>{
            let organization=localStorage.getItem('organization')
            const response=await axios.post('http://localhost:8999/fetchallusers',{organization:organization})
            setAllusers(response.data.data)
            
        }
        getUser()
    },[])
  return (
    <div className='bg-white flex flex-col pt-[5%] items-center justify-start pr-[5%] pl-[23%] w-[100%] h-screen font-roboto'>
        <div className='w-[100%] h-[10%] flex flex-row space-x-3'>
            <Link to='/dashboard' onClick={()=>setActiveField('/dashboard')}><p className=' text-gray-300 hover:text-gray-500'>Dashboard</p></Link>
            <p className='text-gray-500'>/</p>
            <p className='text-gray-600'>Users</p>
        </div>
        <div className='bg-white text-gray-500 rounded-t-md p-4 flex flex-row w-[100%] h-[10%]' style={{boxShadow:'0px 1px 4px #D1D5DB'}}>
            <div className='flex flex-row w-[50%]'>
                <p className='text-[18px] font-roboto text-gray-500'>Members</p>
            </div>
            <div className=' flex flex-row w-[50%] h-[60%] space-x-3 justify-end'>
                {
                    showsearch?
                    <div className='flex border-[1px] flex-row w-[180px] h-[35px] items-center md:flex md:flex-row md:items-center md:w-[210px] rounded-md border-gray-300 border-solid space-x-3 hover:shadow-md hover:duration-150 bg-white '>
                    <FiSearch className='font-thin ml-3 text-gray-500' size={20} />
                    <input id='search' type='text' onMouseLeave={()=>setshowsearch(!showsearch)} onChange={(e)=>handleSearch(e)} placeholder='Search' className=' w-full text-[13px] h-full outline-none rounded-md border-l-0 md:text-[15px] text-gray-600' />
                </div>:
                <div className='h-[35px] flex items-center'>
                    <IoSearchOutline size={22} className='text-gray-500' onClick={()=>setshowsearch(!showsearch)}/>
                </div>

                }
                
                <div className=' w-[120px] h-[35px] rounded-md md:flex md:items-center md:space-x-2 select-none  hover:bg-sky-500 hover:text-white cursor-pointer' onClick={handleAddUser} >
                    <div className='basis-3/12 md:flex md:justify-end md:items-center h-[100%]'><IoAddCircleSharp size={22} className='cursor-pointer '/></div>
                    <p className=' text-[14px] pt-[1px]  font-noto cursor-pointer'>New User</p>
                </div>
                
            </div>
        </div>
        <div className='bg-white mt-[10px] w-[100%] h-[440px] overflow-y-auto rounded-md flex flex-col p-4' style={{boxShadow:'0px 1px 4px #D1D5DB'}}>
            <div className='flex flex-row w-[100%] h-[40px] font-noto'>
                <div className='w-[40%] h-[100%] flex items-center justify-start space-x-2'>
                    <p className='text-[16px] pl-0 font-medium text-gray-500'>Email</p>
                    <div className='pt-[3px]'>
                    <MdEmail size={17} className='text-gray-600'/>
                    </div>
                </div>
                <div className='w-[30%] items-center justify-start flex h-[100%] space-x-2'>
                    
                    <p className='text-[16px] pl-1 font-medium text-gray-500'>Password</p>
                    <div className='pt-[3px]'>
                        <IoKey size={17} className='text-gray-600'/>
                    </div>
                </div>
                <div className='w-[30%] flex pl-2 items-center justify-start h-[100%] space-x-2'>
                    <p className='text-[16px] font-medium text-gray-500'>Role</p>
                    <div className='pt-[3px]'>
                        <GrUserAdmin size={17} className='text-gray-600'/>
                    </div>
                </div>
            </div>
            <div className='w-[100%] h-[1px] mt-2 '> </div>

            {
                !loading?
                <div className= ' w-[100%] h-[10%] flex flex-col space-y-2 mt-[10px]'>
                    {
            
                        allUsers.length>0?
                        allUsers.map(user=>
                        <div key={user._id} className='flex flex-row  rounded-md  w-[100%]'>
                            <div className='space-x-2 w-[40%] h-[40px] flex items-center justify-start'>
                                <FaUser className='text-gray-500'/>
                                <p className='text-[15px] pl-2 pt-[2px] font-noto text-gray-800'>{user.email}</p>
                            </div>
                            <div className='w-[30%] items-center justify-start flex h-[100%]'>
                                <p className='text-[15px] pl-2 font-noto text-gray-800'>{user.password}</p>
                            </div>
                            <div className='w-[20%] flex pl-2 items-center justify-start h-[100%] '>
                                <div className='border-[1px] border-gray-300 flex flex-row items-center h-[27px] space-x-1 rounded-md p-2'>
                                    <GoDotFill size={12} className={`${user.role=='super admin'?'text-red-800':user.role=='admin'?'text-green-800':user.role=='team lead'?'text-purple-800':'text-sky-500'}`}/>
                                    <p className='text-[14px] font-noto'>{user.role}</p>
                                </div>
                            </div>
                            <div className='w-[10%] flex flex-col pl-2 items-center justify-start h-[100%]'>
                            <div className='basis-1/2 flex justify-end space-x-3 text-gray-800'><p className='text-[14px] text-gray-600 cursor-pointer font-roboto items-center flex' onClick={()=>handleEdit(user.email,user.password,user.role)}><FaUserEdit size={20}/></p><p className='text-[14px] text-red-500 cursor-pointer font-roboto flex items-center' onClick={()=>handleDelete(user.email)}><FaUserMinus size={20} /></p></div>
                            </div>        
                        </div>
                        )
                        :
                        <></>
                    }
                </div>
                :
                <div className='w-[100%]' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Bars color="#8884d8" height={80} width={80} />
                </div>
            }
            

        </div>
        {
            adduser?
            <CreateUser handleAddUser={handleAddUser} setAllusers={setAllusers}/>
            :
            <></>
        }
        {
            edit?
                <Editusers handleEdit={handleEdit} email={selectedemail} password={selectedpassword} role={selectedrole} edit={edit} setAllusers={setAllusers}/>
                :
                <></>
                
            
        }
    </div>
  )
}

export default Addusers