import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

const Privatekeypopup = ({ Type, uniqueid, apikeyvalue, hidenavbar, setpopup, realtimecheckAPikeys }) => {
  const [organizationUsers, setorganizationusers] = useState([]);
  const [checkedUsers, setcheckedUsers] = useState([]);
  const [searchUser, setsearchuser] = useState('');
  const token = localStorage.getItem('token');

  const userdata = jwtDecode(token);
  const Logemail = userdata.userdetails.email;
  const Logorganization = userdata.userdetails.organization;

  const handlecancel = () => {
    setpopup(false);
  };

  const handlesharenow = async () => {
    const filteredData = checkedUsers.filter(val => val.value === true);
    const organization = Logorganization;
    const Members = filteredData;

    const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/save-apikeys`, {
      organization: organization,
      Members: Members,
    }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.data.status === 200) {
      setpopup(false);
    }
  };

  const setUsers = async () => {
    const organization = Logorganization;
    const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/fetchallusers`, {
      organization: organization
    }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    setorganizationusers(response.data.data);
    const initialCheckedUsers = response.data.data.map(val => ({
      id: val.email,
      uniqueid: uniqueid,
      Creator: Logemail,
      member: val.email,
      security: 'private',
      Api_value: apikeyvalue,
      Type: Type,
      active: 'no',
      value: false
    }));
    setcheckedUsers(initialCheckedUsers);
  };

  useEffect(() => {
    setUsers();
  }, []);

  useEffect(() => {
    setUsers();
  }, [realtimecheckAPikeys]);

  const handleCheckboxchange = (id) => {
    setcheckedUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, value: !user.value } : user
      )
    );
  };

  // Filter organization users based on search input
  const filteredUsers = organizationUsers.filter(user =>
    user.email.toLowerCase().includes(searchUser.toLowerCase()) && user.email !== Logemail
  );

  return (
    <div className={`${hidenavbar ? 'ml-[2%] w-[90%]' : 'ml-[20%] w-[80%]'} font-inter h-screen pt-[5%] flex flex-col p-4 items-center justify-center space-y-4 font-sans`}>
      <div className='space-y-2 flex flex-col w-[430px] h-[500px] rounded-md bg-white p-4 border-[1px] border-gray-100'>
        <div className='w-[100%] h-[40px] flex items-center justify-end'>
          <div className='w-[16px] h-[16px] cursor-pointer' onClick={handlecancel}>
            <RxCross2 size={16} className='text-black' />
          </div>
        </div>
        <div className='flex items-center text-[18px] font-inter font-semibold text-gray-900 relative -mt-2'>
          <p>Share Your API Keys</p>
        </div>
        <div className='w-[100%] h-[80%] overflow-y-auto scrollbar-hide space-y-1 font-inter font-semibold mb-2'>
          <input 
            value={searchUser} 
            onChange={(e) => setsearchuser(e.target.value)} 
            className='h-[10%] text-[14px] w-full border rounded-lg px-3 py-2 bg-gray-50 text-sm focus:outline-none' 
            placeholder='Search Users'
          />
          {filteredUsers.map(val => (
            
            <div key={val._id} className='w-[100%] p-2 h-[40px] flex flex-row space-x-2'>
              <div className='flex w-[50%] items-center justify-start'>
                <p className='text-[14px]'>{val.email}</p>
              </div>
              <div className='w-[50%] flex items-center justify-end font-inter'>
                <input type='checkbox' onChange={() => handleCheckboxchange(val.email)} checked={checkedUsers.find(user => user.id === val.email)?.value} />
              </div>
            </div>
          ))}
        </div>
        <div className='w-[100%] h-[40px] flex space-x-2 justify-center'>
          <div onClick={handlesharenow} className='w-[130px] cursor-pointer select-none h-[35px] bg-gradient-to-r from-blue-500 text-white flex items-center justify-center rounded-md to-sky-500'>
            <p className='text-[13px] font-inter font-bold'>Share now</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privatekeypopup;
