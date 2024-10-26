import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState, useRef } from 'react';
import { RxCross2 } from 'react-icons/rx'
import { FaMinus } from 'react-icons/fa'
import { MdGroupRemove } from 'react-icons/md'


const PortfolioShared = ({realtimeportfoliostate,setsharedwithusers,setclickedPortfolioShared,hidenavbar ,handlesavestate,sharedwithusers}) => {
  const [organziationUsers,setorganizationusers]=useState([])
  const [checkedUsers,setcheckedUsers]=useState([])
  const [popupType, setPopupType] = useState('private');
  const token=localStorage.getItem('token')
  const userdata=jwtDecode(token)
  const Logemail=userdata.userdetails.email
  const Logorganization=userdata.userdetails.organization
  const Logrole=userdata.userdetails.role
  const[showUsersList,setUsersList]=useState(false)
  const[showRemoveList,setRemoveList]=useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [organziationUsers1,setorganizationusers1]=useState([])
 
  const [portfoliosecurity,setportfoliosecurity]=useState('private')

  const [popupLoader,setpopupLoader]=useState(true)
  const componentRef = useRef(null);
  const handlecancel=()=>{
    setclickedPortfolioShared(false)
}
  const setUsers=async()=>{
    let organization=Logorganization
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/fetchallusers`,{
      organization:organization
    },{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
    setorganizationusers(response.data.data)
    response.data.data.map(val=>{  
      setcheckedUsers(prev=>[...prev,{email:val.email,value:false}])
    })
 

  }
  useEffect(()=>{
    try{
    setUsers()
    }catch(e)
    {
      setUsers()
    }
  },[])

  useEffect(()=>{
    try{
      setUsers()
      }catch(e)
      {
        setUsers()
      }
  },[realtimeportfoliostate])

 useEffect(()=>{
console.log("zx",organziationUsers)
 },[])

  const handleCheckboxchange=(id)=>{
    
    const new_list=checkedUsers.filter(val=>val.email==id)
    let temp_val=false
    new_list.map(val=>{
      temp_val=val.value
    })
    const new_temp_val=!temp_val
    const new2_list=checkedUsers.filter(val=>val.email!=id)
    const new3_list=[{email:id,value:new_temp_val}]
    const val=[...new2_list,...new3_list]
    setcheckedUsers(val)
  }
  
  const handlesharenow = () => {
    setUsersList(false);
    setRemoveList(true);
    if (portfoliosecurity === 'public') {
      setportfoliosecurity('public')
      handlecancel();
    } else {
      setPopupType('private');
      handlecancel() // Set to private otherwise
    }
    const selectedUsers = checkedUsers.filter(val => val.value === true);
    
    // Filter out duplicates
    const uniqueSelectedUsers = selectedUsers.filter(selectedUser => 
        !organziationUsers1.some(existingUser => existingUser.email === selectedUser.email)
    );

    // Update sharedwithusers and organizationUsers1 with unique users
    const newSharedWithUsers = [...sharedwithusers, ...uniqueSelectedUsers];
   
    setsharedwithusers(newSharedWithUsers);

    // Save state
    handlesavestate1(newSharedWithUsers);

    // Update the added users (organziationUsers1) directly
    setorganizationusers1(prevState => [...prevState, ...uniqueSelectedUsers]);
    
};
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setUsersList(true);
};
useEffect(()=>{
  const settingusers=async()=>{
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getportfoliostate`,{email:Logemail,organization:Logorganization},{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
    if(response.data.status==200)
    {
    
      setorganizationusers1(JSON.parse(response.data.sharewith))
      setportfoliosecurity(response.data.security); 
      setpopupLoader(false)
    }
    else if(response.data.status==-400){
      setpopupLoader(false)
    }
    
  }
  try{
  settingusers()
  }catch(e)
  {
    settingusers()
  }
},[])

