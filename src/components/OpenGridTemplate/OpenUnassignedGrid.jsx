import React, { useEffect, useRef, useState } from 'react';
import { CgFormatSlash } from "react-icons/cg";
import { gsap } from 'gsap/gsap-core';
import { useGSAP } from '@gsap/react';
import { RiExchangeFundsFill } from "react-icons/ri";
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import { jwtDecode } from 'jwt-decode';
import ChatBot from '../GenaiBox/ChatBot';

function OpenUnassignedGrid({id,hidenavbar,companyData, setSelectedTab, setActiveField, companyName, description, handleOpenGrid }) {
    const [users, setAllUsers] = useState([]);
    const [roles, setRoles] = useState({});
    const [rolesAndComp, setRolesAndComp] = useState([]);
    const [apply, setApply] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selects, setSelects] = useState({});
    const [loading,setloading]=useState(true)

    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role

    const handleBubbling = (e) => {
        e.stopPropagation();
    };


    const handleCheckboxChange = (userId) => {
        setSelects((prevSelects) => ({
            ...prevSelects,
            [userId]: !prevSelects[userId],
        }));
    };

    useEffect(() => {
        const setUsers = async () => {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/fetchallusers`,{organization:Logorganization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
            const usersData = response.data.data;
            if(Logrole=='super admin'||Logrole=='admin')
            {
                const newFilteredData= usersData.filter(val=>val.role!='super admin' &&val.role!='admin')
                
                setAllUsers(newFilteredData)
            }
            else if(Logrole=='team lead'){
                const newFilteredData= usersData.filter(val=>val.role!='super admin' && val.role !='admin' && val.role!='team lead')
                
                setAllUsers(newFilteredData)
            }
            else{
                const filteredData=usersData.filter(val=>val.email==Logemail)
                setAllUsers(filteredData)
            }
            
            // Initialize roles state with current user roles
            const initialRoles = usersData.reduce((acc, user) => {
                acc[user._id] = user.role;
                return acc;
            }, {});
            setRoles(initialRoles);

            // Initialize selects state with false
            const initialSelects = usersData.reduce((acc, user) => {
                acc[user._id] = false;
                return acc;
            }, {});
            setSelects(initialSelects);
            setTimeout(()=>{
                setloading(false)
            },100)
        };
        setUsers();
    }, []);

    useEffect(() => {
        const settingRoles = async () => {
          
            const selectedUsers = users.filter(user => selects[user._id]);
            await Promise.all(selectedUsers.map(async (user) => {
                
                    const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/addTeam`, {
                        id:id,
                        organization: companyName,
                        member:  user.email,
                        position:roles[user._id],
                        assignedBy:Logemail,
                        mainorganization:Logorganization
                    },{
                        headers:{
                          "Authorization":`Bearer ${token}`
                        }
                      });
                    await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updateCompanystatus`, {
                        id:id,
                        company: companyName,
                        status: 'In Progress',
                        organization:Logorganization
                    },{
                        headers:{
                          "Authorization":`Bearer ${token}`
                        }
                      });
                    if(Logrole=='team lead')
                    {
                        await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updateCompanyTeamLeadstatus`, {
                            id:id,
                            company: companyName,
                            TeamLead_status: 'In Progress',
                            organization:Logorganization
                        },{
                            headers:{
                              "Authorization":`Bearer ${token}`
                            }
                          });
                    }
                    if(response.data.status==200)
                    { 
                        handleOpenGrid()
                    }
                
                if (roles[user._id] =='team lead'){

                    const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/addTeam`, {
                        id:id,
                        organization: companyName,
                        member:  user.email,
                        position:roles[user._id],
                        assignedBy:Logemail,
                        mainorganization:Logorganization
                    },{
                        headers:{
                          "Authorization":`Bearer ${token}`
                        }
                      });
                    
                    if(response.data.status==200)
                    { 
                        alert("Done")
                        handleOpenGrid()
                    }
                }
            }
        ));
            
        };
        settingRoles();
    }, [apply]);

    const handleApplyChanges = async () => {
        setApply(!apply);
    };
    const handleAssignChanges=async()=>{
       
        if(Logrole=='super admin' || Logrole=='admin')
        {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/addTeam`, {
                id:id,
                organization: companyName,
                member:  Logemail,
                position:Logrole,
                assignedBy:Logemail,
                mainorganization:Logorganization
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
            const response2=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updateCompanystatus`, {
                id:id,
                company: companyName,
                status: 'In Progress',
                organization:Logorganization
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
            if(response.data.status==200 && response2.data.status==200)
            {
                alert("Company Assinged to you")
                handleOpenGrid()
            }
        }
        else if(Logrole=='team lead')
        {
            console.log(id,companyName,Logorganization)
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updateCompanyTeamLeadstatus`, {
                id:id,
                company: companyName,
                TeamLead_status: 'In Progress',
                organization:Logorganization
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });

            if(response.data.status==200)
            {
                alert("Company Assinged to you")
                handleOpenGrid()
            }
        }
        
    }

    useEffect(()=>{
        const mergedData={
            CompanyInfo:{
              companydata:companyData
            }}
          sessionStorage.setItem("Bot_Data",JSON.stringify(mergedData))
    },[])

    


    return (
        <div className={` ${hidenavbar?'ml-[4%] w-[96%]':'ml-[22%] w-[78%]'} h-screen z-50 space-y-7 bg-white absolute top-0 right-0 overflow-hidden p-[23px] pt-[17px] md:flex md:flex-col cursor-default`} onClick={handleBubbling}>
            
            <div className='flex flex-row h-[40px] w-[100%] mt-[20px]'>
                <div className='flex flex-row items-center justify-center'>
                    <p className='text-gray-500 text-[16px] cursor-pointer hover:text-gray-600 hover:underline hover:underline-offset-2 font-inter font-semibold' onClick={handleOpenGrid}>Deal Pipeline</p>
                    <CgFormatSlash className='text-gray-300' size={30} />
                    <p className='text-gray-600 text-[16px] font-inter font-semibold'>{companyName}</p>
                </div>
            </div>
            <div className='w-[100%] flex flex-col items-center'>
                <div className='w-[100%] md:h-[45px] flex flex-col'>
                    <div><p className='md:text-[30px] text-[20px] font-inter font-semibold'>{companyName}</p></div>
                </div>
            </div>
            <div className='w-[100%] h-[100%] flex space-x-2 md:flex-row '>
                <div className='w-[100%] font-noto border-[1px] border-gray-300 p-6 rounded-md shadow-md shadow-gray-300 flex flex-col h-[95%] overflow-y-auto space-y-7'>
                    <div className='flex flex-row space-x-2 w-[100%] h-[34px] items-center'>
                        <div className='flex flex-row w-[10%] pl-4'>
                            <input type='checkbox' checked={true} />
                        </div>
                        <div className='flex flex-row w-[50%] pl-6'>
                            <p className='text-[16px] font-inter font-semibold'>Email</p>
                        </div>
                        <div className='flex flex-row w-[50%] pl-6'>
                            <p className='text-[16px] font-inter font-semibold'>Role</p>
                        </div>
                    </div>
                    {
                        loading?
                        <div className='w-[100%] h-[100%] overflow-y-auto space-y-7'>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Bars color="#8884d8" height={80} width={80} />
                            </div>
                        </div>
                        :
                    

                    <div className='text-gray-500 flex flex-col overflow-y-auto space-y-2 h-[93%]'>
                        {users.map(user => (
                            <div key={user._id} className='flex border-gray-100 hover:border-gray-300 border-[1px] space-x-7 shadow-sm shadow-gray-200 hover:shadow-gray-300 hover:shadow-md p-2 rounded-md flex-row w-[100%] h-[50px] justify-center pt-3'>
                                <div className='flex flex-row w-[10%] pl-2 font-inter font-semibold'>
                                    <input
                                        type='checkbox'
                                        checked={selects[user._id] || false}
                                        onChange={() => handleCheckboxChange(user._id)}
                                    />
                                </div>
                                <p className='text-[14px] w-[50%] font-inter font-semibold'>{user.email}</p>
                                <div className='w-[50%] text-[14px] font-inter font-semibold'>
                                    {roles[user._id]}
                                </div>
                            </div>
                        ))}
                    </div>
                        }
                    <div className='w-[100%] space-x-2 h-[8%] justify-start flex flex-row'>
                            <div className=' w-[14%] h-[100%] flex justify-end'>
                                <button className='w-[100%] rounded-md h-[40px] bg-blue-600 font-inter font font-semibold text-white text-[14px]' onClick={handleAssignChanges}>Assign to me</button>
                            </div>
                            <div className='w-[14%] h-[100%] flex justify-end'>
                                <button className='w-[100%] rounded-md h-[40px] bg-blue-600 font-inter font font-semibold text-white text-[14px]' onClick={handleApplyChanges}>Apply Changes</button>
                            </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default OpenUnassignedGrid;
