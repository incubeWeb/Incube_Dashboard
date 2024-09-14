import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Viewsheet from '../ViewSheet/Viewsheet'
import { Bars } from 'react-loader-spinner'
import { FaFileExcel } from 'react-icons/fa'
import Createsheet from '../ViewSheet/Createsheet'

const Alldocs = ({filesadded,setActiveField,activeField,hidenavbar}) => {

    const [allDocs,setAllDocs]=useState([])
    const [search,setSearch]=useState('')
    const [clickedView,setclickedview]=useState(false)
    const [id,setid]=useState('')
    const [viewdDoc,setviewedDoc]=useState('')
    const [createSheet,setcreateSheet]=useState(false)
    /*const jsonData = [
        { name: 'alick', age: 49, city: 'new york' },
        { name: 'bob', age: 35, city: 'los angeles' },
        { name: 'carol', age: 28, city: 'chicago' }
      ];*/
    const [loading,setloading]=useState(true)
    const [jsonData,setjsonData]=useState([])

    useEffect(()=>{
        if(allDocs=='undefined')
        {
            window.location.reload()
        }
    },[])
    useEffect(()=>{
        if(allDocs=='undefined')
        {
            window.location.reload()
        }
    },[allDocs])
    const handleDelete=async (id)=>{
        console.log(id)
        const response=await axios.post('http://localhost:8999/deleteUploadedfile',{id:id,doneBy:localStorage.getItem('email'),organization:localStorage.getItem('organization')})
        if(response.data.status==200)
        {
            const response=await axios.post('http://localhost:8999/alluploadedFiles',{organization:localStorage.getItem('organization')})
            setAllDocs(response.data.data)
        }
    }
    const handleView=async (id,name)=>{
        console.log(id)
        setid(id)
        const response=await axios.post('http://localhost:8999/sheetfromdb',{id:id,organization:localStorage.getItem('organization')})
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
            if(search.length<=0)
                {
                    const response=await axios.post('http://localhost:8999/alluploadedFiles',{organization:localStorage.getItem('organization')})
                    setAllDocs(response.data.data)
                }
                else{
                    const response=await axios.post('http://localhost:8999/searchFile',{
                        search:search,
                        organization:localStorage.getItem('organization')
                    })
                    setAllDocs(response.data.data)
                }
                setTimeout(()=>{  
                    setloading(false)
                  },1000)
        }
        handle()
    },[search,filesadded])
        

    useEffect(()=>{
        const checkIfSelected=async()=>{
            if(activeField=='documents')
            {
                const response=await axios.post('http://localhost:8999/alluploadedFiles',{organization:localStorage.getItem('organization')})
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
    <div className={`${hidenavbar?'ml-[2%] w-[90%] h-screen':'ml-[20%] w-[80%] h-screen'} pt-[5%] flex flex-col p-4 items-center justify-start font-sans bg-gray-100`}>
    <div className='w-[100%] h-[10%] flex flex-row space-x-3'>
        <Link to='/dashboard' onClick={()=>setActiveField('/dashboard')}><p className='text-gray-500 hover:text-gray-600 font-sans'>Dashboard</p></Link>
        <p>/</p>
        <p className='font-sans'>Document</p>
    </div>
    <div className='flex flex-row w-[100%] h-[10%]'>
        <div className='flex flex-row w-[50%]'>
            <p className='text-[23px] font-sans'>Document</p>
        </div>
        <div className='flex flex-row w-[50%] h-[60%] space-x-3 justify-end'>
                <div className='ease-linear duration-150 cursor-pointer hover:w-[160px] h-[100%] flex flex-row items-center space-x-2 p-2 rounded-md bg-gradient-to-r from-green-500 to-green-700' onClick={()=>setcreateSheet(true)}>
                    <div className='text-white flex items-center'><FaFileExcel/></div>
                    <p className='text-[14px] text-white font-sans'>create sheet</p>
                </div>
            <div className='flex flex-row w-[180px] h-[100%] items-center md:flex md:flex-row md:items-center md:w-[210px] md:h-[38px] rounded-md border-gray-400 border-2 border-solid space-x-3 hover:shadow-md hover:duration-150'>
                
                <input onChange={handleSearch} type='text' placeholder='Search' className='pl-2 w-full text-[13px] h-full outline-none rounded-md border-l-0 md:text-[15px] text-gray-600' />
                
            </div>
            
        </div>
    </div>
    <div className='w-[100%] h-[80%] rounded-md border-gray-200  bg-white flex flex-col p-4'>
       
        <div className='flex flex-row w-[100%] h-[10%]  font-sans font-bold'>
            <div className='w-[15%] h-[100%] flex items-center justify-start'>
                <p className='text-[14px] pl-2 font-roboto'>Uploaded by</p>
            </div>
            <div className='w-[15%] h-[100%] flex items-center justify-start'>
                <p className='text-[14px] pl-2 font-roboto'>File Type</p>
            </div>
            <div className='w-[20%] items-center justify-start flex h-[100%]'>
                <p className='text-[14px] pl-2 font-roboto'>File name</p>
            </div>
            <div className='w-[15%] flex pl-2 items-center justify-start h-[100%]'>
                <p className='text-[14px] font-roboto'>Time</p>
            </div>
            <div className='w-[15%] flex pl-2 items-center justify-start h-[100%]'>
                <p className='text-[14px] font-roboto'>Deal Name</p>
            </div>
            <div className='w-[15%] flex pl-2 items-center justify-start h-[100%]'>
                <p className='text-[14px] font-roboto '>Tab</p>
            </div>
        </div>
       
        <div className='w-[100%] bg-white h-[1px]  '> </div>
        {
            !loading?
            <div className='flex flex-col w-[100%] h-[10%] font-roboto    mt-3'>
                {
                    (allDocs||[]).map(doc=>
                    <div key={doc._id} className='flex flex-row w-[100%] h-[100%] font-roboto   border-t border-gray-300 mb-6' >
                        <div className='w-[15%] h-[100%] flex items-end justify-start '>
                            <p className='text-[14px] pl-2 '>{doc.uploadedBy}</p>
                        </div>
                        <div className='w-[15%] h-[100%] flex items-end justify-start'>
                            <p className='text-[14px] pl-2'>{doc.fileType}</p>
                        </div>
                        <div className='w-[20%] items-end justify-start flex h-[100%]'>
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
                        <div className='w-[5%] flex flex-col pr-3 items-center pt-6 justify-start h-[100%]'>
                        <div className='basis-1/2 flex justify-end space-x-3'>
                        <p className='text-[14px] text-sky-600 cursor-pointer ' onClick={()=>handleView(doc._id,doc.name)}>View</p>
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
            <Viewsheet hidenavbar={hidenavbar} viewdDoc={viewdDoc} jsonData={jsonData} id={id} clickedview={clickedView} setclickedview={setclickedview}/>
        </div>
        :
        <></>
    }
    {
        createSheet?
        <div className='fixed left-0 w-[100%] h-[100%] bg-white'>
            <Createsheet createSheet={createSheet} setcreateSheet={setcreateSheet} hidenavbar={hidenavbar}/>
        </div>
        :
        <></>
    }
</div>
  )
}

export default Alldocs