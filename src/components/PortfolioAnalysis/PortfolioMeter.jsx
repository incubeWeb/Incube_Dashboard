import React from 'react'
import MeterComponent from './MeterComponent'

const PortfolioMeter = () => {
  return (
    <div className='flex items-center justify-center w-[100%]'>
        <MeterComponent value={10} /> 
    </div>
  )
}

export default PortfolioMeter