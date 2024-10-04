import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoInformationCircle, IoPersonRemove, IoShareSocial } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import Privatekeypopup from './Privatekeypopup'
import axios from 'axios'
import ShareKeysWith from './ShareKeysWith'

const Apikeys = ({hidenavbar,realtimecheckAPikeys}) => {
    const [addField,setaddField]=useState([{uniqueid:1,Type:'Gemini',Api_value:'',security:'private',Creator:localStorage.getItem('email'),Member:localStorage.getItem('email'),active:'no'}])
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
            const organization=localStorage.getItem('organization')
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-creator-keys`,{
                organization:organization,
                Creator:localStorage.getItem('email')
            })
            
            if(response.data.data.length<=0)
            {
                setaddField([{uniqueid:1,Type:'Gemini',Api_value:'',security:'private',Creator:localStorage.getItem('email'),Member:localStorage.getItem('email'),active:'no'}])
            }
            else{
                setaddField(response.data.data)
                setcreatedKeys(response.data.data)
                
            }
        }
        
        const availableKeys=async()=>{
            const response1=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-public-apikeys`,{
                organization:localStorage.getItem('organization')
            })
            const response2=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-private-apikeys`,{
                organization:localStorage.getItem('organization'),
                Member:localStorage.getItem('email')
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
    },[])

    useEffect(()=>{
        const fieldadd=async()=>{
            const organization=localStorage.getItem('organization')
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-creator-keys`,{
                organization:organization,
                Creator:localStorage.getItem('email')
            })
            
            if(response.data.data.length<=0)
            {
                setaddField([{uniqueid:1,Type:'Gemini',Api_value:'',security:'private',Creator:localStorage.getItem('email'),Member:localStorage.getItem('email'),active:'no'}])
            }
            else{
                setaddField(response.data.data)
                setcreatedKeys(response.data.data)
                
            }
        }
        const availableKeys=async()=>{
            const response1=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-public-apikeys`,{
                organization:localStorage.getItem('organization')
            })
            const response2=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-private-apikeys`,{
                organization:localStorage.getItem('organization'),
                Member:localStorage.getItem('email')
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
        setaddField(prev=>[...prev,{uniqueid:id,Type:'Gemini',Api_value:'',security:'private',Creator:localStorage.getItem('email'),Member:localStorage.getItem('email'),active:'no'}])
    }
    const handledeletefield=async(id,value)=>{

        const organization=localStorage.getItem('organization')
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/delete-apikey`,{
            organization:organization,
            Member:localStorage.getItem('email'),
            Api_value:value
        })
        if(response.data.status==200)
        {
            setaddField(addField.filter(val=>val.uniqueid!=id))
        }
    }

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
        const newfield=[{uniqueid:id,Type:type,Api_value:key,security:security,Creator:localStorage.getItem('email'),Member:localStorage.getItem('email'),active:'no'}]
        setaddField([...fieldwithout,...newfield])
    }

    const handlefieldkey=(id,key)=>{
        const field=addField.filter(val=>val.uniqueid==id)
        const fieldwithout=addField.filter(val=>val.uniqueid!=id)
        const type=field[0].Type
        const security=field[0].security
        const newfield=[{uniqueid:id,Type:type,Api_value:key,security:security,Creator:localStorage.getItem('email'),Member:localStorage.getItem('email'),active:'no'}]
        setaddField([...fieldwithout,...newfield])
    }
    const handleSave=async()=>{
        const organization=localStorage.getItem('organization')
        const Members=addField
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/save-apikeys`,{
            organization:organization,
            Members:Members,
            
        })
        if(response.data.status==200)
        {    
            
            if(response.data.status==200)
            {
                alert('key saved')
            }
            
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
        const organization=localStorage.getItem('organization')
        const finalVal=    availablekeys.map(item => {
            if (item.security === 'public') {
                // Update only the Member field for the matched object
                return { ...item, Member: localStorage.getItem('email') }; // Change 'newMemberValue' to whatever you want
              } else {
                // Leave the rest of the objects unchanged
                return item;
              }
    });
        const Members=finalVal
        
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/save-apikeys`,{
            organization:organization,
            Members:Members,
            
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
            organization:localStorage.getItem('organization'),
            Member:localStorage.getItem('email')  
        })
        if(response.data.status==200)
        {
            alert("Default to Incubes Api")
        }
    }

  return (
    <div className={`${hidenavbar?'pl-[4%] w-[100%]':'pl-[21%] w-[100%]'} select-none h-screen p-4 font-noto  flex flex-col space-y-4 font-inter bg-white`}>
        <div className='w-[100%] flex flex-col h-[100%] justify-center'>
        <div className='w-[100%] pt-[33px] h-[50px] flex flex-row items-center justify-start'>
                <div className='w-[20px] h-[20px] text-gray-500'><IoInformationCircle size={20} /></div>
                <div className='text-[16px] pl-2 font-bold text-gray-500'>
                    {
                        !checkisusingownkey?
                            <p>You are currently using Incube Api</p>
                        :
                            <p>You are currently using Manual APi</p>
                    }
                </div>
                
            </div>
        <div className='w-[100%] pt-[33px] h-[300px] flex flex-col'>
                <div className='text-[16px] font-inter pl-5 font-bold'>
                    <p>Available Keys</p>
                </div>
                {
                    availablekeys.length>0?
                    <div  className='space-y-2 w-[100%] flex overflow-y-auto flex-col h-[130px] p-5'>
                {
                    availablekeys.map(val=>
                    
                        <div key={val._id} className='text-[14px] font-inter flex flex-row space-x-3'>
                            <div><p className='font-bold'>{val.Type}</p></div>
                            <div><p>{val.Api_value}</p></div>
                            <div><p>created by {val.Creator}</p></div>
                            <div className='flex space-x-2 text-[13px] text-green-500'><input type='radio' checked={val.active=='yes'?true:false} onChange={(e)=>handleActivebtn(e)} value={JSON.stringify({uniqueid:val.uniqueid,Type:val.Type,Api_value:val.Api_value,security:val.security,Creator:val.Creator,Member:localStorage.getItem('email'),active:'yes'})} name='activekey'/> <p>activate</p></div>
                            <div><p className='text-[14px] text-gray-400'>{val.security}</p></div>
                        </div>
                    
                    )
                }
                <div className=' w-[100%] h-[50px] mt-4 flex flex-row space-x-2'>
                    <div onClick={handleActiveKey} className='w-[120px] h-[30px] mt-2 font-semibold font-inter text-[14px] bg-blue-500 text-white rounded-l flex items-center justify-center'>
                        <p>Active key</p>
                    </div>
                    <div onClick={handleDefaultActiveKey} className='w-[120px] h-[30px] mt-2 font-semibold
                     font-inter text-[14px] bg-blue-500 text-white rounded-l  flex items-center justify-center'>
                        <p>Set to Incubes</p>
                    </div>
                </div>
                </div>
                :
                <div  className='space-y-2 w-[100%] flex overflow-y-auto font-inter flex-col h-[130px] p-5'>
                    No avaible key
                </div>
                }
            </div>

            <div className='w-[100%] pt-[33px] h-[300px]  flex flex-col'>
                <div className='text-[16px] font-inter pl-5 font-bold'>
                    <p>Added Keys</p>
                </div>
                <div className='w-[100%] flex overflow-y-auto flex-col space-y-2 h-[110px] p-5'>
                    {/* <div className='text-[14px]'>
                        <p>0 added keys</p>
                    </div> */}
                    {
                    createdKeys.length>0?
                        createdKeys.filter(val=>val.Member==localStorage.getItem('email') && val.Creator==localStorage.getItem('email')).map(val=>
                            <div key={val._id} className='text-[14px] flex flex-row space-x-3'>
                            <div><p className='font-bold'>{val.Type}</p></div>
                            <div><p>{val.Api_value}</p></div>
                            <div>
                                <div onClick={()=>{setpopup(true);setapikeyvalue(val.Api_value);setuniqueid(val.uniqueid);setType(val.Type)}} className='cursor-pointer w-[20px] h-[20px] text-gray-700'>
                                    <IoShareSocial size={20} />
                                </div>
                                
                            </div>
                            <div>
                            <div onClick={()=>{setsharedwithpopup(true);setapikeyvalue(val.Api_value);setuniqueid(val.uniqueid);setType(val.Type)}} className='cursor-pointer w-[20px] h-[20px] text-gray-700'>
                                    <IoPersonRemove size={20} />
                                </div>
                            </div>
                            
                        </div>
                        )
                        :
                        <div className='text-[14px] font-inter'>
                            <p>0 added keys</p>
                        </div>
                    }
                    
                    
                    
                </div>
            </div>

            <div className='h-[500px] p-5 flex flex-col space-y-2'>
                <div className='w-[100%] flex space-y-2 font-inter font-bold'>
                    <p>Create/Edit Keys</p>
                </div>
                <div className='h-[100px] overflow-y-auto flex-col flex space-y-3'>
                {
                    addField.filter(val=>val.Member==localStorage.getItem('email')&& val.Creator==localStorage.getItem('email')).map(val=>
                        <div key={val.uniqueid} className='flex flex-row space-x-2  h-[30px]'>
                                <select onChange={(e)=>handleApitype(val.uniqueid,e.target.value)} className='border-[1px] border-gray-100 font-inter  text-[14px]'>
                                    <option>Gemini</option>
                                    <option>Google</option>
                                </select>
                                <div className='w-[390px] h-[30px] text-[14px]'>
                                    <input onChange={(e)=>handlefieldkey(val.uniqueid,e.target.value)} value={val.Api_value} type='text' placeholder='paste your api key' className='rounded-md flex items-center border-[1px] w-[100%] h-[100%] pl-2'/>
                                </div>
                                {
                                    addField.length>1?
                                    <div onClick={()=>handledeletefield(val.uniqueid,val.Api_value)} className='w-[20px] cursor-pointer flex items-center hover:text-red-500 text-gray-500'>
                                        <MdDelete size={20}/>

                                    </div>
                                    :
                                    <></>
                                }
                                <div className='w-[80px] space-x-2  rounded-md justify-center items-center flex flex-row h-[30px]'>
                                    <input name={`security-${val.uniqueid}`} onChange={(e)=>handlesecurityChange(val.uniqueid,e.target.value)} checked={val.security=='private'} value='private' type='radio' />
                                    <p className='text-[14px] font-semibold font-inter '>private</p>
                                </div>

                                <div className='w-[80px] space-x-2  rounded-md justify-center items-center flex flex-row h-[30px]'>
                                    <input name={`security-${val.uniqueid}`}  onChange={(e)=>handlesecurityChange(val.uniqueid,e.target.value)} value='public' checked={val.security=='public'} type='radio'/>
                                    <p className='text-[14px] font-semibold font-inter'>public</p>
                                </div>

                        </div>
                    )
                }
                </div>
                <div onClick={handlenewfield} className='cursor-pointer w-[100px] items-center justify-center space-x-2 h-[35px] flex flex-row bg-white ' style={{boxShadow: '0px 0px 4px #D1D5DB'}}>
                    <div className='text-blue-500'><FaPlus className='text-[14px]' /></div>
                    <div className='text-[14px] text-blue-500 font-bold font-inter'><p>Add Field</p></div>
                </div>
                <div onClick={handleSave} className='flex flex-row h-[120px] ml-1 items-center'>
                        <div className='w-[60px] flex items-center justify-center rounded-md h-[30px] bg-blue-500 font-bold font-inter text-white'>
                            <p>Save</p>
                        </div>
                </div>
            </div>
        </div>
        {
            popup?
            <div className='fixed left-0 w-[100%] top-[-20px] h-[100%] bg-white bg-opacity-80'>
                <Privatekeypopup realtimecheckAPikeys={realtimecheckAPikeys} Type={Type} uniqueid={uniqueid} apikeyvalue={apikeyvalue} hidenavbar={hidenavbar} setpopup={setpopup}/>
            </div>
            :
            <></>
        }

        {
            sharewithpopup?
            <div className='fixed left-0 w-[100%] top-[-20px] h-[100%] bg-white bg-opacity-80'>
                <ShareKeysWith realtimecheckAPikeys={realtimecheckAPikeys} Type={Type} Api_value={apikeyvalue} hidenavbar={hidenavbar} setsharedwithpopup={setsharedwithpopup}/>
            </div>
            :
            <></>
        }

    </div>
  )
}

export default Apikeys