import React, { useEffect, useState } from 'react'
import { IoAppsOutline, IoAppsSharp } from 'react-icons/io5'
import Package from './Package'
import gmail from '../../Assets/Gmail.svg'
import whatsapp from '../../Assets/whatsapp.svg'
import facebook from '../../Assets/facebook.svg'
import custom from '../../Assets/custom.svg'
import CustomPackage from './CustomPackage'
import axios from 'axios'

const MainPage = ({hidenavbar}) => {
    const dummydata=[
        {id:"whatsapp",title:"Whatsapp Automation",image:whatsapp
            ,description:"This feature automates your WhatsApp Business account to respond with a message with the intent of continuing conversation, streamlining communication and ensuring prompt, consistent replies. "}
        ]
        //,{id:"2",title:"Gmail Automation",image:gmail
        //,description:"This feature automates your Gmail account to send predefined responses based on the input you provide, streamlining communication and ensuring timely, consistent replies."}
       // ,{id:"3",title:"Facebook Automation",image:facebook
        //    ,description:"This feature automates your Facebook account to send predefined responses based on the input you provide, streamlining communication and ensuring timely, consistent replies."}

    

  return (
    <div className= {`${hidenavbar?'pl-[5%] w-[100%]':'pl-[22%] w-[100%]'} font-inter pt-[2%] flex flex-col`}>
        <div className='flex flex-row items-center h-[40px] space-x-2'>
            <div>
                <IoAppsSharp className='text-gray-400' size={20} />
            </div>
            <div className='text-[15px] font-bold'>
                <p>Packages Catelog</p>
            </div>
        </div>
        <div className={`grid grid-cols-3 grid-rows-2 `}>
            {
                dummydata.map((value,index)=>
                    <Package key={index} id={value.id} title={value.title} image={value.image} description={value.description} hidenavbar={hidenavbar}/>
                )
            }
            <CustomPackage title="Custom Automation" image={custom} description="Fill all the details to create your own custom automation Tool" hidenavbar={hidenavbar}/>
                
        </div>
    </div>
  )
}

export default MainPage