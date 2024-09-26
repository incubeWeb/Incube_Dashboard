import React, { useEffect, useRef, useState } from 'react';
import { CgFormatSlash } from "react-icons/cg";
import { gsap } from 'gsap/gsap-core';
import { useGSAP } from '@gsap/react';
import { RiExchangeFundsFill } from "react-icons/ri";
import axios from 'axios';

function OpenUnassignedGrid({hidenavbar, setSelectedTab, setActiveField, companyName, description, handleOpenGrid }) {
    const [users, setAllUsers] = useState([]);
    const [roles, setRoles] = useState({});
    const [rolesAndComp, setRolesAndComp] = useState([]);
    const [apply, setApply] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selects, setSelects] = useState({});

    const handleBubbling = (e) => {
        e.stopPropagation();
    };

    const handleRoleChange = (userId, newRole) => {
        setRoles((prevRoles) => ({
            ...prevRoles,
            [userId]: newRole,
        }));
    };

    const handleCheckboxChange = (userId) => {
        setSelects((prevSelects) => ({
            ...prevSelects,
            [userId]: !prevSelects[userId],
        }));
    };

    useEffect(() => {
        const setUsers = async () => {
            const response = await axios.post('http://localhost:8999/fetchallusers',{organization:localStorage.getItem('organization')});
            const usersData = response.data.data;
            if(localStorage.getItem('role')=='super admin'||localStorage.getItem('role')=='admin')
            {
                const filteredData= usersData.filter(val=>val.role!='super admin' &&val.role!='admin')
                
                const newFilteredData=[...filteredData]
                setAllUsers(newFilteredData)
            }
            else if(localStorage.getItem('role')=='team lead'){
                const filteredData= usersData.filter(val=>val.role!='super admin' && val.role !='admin' && val.role!='team lead')
                const filter_=usersData.filter(val=>val.email==localStorage.getItem('email'))
                const newFilteredData=[...filter_,...filteredData]
                setAllUsers(newFilteredData)
            }
            else{
                const filteredData=usersData.filter(val=>val.email==localStorage.getItem('email'))
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
        };
        setUsers();
    }, []);

    useEffect(() => {
        const settingRoles = async () => {
            const selectedUsers = users.filter(user => selects[user._id]);
            await Promise.all(selectedUsers.map(async (user) => {
                await axios.post('http://localhost:8999/updateuser', {
                    email: user.email,
                    password: user.password,
                    role: roles[user._id],
                    organization:localStorage.getItem('organization')
                });
                
                    const response = await axios.post('http://localhost:8999/addTeam', {
                        organization: companyName,
                        member:  user.email,
                        position:roles[user._id],
                        assignedBy:localStorage.getItem('email'),
                        mainorganization:localStorage.getItem('organization')
                    });
                    await axios.post('http://localhost:8999/updateCompanystatus', {
                        company: companyName,
                        status: 'In Progress',
                        organization:localStorage.getItem('organization')
                    });
                    if(localStorage.getItem('role')=='team lead')
                    {
                        await axios.post('http://localhost:8999/updateCompanyTeamLeadstatus', {
                            company: companyName,
                            TeamLead_status: 'In Progress',
                            organization:localStorage.getItem('organization')
                        });
                    }
                    if(response.data.status==200)
                    { 
                        handleOpenGrid()
                    }
                
                if (roles[user._id] =='team lead'){

                    const response = await axios.post('http://localhost:8999/addTeam', {
                        organization: companyName,
                        member:  user.email,
                        position:roles[user._id],
                        assignedBy:localStorage.getItem('email'),
                        mainorganization:localStorage.getItem('organization')
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

    const MainDiv = useRef(null);
    useGSAP(() => {
        gsap.to(MainDiv.current, {
            x: -1900,
            duration: 1,
            delay: 0.2,
            overflow: 'hidden',
            opacity: 0,
        });
    });


    return (
        <div className={`${hidenavbar?' w-[100%] pl-[54px]':'ml-[20%] w-[80%]'} pt-[50px] h-screen z-50 space-y-7 bg-white absolute top-0 right-0 overflow-hidden p-[23px] flex flex-col cursor-default`} onClick={handleBubbling}>
            <div ref={MainDiv} className='bg-white w-[100%] h-screen fixed'></div>
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
                    <div className='w-[100%] h-[8%] flex justify-end'>
                        <button className='w-[14%] rounded-md h-[40px] bg-blue-600 font-inter font font-semibold text-white text-[14px]' onClick={handleApplyChanges}>Apply Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OpenUnassignedGrid;
