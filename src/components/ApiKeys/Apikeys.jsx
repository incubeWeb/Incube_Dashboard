import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoInformationCircle, IoPersonRemove, IoShareSocial } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import Privatekeypopup from './Privatekeypopup'
import axios from 'axios'
import ShareKeysWith from './ShareKeysWith'
import { jwtDecode } from 'jwt-decode'
import ChatBot from '../GenaiBox/ChatBot'
import { FaKey } from "react-icons/fa";

const Apikeys = ({hidenavbar,realtimecheckAPikeys}) => {
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
    const [addField,setaddField]=useState([{uniqueid:1,Type:'Gemini',Api_value:'',security:'private',Creator:Logemail,Member:Logemail,active:'no'}])
    const [popup,setpopup]=useState(false)
    const [availablekeys,setavailablekeys]=useState([])
    const [createdKeys,setcreatedKeys]=useState([])
    const [apikeyvalue,setapikeyvalue]=useState('')
    const [uniqueid,setuniqueid]=useState('')
    const [Type,setType]=useState('')
    const [sharewithpopup,setsharedwithpopup]=useState(false)
    

    const [checkisusingownkey,setisusingownkey]=useState(false)
    const getUniqueActiveValues = (arr) => {
        return arr.reduce((acc, current) => {
          const existing = acc.find(item => item.Api_value === current.Api_value);
          
          if (!existing) {
            // If there's no existing object with the same Api_value, add it to the result
            acc.push(current);
          } else if (current.active === 'yes') {
            // If there's an existing object but the current one has active 'yes', replace it
            acc = acc.map(item => 
              item.Api_value === current.Api_value ? current : item
            );
          }
          
          return acc;
        }, []);
      };


    useEffect(()=>{
        const fieldadd=async()=>{
            const organization=Logorganization
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-creator-keys`,{
                organization:organization,
                Creator:Logemail
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
              console.log(response,"this is respoonse")
            
            if(response.data.data.length<=0)
            {
                setaddField([{uniqueid:1,Type:'Gemini',Api_value:'',security:'private',Creator:Logemail,Member:Logemail,active:'no'}])
            }
            else{
                setaddField(response.data.data)
                setcreatedKeys(response.data.data)
                
            }
        }
        
        const availableKeys=async()=>{
            const response1 = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-public-apikeys`, {
                organization: Logorganization
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        
            const response2 = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-private-apikeys`, {
                organization: Logorganization,
                Member: Logemail
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        
            const data1 = response1.data.data;
            const data2 = response2.data.data;
            const merged = [...data1, ...data2];
        
            // Update based on active keys
            const lenactive = merged.filter(val => val.active === 'yes');
            setisusingownkey(lenactive.length > 0);
        
            const filter = getUniqueActiveValues(merged);
            
            // Show "No Available Key" if filter is empty
            if (filter.length === 0) {
                setavailablekeys([]);
            } else {
                setavailablekeys(filter);
            }
        };
        

        fieldadd()
        availableKeys()
    },[])

    useEffect(()=>{
        const fieldadd=async()=>{
            const organization=Logorganization
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-creator-keys`,{
                organization:organization,
                Creator:Logemail
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            
            if(response.data.data.length<=0)
            {
                setaddField([{uniqueid:1,Type:'Gemini',Api_value:'',security:'private',Creator:Logemail,Member:Logemail,active:'no'}])
            }
            else{
                setaddField(response.data.data)
                setcreatedKeys(response.data.data)
                
            }
        }
        const availableKeys=async()=>{
            const response1=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-public-apikeys`,{
                organization:Logorganization
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            const response2=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-private-apikeys`,{
                organization:Logorganization,
                Member:Logemail
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            const data1=response1.data.data
            const data2=response2.data.data
          
            const merged=[...data1,...data2]
            const lenactive=merged.filter(val=>
                val.active=='yes'
            )
            
            if(lenactive.length>0)
            {
                setisusingownkey(true)
            }
            else{
                setisusingownkey(false)
            }
            const filter=getUniqueActiveValues(merged)
            setavailablekeys(filter)
        }

        fieldadd()
        availableKeys()
    },[realtimecheckAPikeys])


    const handlenewfield=()=>{
        const lastIndex=addField[addField.length-1]
        const id=parseInt(lastIndex.uniqueid)+1
        setaddField(prev=>[...prev,{uniqueid:id,Type:'Gemini',Api_value:'',security:'private',Creator:Logemail,Member:Logemail,active:'no'}])
    }
    const handledeletefield = async (id, value) => {
        const organization = Logorganization;
        
        // Delete the key from the server
        const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/delete-apikey`, {
            organization: organization,
            Member: Logemail,
            Api_value: value
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    
        // Check if the deletion was successful
        if (response.data.status == 200) {
            // Update the available keys after deletion
            const updatedKeys = addField.filter(val => val.uniqueid !== id);
            setaddField(updatedKeys);
    
            // If no keys remain, update the display to show "No Available Key"
            if (updatedKeys.length === 0) {
                setavailablekeys([]);
                setisusingownkey(false);
            } else {
                setavailablekeys(updatedKeys);
            }
        }
    };
    

    const handlesecurityChange = (id, value) => {
        setaddField(prevFields =>
            prevFields.map(field =>
                field.uniqueid === id ? { ...field, security: value } : field
            )
        );
    };

    const handleApitype=(id,type)=>{
        const field=addField.filter(val=>val.uniqueid==id)
        const fieldwithout=addField.filter(val=>val.uniqueid!=id)
        const key=field[0].Api_value
        const security=field[0].security
        const newfield=[{uniqueid:id,Type:type,Api_value:key,security:security,Creator:Logemail,Member:Logemail,active:'no'}]
        setaddField([...fieldwithout,...newfield])
    }

    const handlefieldkey=(id,key)=>{
        const field=addField.filter(val=>val.uniqueid==id)
        const fieldwithout=addField.filter(val=>val.uniqueid!=id)
        const type=field[0].Type
        const security=field[0].security
        const newfield=[{uniqueid:id,Type:type,Api_value:key,security:security,Creator:Logemail,Member:Logemail,active:'no'}]
        setaddField([...fieldwithout,...newfield])
    }
    const handleSave=async()=>{
        const organization=Logorganization
        const Members=addField
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/save-apikeys`,{
            organization:organization,
            Members:Members,
            
        },{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
        if(response.data.status==200)
        {    
            
           console.log("save")
        }
       // alert(JSON.stringify(addField))
    }
    const [activeKeyfield,setactivekeyfield]=useState([])
    const handleActivebtn=(e)=>{
        const updateValue=[JSON.parse(e.target.value)]
        const value=JSON.parse(e.target.value)
        setactivekeyfield(updateValue)
        
        const updatedData = availablekeys.map(item => 
            item.Api_value === value.Api_value ? { ...item, active: 'yes' } : {...item,active:'no'}
          );
         
        const filter = getUniqueActiveValues(updatedData)
        setavailablekeys(filter)
    }
    const handleActiveKey=async()=>{
        const organization=Logorganization
        const finalVal=    availablekeys.map(item => {
            if (item.security === 'public') {
                // Update only the Member field for the matched object
                return { ...item, Member: Logemail }; // Change 'newMemberValue' to whatever you want
              } else {
                // Leave the rest of the objects unchanged
                return item;
              }
    });
        const Members=finalVal
        
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/save-apikeys`,{
            organization:organization,
            Members:Members,
            
        },{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
        if(response.data.status==200)
        {    
            
            if(response.data.status==200)
            {
                alert('Activated key')
            }
            
        }
        
    }
    const handleDefaultActiveKey=async()=>{
        

        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/set-allactivefield-to-no`,{
            organization:Logorganization,
            Member:Logemail  
        },{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
        if(response.data.status==200)
        {
            alert("Default to Incubes Api")
        }
    }

  return (
 
        
        
        <div className={`${hidenavbar ? 'ml-[4%] w-[96%]' : 'ml-[22%] w-[78%]'} select-none h-screen p-4 font-noto flex flex-col space-y-4 bg-gray-50`}>
    <div className='w-full flex flex-col bg-white rounded-lg shadow-lg p-6'>
        <div className='flex items-center text-gray-500 mb-4'>
            <IoInformationCircle size={20} className="mr-2" />
            <span className="text-lg font-bold">
                {checkisusingownkey ? 'You are currently using Manual API' : 'You are currently using Incube API'}
            </span>
        </div>

        <div className='mb-8'>
           
        {availablekeys.length > 0 ? (
    <>
        <h2 className="text-gray-500 text-md font-semibold mb-2">
            Available Keys 
            <FaKey className="inline ml-2 text-gray-600" />
        </h2>
        <div className="space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-2">
            {availablekeys.map((val) => (
                <div key={val._id} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                    <span className="text-sm font-bold">{val.Type}</span>
                    <span className="text-gray-500">{val.Api_value}</span>
                    <span className="text-gray-400">Created by {val.Creator}</span>
                    <input
                        type="radio"
                        id={`active-${val._id}`}
                        checked={val.active === 'yes'}
                        onChange={() => handleActivebtn(val._id)}
                        value={val._id}
                        name="activekey"
                    />
                    <label htmlFor={`active-${val._id}`} className="text-xs text-green-500 cursor-pointer">
                        Activate
                    </label>
                </div>
            ))}
        </div>
    </>
) : (
    <p className="flex items-center text-gray-500 text-md font-semibold">
        No Available Key
        <FaKey className="ml-2 text-gray-600" />
    </p>
)}


        </div>

        <div className='mb-8'>
            <h2 className="text-gray-800 text-md font-bold mb-2">Added Keys</h2>
            {createdKeys.length > 0 ? (
                <div className='space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-2'>
                    {createdKeys.filter(val => val.Member === Logemail && val.Creator === Logemail).map((val) => (
                        <div key={val._id} className='flex items-center justify-between bg-gray-100 p-3 rounded-md'>
                            <span className='text-sm font-bold'>{val.Type}</span>
                            <span className='text-gray-500'>{val.Api_value}</span>
                            <IoShareSocial size={20} className="text-gray-700 cursor-pointer" onClick={() => setpopup(true)} />
                            <IoPersonRemove size={20} className="text-gray-700 cursor-pointer" onClick={() => setsharedwithpopup(true)} />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-md font-semibold">0 added keys</p>
            )}
        </div>

        <div className='flex flex-col space-y-4'>
            <h2 className="font-bold text-gray-800">Create/Edit Keys</h2>
            
            {/* Field Inputs */}
            {addField.map((val) => (
                <div key={val.uniqueid} className='flex items-center space-x-4'>
                    <select onChange={(e) => handleApitype(val.uniqueid, e.target.value)} className='border-gray-300 text-sm rounded-md'>
                        <option>Gemini</option>
                        <option>Google</option>
                    </select>
                    <input onChange={(e) => handlefieldkey(val.uniqueid, e.target.value)} value={val.Api_value} placeholder='Paste your API key' className='border rounded-md p-2 w-64' />
                    {addField.length > 1 && (
                        <MdDelete size={20} className="text-red-500 cursor-pointer" onClick={() => handledeletefield(val.uniqueid, val.Api_value)} />
                    )}
                    <div className='flex space-x-2'>
                        <label className='flex items-center space-x-1'>
                            <input type='radio' name={`security-${val.uniqueid}`} value='private' checked={val.security === 'private'} onChange={(e) => handlesecurityChange(val.uniqueid, e.target.value)} />
                            <span className='text-gray-600 text-sm'>Private</span>
                        </label>
                        <label className='flex items-center space-x-1'>
                            <input type='radio' name={`security-${val.uniqueid}`} value='public' checked={val.security === 'public'} onChange={(e) => handlesecurityChange(val.uniqueid, e.target.value)} />
                            <span className='text-gray-600 text-sm'>Public</span>
                        </label>
                    </div>
                </div>
            ))}
            
            {/* Add Field Button */}
            <div onClick={handlenewfield} className='cursor-pointer w-[100px] items-center justify-center space-x-2 h-[35px] flex flex-row bg-white' style={{ boxShadow: '0px 0px 4px #D1D5DB' }}>
                <div className='text-blue-500'><FaPlus className='text-[14px]' /></div>
                <div className='text-[14px] text-blue-500 font-bold font-inter'><p>Add Field</p></div>
            </div>

            {/* Save Button */}
            <button onClick={handleSave} className='w-20 p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600'>
                Save
            </button>
        </div>
    </div>


        
        {
            popup?
            <div className='fixed left-0 w-[100%] top-[-20px] h-[100%] bg-black bg-opacity-40'>
                <Privatekeypopup realtimecheckAPikeys={realtimecheckAPikeys} Type={Type} uniqueid={uniqueid} apikeyvalue={apikeyvalue} hidenavbar={hidenavbar} setpopup={setpopup}/>
            </div>
            :
            <></>
        }

        {
            sharewithpopup?
            <div className='fixed left-0 w-[100%] top-[-20px] h-[100%] bg-black bg-opacity-40'>
                <ShareKeysWith realtimecheckAPikeys={realtimecheckAPikeys} Type={Type} Api_value={apikeyvalue} hidenavbar={hidenavbar} setsharedwithpopup={setsharedwithpopup}/>
            </div>
            :
            <></>
        }
    </div>
  )
}

export default Apikeys