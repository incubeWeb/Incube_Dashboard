import React from 'react'
import { GoDotFill } from 'react-icons/go'
import { RiFilter3Line } from 'react-icons/ri'

const Portfolio = () => {
  return (
    <div className='ml-[20%] font-noto w-[80%] h-screen flex p-4 flex-col'>
        <div className='w-[100%] h-[50%] bg-gray-500'>

        </div>

        <div className='mt-[20px] w-[100%] flex flex-col space-y-2 font-noto'>
            <div className='flex flex-row h-[70px] '>
                <div className='h-[50px] w-[100%] flex flex-row'>
                    <p className='flex w-[50%] text-[16px] font-roboto'>Investment history</p>
                    <div className='w-[50%] flex flex-row justify-end'>
                        <div className='w-[90px] text-[14px] rounded-md space-x-2 h-[30px] border-[1px] border-gray-300 items-center justify-center flex flex-row'>
                            <RiFilter3Line size={15}/>
                            <p>Filters</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-[30px] flex flex-row text-[14px] text-gray-600 border-b-[1px] border-gray-300'>
                <div className='w-[25%]'><p>Company</p></div>
                <div className='w-[15%]'><p>Amount</p></div>
                <div className='w-[20%]'><p>Investment Date</p></div>
                <div className='w-[20%]'><p>Startup category</p></div>
                <div className='w-[20%]'><p>Assigned team</p></div>
            </div>
            <div>
                <div className='h-[60px] flex flex-row border-b-[1px] border-gray-300 text-[14px] text-gray-600'>
                    <div className='w-[25%] flex items-center flex-row space-x-2'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBIoIr2Y33v0IdprP2CEPnEU07j1IPUUyjnw&s' className='w-[30px] h-[30px] object-cover rounded-[50%]'/>
                        <p className='text-gray-900'>Zomato</p>
                    </div>
                    <div className='w-[15%] flex items-center'><p>$2M</p></div>
                    <div className='w-[20%] flex items-center'>
                    <p>
                        Wed 1:00pm
                    </p>
                    </div>
                    <div className='w-[20%] flex items-center'>
                        <div className='w-[80px] h-[25px] rounded-md flex flex-row border-[1px] border-gray-300 items-center justify-center'>
                            <GoDotFill size={14} className='text-red-500'/>
                            <p>Food</p>
                        </div>
                    </div>
                    <div className='w-[20%] flex items-center'>
                        <p className='text-gray-900'>TeamLead1</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Portfolio