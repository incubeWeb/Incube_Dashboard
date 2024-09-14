import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { TbBrandDiscord } from 'react-icons/tb'
import { PiNewspaperClippingBold } from 'react-icons/pi'
import { RxCross2 } from 'react-icons/rx'
import { Bars } from 'react-loader-spinner'
import { IoMdClose } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";


const NewsWidgit = ({id,boxes,setBoxes}) => {
    const [fetchedNews,setfetchedNews]=useState([])
    const [loading,setloading]=useState(true)
    useEffect(()=>{
        const setNews=async()=>{
            const response= await axios.post('http://localhost:8999/googlenewssearch',{
                search:"latest startup news"
            })
            if(response.data.status==200)
            {
                setfetchedNews(response.data.data.Results)
            }
            console.log(response.data.data.Results)
            setTimeout(()=>{
                setloading(false)
            },1000)
        }
        setNews()
    },[])
    
    const deleteWidgit=async()=>{
        const email=localStorage.getItem('email')
        const organization=localStorage.getItem('organization')
        const position=JSON.stringify(boxes.filter((box,index)=>index!=id))
        console.log(boxes)
        console.log("id",id)
        if(boxes.length===0)
        {
          await axios.post('http://localhost:8999/deletedashboard',{email:email,organization:organization})
          setBoxes([])
        }
        else{const response=await axios.post('http://localhost:8999/updatedashboard',{email:email,position:position,organization:organization})
        if(response.data.status==200)
        {
          setBoxes(boxes.filter((box,index)=>index!=id))
        }
      }
      }

  return (
    <div className='w-[100%] h-[100%] flex flex-col font-sans'>
        <div className='w-[100%] h-[40px] flex flex-row'>
            <p className='text-[19px] tracking-wider font-sans font-bold'>News</p>
        </div>
        {
            loading?<div className='w-[100%]' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Bars color="#8884d8" height={80} width={80} />
            
          </div>
          :
          
        <div className='flex flex-col space-y-2 h-[85%] overflow-y-auto '>
            {
                (fetchedNews||[]).map(val=>
                    <a target='_blank' href={val.Link} key={val._id} className='cursor-pointer flex flex-col space-y-2  border-t border-gray-400 p-2'>
                        <div className='flex flex-row space-x-2'>
                            <div className='w-[60%] space-x-2 flex flex-row items-center '>
                                <div>
                                    <IoNewspaperOutline  size={20} className='text-gray-600'/>
                                </div>
                                <div>
                                    <p className='text-[15px] tracking-wide font-semibold'>{val.Publisher}</p>
                                </div>
                            </div>
                            <div className='w-[50%] flex justify-end'>
                                <p className='text-[13px]'>{val.PublishedAt}</p>
                            </div>
                        </div>
                        <div>
                            <p className='text-[13px] tracking-wide text-gray-800'>
                                {val.Description}
                            </p>
                        </div>
                    </a>
                )
            }
        </div>
        }
        <div className='z-[10] cursor-pointer flex items-center justify-center w-[20px]  h-[20px]  rounded-full bg-gray-100 fixed right-[-10px] top-[-15px] mt-4 mr-3' onClick={deleteWidgit}>
        <IoMdClose size={15}  />
        </div> 
    </div>
    
  )
}

export default NewsWidgit