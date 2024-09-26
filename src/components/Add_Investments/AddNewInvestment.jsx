import React, { useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlinePlus } from 'react-icons/ai';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import axios from 'axios';

function AddNewInvestment({hidenavbar, openAddNewWindow ,CompanyName, handleTotalCards}) {
  const [sections, setSections] = useState([{ id: Date.now(), title: '', description: '' }]);
  const MainDiv = useRef(null);
  const [suggested,setsuggested]=useState([])
  useGSAP(() => {
    gsap.to(MainDiv.current, {
      x: -1900,
      duration: 1,
      delay: 0.2,
      overflow: 'hidden',
      opacity: 0,
    });
  });

  useEffect(()=>{
    const settingSuggested=async()=>{
      let organization=localStorage.getItem('organization')
        const response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/suggestedInvestment',{
            company:CompanyName,
            organization:organization
        })
        setsuggested(response.data.data)
    }
    settingSuggested()
  },[])

  const handleAddSection = () => {
    setSections([{ id: Date.now(), title: '', description: '' }, ...sections]);
  };

  const handleChange = (id, field, value) => {
    setSections(
      (sections||[]).map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const setSuggestionInField=(fieldval,fieldid)=>{

    handleChange(fieldid,'title',fieldval)
 
  }

  const handleSave = async() => {
    let organization=localStorage.getItem('organization')
    const data_ = sections
      .filter(section => section.title.trim() !== '')
      .map(section => ({
        _id: section.id,
        company:CompanyName,
        field: section.title,
        value: section.description,
        organization:organization
      }));
    
     
    const output=JSON.stringify(data_, null, 2)
    await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/addNewInvestment',{
      data:output,
      organization:organization
    }).then(async()=>{
      const doc=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getnewInvestment',{
        company:CompanyName, 
        organization:organization 
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
  const checkusedsuggestion=(val)=>{
 
    let isPresent=false
   sections
      .filter(section => section.title.trim() !== '')
      .map(section => {
       if(section.title==val)
       {
        isPresent=true
       }
      })
 
    return isPresent
  }

  return (
    <div className={`${hidenavbar?' w-[100%] pr-[90px]':'w-[80%] pr-[125px]'}  flex flex-col fixed top-0 bg-white h-screen z-[51] p-[34px]`}>
      <div ref={MainDiv} className="bg-white w-[100%] h-screen opacity-100 top-0 right-0 fixed"></div>
      <div
        className=" rounded-md mb-[60px] space-y-4 w-[100%] h-[100%] p-[23px] flex flex-col overflow-auto"
        style={{ boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.3)' }}
      >
        <div className="w-[100%] flex justify-end">
          <RxCross2 size={23} className="cursor-pointer" onClick={handleClose} />
        </div>

        {(sections||[]).map(section => (
          <div
            key={section.id}
            className="w-[100%] h-[220px] border-gray-200 shadow-md border-[1px] p-[20px] rounded-md"
          >
            <div className="flex flex-col space-y-2">
              <div className='flex flex-row space-x-2'>
                <p className="text-[14px] select-none">Field</p>
                <div className='flex flex-row space-x-2 w-[100%] overflow-y-auto'>
                    {
                        [...new Map((suggested||[]).map(suggestion => [suggestion.field, suggestion])).values()].map((suggestion)=>
                            <div key={suggestion._id} className={`${checkusedsuggestion(suggestion.field)?'bg-red-400':'bg-gray-300'} cursor-pointer pl-4 pr-4 rounded-md bg-opacity-40 font-roboto h-[20px]`} onClick={()=>setSuggestionInField(suggestion.field,section.id)}>
                                <p className='text-[12px]'>{suggestion.field}</p>
                            </div>
                        )
                    }
                </div>
              </div>
              <input
                id={`title-${section.id}`}
                className="outline-none p-2 text-[14px] text-gray-600 w-[100%] h-[40px] rounded-md border-gray-500 border-[1px] hover:border-blue-600 focus:border-blue-600"
                value={section.title}
                onChange={e => handleChange(section.id, 'title', e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-[14px] select-none">Value</p>
              <textarea
                id={`description-${section.id}`}
                className="outline-none p-2 text-[14px] text-gray-600 w-[100%] h-[40px] overflow-x-auto resize-none rounded-md border-gray-500 border-[1px] hover:border-blue-600 focus:border-blue-600"
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

export default AddNewInvestment;
