import React, { useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlinePlus } from 'react-icons/ai';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import axios from 'axios';

function AddNewDetails({hidenavbar, openAddNewWindow ,CompanyName, handleTotalCards,openedTab}) {
  const [sections, setSections] = useState([{ id: Date.now(), title: '', description: '' }]);
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

  const handleAddSection = () => {
    setSections([{ id: Date.now(), title: '', description: '' }, ...sections]);
  };

  const handleChange = (id, field, value) => {
    setSections(
      sections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const handleSave = async() => {
    const data_ = sections
      .filter(section => section.title.trim() !== '')
      .map(section => ({
        _id: section.id,
        CompanyName:CompanyName,
        Title: section.title,
        Description: section.description,
        Tab:`Tab${openedTab}`,
        organization:localStorage.getItem('organization')
      }));
    console.log(JSON.stringify(data_, null, 2));
    const output=JSON.stringify(data_, null, 2)
    await axios.post('http://ec2-13-233-247-65.ap-south-1.compute.amazonaws.com:8999/addNewDetail',{
      data:output,
      organization:localStorage.getItem('organization')
    }).then(async()=>{
      const doc=await axios.post('http://ec2-13-233-247-65.ap-south-1.compute.amazonaws.com:8999/getNewDetails',{
        CompanyName:CompanyName,
        Tab:"Tab1",
        organization:localStorage.getItem('organization')
      })
      handleTotalCards(doc.data.data)
    })
    alert('Added Details')
    openAddNewWindow()

  };

  const handleClose = () => {
    gsap.to(MainDiv.current, {
      x: 0,
      duration: 1,
      opacity: 100,
      onComplete: () => {
        openAddNewWindow();
      },
    });
  };

  return (
    <div className={`${hidenavbar?'w-[100%]':' w-[80%]'} flex flex-col fixed top-0   bg-white h-screen z-[51] p-[34px]`}>
      <div ref={MainDiv} className="bg-white w-[100%] h-screen opacity-100 top-0 right-0 fixed"></div>
      <div
        className=" rounded-md mb-[60px] space-y-4 w-[100%] h-[100%] p-[23px] flex flex-col overflow-auto"
        style={{ boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.3)' }}
      >
        <div className="w-[100%] flex justify-end">
          <RxCross2 size={23} className="cursor-pointer" onClick={handleClose} />
        </div>

        {sections.map(section => (
          <div
            key={section.id}
            className="w-[100%] h-[340px] border-gray-200 shadow-md border-[1px] p-[20px] rounded-md"
          >
            <div className="flex flex-col space-y-2">
              <p className="text-[14px] select-none">Title</p>
              <input
                id={`title-${section.id}`}
                className="outline-none p-2 text-[14px] text-gray-600 w-[100%] h-[40px] rounded-md border-gray-500 border-[1px] hover:border-blue-600 focus:border-blue-600"
                value={section.title}
                onChange={e => handleChange(section.id, 'title', e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-[14px] select-none">Description</p>
              <textarea
                id={`description-${section.id}`}
                className="outline-none p-2 text-[14px] text-gray-600 w-[100%] h-[140px] overflow-x-auto resize-none rounded-md border-gray-500 border-[1px] hover:border-blue-600 focus:border-blue-600"
                value={section.description}
                onChange={e => handleChange(section.id, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}

        <div className="flex flex-row items-center h-[60px] justify-center space-x-3">
          <div
            className="w-[125px] h-[40px] flex-shrink-0 text-blue-600 rounded-md bg-white flex items-center justify-center shadow-md border-[1px] border-gray-200 cursor-pointer"
            onClick={handleAddSection}
          >
            <AiOutlinePlus />
            <p className="text-[12px] font-semibold">Add New Row</p>
          </div>
          <div
            className="w-[75px] h-[40px] flex-shrink-0 bg-blue-600 rounded-md text-white flex items-center justify-center cursor-pointer"
            style={{ boxShadow: '0px 2px 5px rgba(0,0,0,0.6)' }}
            onClick={handleSave}
          >
            <p className="text-[12px] font-semibold">Save</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewDetails;
