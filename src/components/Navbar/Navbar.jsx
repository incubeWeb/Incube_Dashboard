import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';  // User profile icon
import { IoMdArrowDropdown } from 'react-icons/io';  // Dropdown arrow

const Navbar= () => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='relative w-full flex justify-end p-4'>
      {/* User Profile Icon */}
      <div 
        className='cursor-pointer flex items-center space-x-2'
        onClick={toggleDropdown}
      >
        {/* User Icon */}
        <FaUserCircle size={30} className='text-gray-600' />
        {/* Dropdown Arrow */}
        <IoMdArrowDropdown size={24} className='text-gray-600' />
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className='absolute top-[50px] right-4 bg-white border border-gray-200 rounded-lg shadow-lg w-[200px]'>
          <ul className='py-2'>
            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Profile</li>
            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Settings</li>
            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
