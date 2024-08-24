import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Viewsheet from '../ViewSheet/Viewsheet'
import { Bars } from 'react-loader-spinner'

const Alldocs = ({setActiveField,activeField}) => {

    const [allDocs,setAllDocs]=useState([])
    const [search,setSearch]=useState('')
    const [clickedView,setclickedview]=useState(false)
    const [id,setid]=useState('')
    const [viewdDoc,setviewedDoc]=useState('')
    /*const jsonData = [
        { name: 'alick', age: 49, city: 'new york' },
        { name: 'bob', age: 35, city: 'los angeles' },
        { name: 'carol', age: 28, city: 'chicago' }
      ];*/
    const [loading,setloading]=useState(true)
    const [jsonData,setjsonData]=useState([])

    const handleDelete=async (id)=>{
        console.log(id)
        const response=await axios.post('http://localhost:8999/deleteUploadedfile',{id:id,doneBy:localStorage.getItem('email')})
        if(response.data.status==200)
        {
            const response=await axios.post('http://localhost:8999/alluploadedFiles')
            setAllDocs(response.data.data)
        }
    }
    const handleView=async (id,name)=>{
        console.log(id)
        setid(id)
        const response=await axios.post('http://localhost:8999/sheetfromdb',{id:id})
        const data=JSON.parse(response.data.data)
        setjsonData(data)
        setclickedview(!clickedView)
        setviewedDoc(name)
    }
    
    const handleSearch=async(e)=>{
        setSearch(e.target.value)
        
    }
    useEffect(()=>{
        const handle=async()=>{
            if(search=='')
                {
                    const response=await axios.post('http://localhost:8999/alluploadedFiles')
                    setAllDocs(response.data.data)
                }
                else{
                    const response=await axios.post('http://localhost:8999/searchFile',{
                        search:search
                    })
                    setAllDocs(response.data.data)
                }
                setTimeout(()=>{  
                    setloading(false)
                  },1000)
        }
        handle()
    },[search])
        

    useEffect(()=>{
        const checkIfSelected=async()=>{
            if(activeField=='documents')
            {
                const response=await axios.post('http://localhost:8999/alluploadedFiles')
                setAllDocs(response.data.data)
            }
        }
        checkIfSelected()
        
    },[activeField])

    const formatTime=(time)=>{
        const date = new Date(parseInt(time, 10));
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  return (
    <div className='flex flex-col pt-[5%] items-center justify-start pr-[5%] pl-[23%] w-[100%] h-screen font-roboto'>
    <div className='w-[100%] h-[10%] flex flex-row space-x-3'>
        <Link to='/dashboard' onClick={()=>setActiveField('/dashboard')}><p className='text-gray-300 hover:text-gray-600'>Dashboard</p></Link>
        <p>/</p>
        <p>Document</p>
    </div>
    <div className='flex flex-row w-[100%] h-[10%]'>
        <div className='flex flex-row w-[50%]'>
            <p className='text-[23px]'>Customers</p>
        </div>
        <div className='flex flex-row w-[50%] h-[60%] space-x-3 justify-end'>
            <div className='flex flex-row w-[180px] h-[100%] items-center md:flex md:flex-row md:items-center md:w-[210px] md:h-[38px] rounded-md border-gray-400 border-2 border-solid space-x-3 hover:shadow-md hover:duration-150'>
                <FiSearch className='font-thin ml-3 text-gray-400' size={20} />
                <input onChange={handleSearch} type='text' placeholder='Search' className=' w-full text-[13px] h-full outline-none rounded-md border-l-0 md:text-[15px] text-gray-600' />
            </div>
        </div>
    </div>
    <div className='w-[100%] h-[80%] rounded-md border-gray-200 shadow-md shadow-gray-300 bg-gray-100 flex flex-col p-4'>
        <div className='flex flex-row w-[100%] h-[5%] font-noto'>
            <div className='w-[15%] h-[100%] flex items-center justify-start'>
                <p className='text-[14px] pl-2'>Uploaded by</p>
            </div>
            <div className='w-[15%] h-[100%] flex items-center justify-start'>
                <p className='text-[14px] pl-2'>File Type</p>
            </div>
            <div className='w-[15%] items-center justify-start flex h-[100%]'>
                <p className='text-[14px] pl-2'>File name</p>
            </div>
            <div className='w-[15%] flex pl-2 items-center justify-start h-[100%]'>
                <p className='text-[14px]'>time</p>
            </div>
            <div className='w-[15%] flex pl-2 items-center justify-start h-[100%]'>
                <p className='text-[14px]'>Deal Name</p>
            </div>
            <div className='w-[15%] flex pl-2 items-center justify-start h-[100%]'>
                <p className='text-[14px]'>Tab</p>
            </div>
        </div>
        <div className='w-[100%] bg-white h-[1px] mt-2 '> </div>
        {
            !loading?
            <div className='flex flex-row w-[100%] h-[10%] font-noto'>
                {
                    allDocs.map(doc=>
                    <div key={doc._id} className='flex flex-row w-[100%] h-[100%] font-noto'>
                        <div className='w-[15%] h-[100%] flex items-end justify-start'>
                            <p className='text-[14px] pl-2'>{doc.uploadedBy}</p>
                        </div>
                        <div className='w-[15%] h-[100%] flex items-end justify-start'>
                            <p className='text-[14px] pl-2'>{doc.fileType}</p>
                        </div>
                        <div className='w-[15%] items-end justify-start flex h-[100%]'>
                            <p className='text-[14px] pl-2'>{doc.name}</p>
                        </div>
                        <div className='w-[15%] flex pl-2 items-end justify-start h-[100%]'>
                            <p className='text-[14px]'>{formatTime(doc.time)}</p>
                        </div>
                        <div className='w-[15%] flex pl-2 items-end justify-start h-[100%]'>
                            <p className='text-[14px]'>{doc.CompanyName}</p>
                        </div>
                        <div className='w-[15%] flex pl-2 items-end justify-start h-[100%]'>
                            <p className='text-[14px]'>{doc.tab}</p>
                        </div>
                        <div className='w-[5%] flex flex-col pl-2 items-center pt-6 justify-start h-[100%]'>
                        <div className='basis-1/2 flex justify-end space-x-3'>
                        <p className='text-[14px] text-sky-600 cursor-pointer' onClick={()=>handleView(doc._id,doc.name)}>View</p>
                            <p className='text-[14px] text-red-600 cursor-pointer' onClick={()=>handleDelete(doc._id)}>Remove</p>
                        </div>
                        </div>       
                    </div>
                )}
            </div>
            :<div className='w-[100%]' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Bars color="#8884d8" height={80} width={80} />
            </div>
        }
    
    </div>
    {
        clickedView?
        <div className='fixed left-0 w-[100%] h-[100%] bg-white'>
            <Viewsheet viewdDoc={viewdDoc} jsonData={jsonData} id={id} clickedview={clickedView} setclickedview={setclickedview}/>
        </div>
        :
        <></>
    }
</div>
  )
}

export default Alldocs