useEffect(()=>{
  const settingusers=async()=>{
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getportfoliostate`,{email:Logemail,organization:Logorganization},{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
    if(response.data.status==200)
    {
      setorganizationusers1(JSON.parse(response.data.sharewith))
      setportfoliosecurity(response.data.security);
      setpopupLoader(false)
    }else if(response.data.status==-400){
      setpopupLoader(false)
    }
    
  }
  try{
  settingusers()
  }catch(e)
  {
    settingusers()
  }
},[realtimeportfoliostate])


const handleremoveUser = async (email) => {
  // Filter out the removed user
  const newSharedList = organziationUsers1.filter(item => item.email !== email);
  setorganizationusers1(newSharedList);
  setsharedwithusers(newSharedList);

  // Save the updated state
  await handlesavestate1(newSharedList);
};

const handleClickOutside = (event) => {
  if (componentRef.current && !componentRef.current.contains(event.target)) {
    handlecancel();
  }
};
useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
useEffect(() => {
  setPopupType(portfoliosecurity);
}, [portfoliosecurity]);

const handlesavestate1 = async (selectedUsers) => {
  try {
    const organization=`${Logorganization}_Topcards`
    const organization1=Logorganization
    const organization2=`${Logorganization}_ShownGraph`
      const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setportfoliostate`, {
          email: Logemail,
          security: portfoliosecurity,
          sharedwith: JSON.stringify(selectedUsers), // Use selectedUsers instead of sharedwithusers
       
          organization1:organization1,
          organization2:organization2,
          organization:organization
               
      }, {
          headers: {
              "Authorization": `Bearer ${token}`
          }
      });
      
      // if (response.data.status === 200) {
        
      // } else {
      //     console.error("Error saving state", response.data);
      // }
  } catch (error) {
      console.error("Error in handlesavestate", error);
  }
};



    return (
      <div  ref={componentRef}  className={`${hidenavbar ? 'ml-[2%] w-[90%]' : 'ml-[20%] w-[80%]'} font-inter h-screen pt-[5%] flex flex-col p-4 items-center justify-center space-y-4`}>
     {!popupLoader?
      <div className='relative flex flex-col  w-[430px] h-[500px] bg-white p-4 border border-gray-100 rounded-lg shadow-lg space-y-4'>
      <div className="absolute top-4 right-4 cursor-pointer" onClick={handlecancel}>
        <RxCross2 />
      </div>
      
          {/* Header */}
          <div className="flex items-center text-[18px] font-semibold text-gray-900 relative">
  <span className='font-semibold font-inter'>Share your portfolio</span>
  {portfoliosecurity === 'private' && (
    <MdGroupRemove 
      onClick={() => {
        setRemoveList(true);
        setUsersList(false);
        setportfoliosecurity('private');
      }} 
      size={20} 
      className='cursor-pointer ml-6' // Adjust margin if needed
    />
  )}
  <select 
    className='h-[30px] font-inter font-bold text-[14px] cursor-pointer rounded-md ml-4' // Add margin for spacing
    value={portfoliosecurity} 
    onChange={(e) => { setportfoliosecurity(e.target.value); 
    if (portfoliosecurity=='public'){
      setRemoveList(false)
    }
    }}
    
  >
    <option value='public'>Public</option>
    <option value='private'>Private</option>
  </select>
</div>

          {/* Invite Team Members */}
         {/* Invite Team Members */}
{portfoliosecurity === 'private' && (
  <div>
    <label className="block text-gray-700 text-[14px] mb-2">Invite team members</label>
    <input
      type="text"
      placeholder="Search"
      value={searchQuery}
      onChange={handleSearchChange}
      onFocus={() => {
        setUsersList(true); // Show the user list
        setSearchQuery(''); // Clear search query
        setRemoveList(false); 
        
        
        // Reset remove list
      }}
      className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-sm focus:outline-none"
    />
  </div>
)}
{!showUsersList && portfoliosecurity === 'private' &&(
  <div>
    <p className="text-gray-500 text-sm text-[16px] font-semibold">This will make your Portfolio Private</p>
  </div>
)}

{showUsersList && portfoliosecurity === 'private' && (
  <div className="h-[300px] max-h-[250px] overflow-y-auto scrollbar-hide space-y-1">
    {organziationUsers.length > 0 ? 
      organziationUsers
        .filter(val => 
          val.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !organziationUsers1.some(existingUser => existingUser.email === val.email) // Exclude already added users
        )
        .map(val =>
          val.email !== Logemail ? (
            <div key={val._id} className='w-full p-2 h-[40px] flex flex-row space-x-2'>
              <div className='w-[50%] flex items-center justify-start'>
                <p className='text-[14px] font-semibold'>{val.email}</p>
              </div>
              <div className='w-[50%] flex items-center justify-end'>
                <input 
                  type='checkbox' 
                  onChange={() => handleCheckboxchange(val.email)} 
                  checked={checkedUsers.find(u => u.email === val.email)?.value || false} 
                />
              </div>
            </div>
          ) : null
        ) 
      : <p className="text-gray-500 text-sm">No users found</p>
    }

    {organziationUsers1.length+1 === organziationUsers.length && (
      <p className="text-gray-500 text-sm text-[16px] font-semibold">All users are already added!</p>
    )}
  </div>
)}


{portfoliosecurity === 'public' && (
  <div className="text-gray-500 text-[16px] font-semibold text-center flex justify-between items-center">
    All users can view this portfolio.
    
  </div>
)}
          
{showRemoveList && portfoliosecurity === 'private' && (  
    <div className='w-full space-y-3'>
        <div>
            <p className='text-[12px] font-bold text-gray-700 font-inter mt-2 mb-2'>Portfolio by {Logemail}</p>
            {organziationUsers1.length > 0 && (
                <label className="block text-gray-700 font-semibold mb-2">Added Users</label>
            )}
        </div>

        <div className='flex flex-wrap gap-4 overflow-y-auto scrollbar-hide max-h-[200px]'>
            {organziationUsers1.filter(val => val.Member !== Logemail).map(val => (
                <span key={val._id} className='bg-blue-200 text-blue-500 px-2 py-1 rounded-full text-sm flex items-center'>
                    <p className='text-[14px] font-semibold'>{val.email}</p>
                    <div className='ml-2 cursor-pointer' onClick={() => handleremoveUser(val.email)}>
                        <RxCross2 size={18} className='text-white'/>
                    </div>
                </span>
            ))}
        </div>
    </div>
)}



          {/* Send Invite Button */}
{ portfoliosecurity === 'private' || portfoliosecurity === 'public' ?

          <div className='absolute bottom-4 left-0 right-0 w-full p-4'>
          <button onClick={()=>{handlesharenow()}} className="w-full bg-blue-600 text-white py-2 rounded-lg">Done</button>
    </div>: <></>
}
      </div>
      :
      <div className='flex items-center justify-center text-gray-500 text-sm text-[16px] font-semibold'>
         <div className='relative flex flex-col items-center justify-center  w-[430px] h-[500px] bg-white p-4 border border-gray-100 rounded-lg shadow-lg space-y-4'>
          <p>Loading State ...</p>
          </div>
      </div>
      }
  </div>
    )
  }


export default PortfolioShared