import React from 'react'
import MeterComponent from './MeterComponent'
import { HiOutlineDotsVertical } from 'react-icons/hi'

const PortfolioMeter = ({selectedTab}) => {
  return (
    <div className='flex items-center justify-center w-[100%]'>
    
        <MeterComponent selectedTab={selectedTab} /> 
    </div>
  )
}

export default PortfolioMeter