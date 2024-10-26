import React from 'react'
import MeterComponent from './MeterComponent'
import { HiOutlineDotsVertical } from 'react-icons/hi'

const PortfolioMeter = ({selectedTab,realtimeportfoliostate}) => {
  return (
    <div className='flex items-center justify-center w-[100%]'>
    
        <MeterComponent selectedTab={selectedTab} realtimeportfoliostate={realtimeportfoliostate}/> 
    </div>
  )
}

export default PortfolioMeter