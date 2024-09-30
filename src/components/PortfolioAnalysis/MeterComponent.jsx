import React from 'react';

const MeterComponent = ({ value }) => {
  const max = 100;  
  const min = 0;    
  const percentage = Math.max(min, Math.min(value, max)); 

  return (
    <div className='font-inter tracking-wider text-[14px] flex flex-col items-center p-5'>
      <svg width="300" height="180" viewBox="0 0 300 150" className="meter-svg">
      
      
        <path
          d="M 20 150 A 130 130 0 0 1 280 150"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="15"
        />
      
      
        <path
          d="M 20 150 A 130 130 0 0 1 280 150"
          fill="none"
          stroke={`url(#gradient-${percentage})`}  
          strokeWidth="15"
          strokeDasharray="820"
          strokeDashoffset={820 - (percentage / 100) * 820}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
<<<<<<< Updated upstream
        {/* Text in the center showing the value */}
        <text x="100" y="80" textAnchor="middle" fontSize="20" fill="#000">
          {`${percentage}%`}
        </text>
      </svg>
      <p>Meter Value: {percentage}%</p>
=======
      
      
        <defs>
          <linearGradient id={`gradient-${percentage}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="50%" stopColor="#ffc107" />
            <stop offset="100%" stopColor="#4caf50" />
          </linearGradient>
        </defs>
        
      
        <text x="150" y="120" textAnchor="middle" fontSize="32" fill="#333" fontWeight="bold">
          {`${percentage}%`}
        </text>
      </svg>

      {/* Additional details below the arc */}
      <div className="text-center mt-2">
        <p className='font-inter font-semibold text-xl'>Current Value: {percentage}%</p>
        <p className='text-sm text-gray-500'>Range: {min}% - {max}%</p>
      </div>

      {/* Styling to enhance the container */}
      <style jsx>{`
        .meter-svg {
          max-width: 400px;  // Increase max width to accommodate larger meter
        }
        svg {
          filter: drop-shadow(0 3px 6px rgba(0,0,0,0.16));
        }
      `}</style>
>>>>>>> Stashed changes
    </div>
  );
};

export default MeterComponent;
