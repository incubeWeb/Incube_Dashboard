import React, { useEffect, useRef, useState } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import PackageDetailBar from './PackageDetailBar';
const CustomPackage = ({hidenavbar,image,title,description}) => {
    const [active,setactive]=useState(false);
    const popupRef=useRef(null);
    useEffect(()=>{
        const handleClickOutside=()=>{
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setactive(false);
          }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
    },[])
  return (
    <Card ref={popupRef} className={`${hidenavbar?"mt-6 w-11/12":"mt-6 w-96"} h-[75%] border-[1px] border-gray-300`}>
    <CardBody>
      <div className='h-[50px] flex items-start justify-start'>
          <img src={image} className='object-contain h-full'/>
            <div className='w-[100%] h-[10px] flex items-end justify-end'>
                    {
                        active?
                        <div className='bg-green-500 w-[10px] h-[100%] rounded-[50%]'></div>
                        :
                        <></>
                    }
                </div>
      </div>
      <Typography variant="h5" color="blue-gray" className="mb-2 mt-2">
        {title}
      </Typography>
      <Typography className='text-[14px] font-inter'>
      {description}
      </Typography>
    </CardBody>
    <CardFooter className="pt-0">
      <a href="#" className="inline-block">
        <Button size="md" variant="text" className="flex h-[30px] p-1 items-center gap-2" onClick={()=>setactive(true)}>
          Learn More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Button>
      </a>
    </CardFooter>
    {
            active?
            <PackageDetailBar id='none' hidenavbar={hidenavbar} image={image} title={title}/>
            :
            <></>
          }
  </Card>
  )
}

export default CustomPackage