import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Viewsheet from '../ViewSheet/Viewsheet'
import { Bars } from 'react-loader-spinner'
import { FaFileExcel, FaGoogleDrive } from 'react-icons/fa'
import Createsheet from '../ViewSheet/Createsheet'
import PrivatePopup from './PrivatePopup'
import { IoRefresh } from 'react-icons/io5'

const Alldocs = ({filesadded,setActiveField,activeField,hidenavbar,realtimedocumentvisibility}) => {

    const [allDocs,setAllDocs]=useState([])
    const [search,setSearch]=useState('')
    const [clickedView,setclickedview]=useState(false)
    const [id,setid]=useState('')
    const [viewdDoc,setviewedDoc]=useState('')
    const [createSheet,setcreateSheet]=useState(false)
    const [gmailname,setgmailname]=useState('')
    const [privatefiles,setprivatefiles]=useState([])

    const [fileprivate,setfileprivate]=useState(false)
    const [docId,setdocId]=useState('')
    /*const jsonData = [
        { name: 'alick', age: 49, city: 'new york' },
        { name: 'bob', age: 35, city: 'los angeles' },
        { name: 'carol', age: 28, city: 'chicago' }
      ];*/
    const [loading,setloading]=useState(true)
    const [jsonData,setjsonData]=useState([])

    const [googleDrivesheets,setgoogledriveSheets]=useState([])

    const GetDriveSheets=async()=>{
        const response=await axios.post('http://localhost:1222/get-googledrive-sheets',{
            email:localStorage.getItem('email'),
            organization:localStorage.getItem("organization")
        })
        if(response.data.status==200 && response.data.message!="no refresh token found")
        {
            const files=response.data.data
            console.log(response.data.gmail)
            setgmailname(response.data.gmail)
            console.log("my fle",files)
            setgoogledriveSheets(files)
        }
    }

    const handlepublicfun=async(id)=>{
        const response=await axios.post('http://localhost:8999/delete-private-file',{
            doc_id:id,
            organization:localStorage.getItem('organization')
        })
        if(response.data.status==200)
        {
            alert('converted to public')
            setprivatefiles(prev=>prev.filter(item=>item!=docId))
        }
        
    }

    useEffect(()=>{
        console.log(allDocs,"my dc")
    },[allDocs])

    useEffect(()=>{
        
        GetDriveSheets()
    },[])

    useEffect(()=>{
        const file=async()=>{
            const response=await axios.post('http://localhost:8999/get-document-visibility',{
                email:localStorage.getItem('email'),
                organization:localStorage.getItem('organization')
            })
            console.log("this is getted data",response.data.data)

        }
        file()

    },[])



    const handleGoogleSheetView=(id,name)=>{

    }
    const handleGoogleSheetDelete=(id)=>{

    }

    const handleDelete=async (id)=>{
        console.log(id)
        const response=await axios.post('http://localhost:8999/deleteUploadedfile',{id:id,doneBy:localStorage.getItem('email'),organization:localStorage.getItem('organization')})
        const response2=await axios.post('http://localhost:8999/delete-private-file',{doc_id:id,organization:localStorage.getItem('organization')})
        if(response.data.status==200 &&response2.data.status==200)
        {
            const response=await axios.post('http://localhost:8999/alluploadedFiles',{organization:localStorage.getItem('organization')})
            const response2=await axios.post('http://localhost:8999/get-document-visibility',{
                email:localStorage.getItem('email'),
                organization:localStorage.getItem('organization')
            })
            const set2DocsIds=response2.data.allfiles.map(doc=>doc.Document_id)
            const privatefiles=response2.data.allfiles.map(doc=>doc.Document_id)
                setprivatefiles(privatefiles)
            const filteredSet1=response.data.data.filter(doc=>!set2DocsIds.includes(doc._id))
            const tosetdata=[...response2.data.data,...filteredSet1]
            setAllDocs(tosetdata)
            console.log(privatefiles,"this")
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
                    const response2=await axios.post('http://localhost:8999/get-document-visibility',{
                        email:localStorage.getItem('email'),
                        organization:localStorage.getItem('organization')
                    })
                    const set2DocsIds=response2.data.allfiles.map(doc=>doc.Document_id)
                    const privatefiles=response2.data.allfiles.map(doc=>doc.Document_id)
                     setprivatefiles(privatefiles)
                    const filteredSet1=response.data.data.filter(doc=>!set2DocsIds.includes(doc._id))
                    const tosetdata=[...response2.data.data,...filteredSet1]
                    setAllDocs(tosetdata)
                }
                else{
                    const response=await axios.post('http://localhost:8999/searchFile',{
                        search:search,
                        organization:localStorage.getItem('organization')
                    })
                    const response2=await axios.post('http://localhost:8999/get-document-visibility',{
                        email:localStorage.getItem('email'),
                        organization:localStorage.getItem('organization')
                    })
                    const set2DocsIds=response2.data.allfiles.map(doc=>doc.Document_id)
                    const privatefiles=response2.data.allfiles.map(doc=>doc.Document_id)
                     setprivatefiles(privatefiles)
                    const filteredSet1=response.data.data.filter(doc=>!set2DocsIds.includes(doc._id))
                    const tosetdata=[...response2.data.data,...filteredSet1]
                    setAllDocs(tosetdata)
                }
                setTimeout(()=>{  
                    setloading(false)
                  },1000)
        }
        handle()
    },[search,filesadded])
        
    useEffect(()=>{
        const setDocsData=async()=>
        {
            const response=await axios.post('http://localhost:8999/alluploadedFiles',{organization:localStorage.getItem('organization')})
            const response2=await axios.post('http://localhost:8999/get-document-visibility',{
                email:localStorage.getItem('email'),
                organization:localStorage.getItem('organization')
            })
            const set2DocsIds=response2.data.allfiles.map(doc=>doc.Document_id)
            const privatefiles=response2.data.allfiles.map(doc=>doc.Document_id)
                setprivatefiles(privatefiles)
            const filteredSet1=response.data.data.filter(doc=>!set2DocsIds.includes(doc._id))
            const tosetdata=[...response2.data.data,...filteredSet1]
            setAllDocs(tosetdata)
        }
        setDocsData()

    },[realtimedocumentvisibility])

    useEffect(()=>{
        const checkIfSelected=async()=>{
            if(activeField=='documents')
            {
                const response=await axios.post('http://localhost:8999/alluploadedFiles',{organization:localStorage.getItem('organization')})
                const response2=await axios.post('http://localhost:8999/get-document-visibility',{
                    email:localStorage.getItem('email'),
                    organization:localStorage.getItem('organization')
                })
                const set2DocsIds=response2.data.allfiles.map(doc=>doc.Document_id)
                    const privatefiles=response2.data.allfiles.map(doc=>doc.Document_id)
                     setprivatefiles(privatefiles)
                    const filteredSet1=response.data.data.filter(doc=>!set2DocsIds.includes(doc._id))
                    const tosetdata=[...response2.data.data,...filteredSet1]
                    setAllDocs(tosetdata)
            }
        }
        checkIfSelected()
        
    },[activeField])

    const formatTime=(time)=>{
        const date = new Date(parseInt(time, 10));
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  return (
    <div className={`${hidenavbar?'ml-[2%] w-[90%] h-screen':'ml-[20%] w-[80%] '} pt-[5%] flex flex-col p-4 items-center justify-start space-y-4 font-sans bg-gray-100`}>
    <div className='w-[100%] h-[10%] flex flex-row space-x-3'>
        <Link to='/dashboard' onClick={()=>setActiveField('/dashboard')}><p className='text-gray-500 hover:text-gray-600 font-inter text-[16] font-semibold'>Dashboard</p></Link>
        <p>/</p>
        <p className='font-inter font-semibold text-[16px]'>Document</p>
    </div>
    <div className='flex flex-row w-[100%] h-[10%]'>
        <div className='flex flex-row w-[50%]'>
            <p className='text-[30px] font-inter font-semibold'>Documents</p>
        </div>
        <div className='flex flex-row w-[50%] h-[60%] space-x-3 justify-end'>
                <div className='ease-linear duration-150 cursor-pointer hover:w-[160px] h-[100%] flex flex-row items-center space-x-2 p-2 rounded-md bg-gradient-to-r from-green-500 to-green-700' onClick={()=>setcreateSheet(true)}>
                    <div className='text-white flex items-center'><FaFileExcel/></div>
                    <p className='text-[14px] text-white font-inter font-semibold'>create sheet</p>
                </div>
            <div className='flex flex-row w-[180px] h-[100%] items-center md:flex md:flex-row md:items-center md:w-[210px] md:h-[38px] rounded-md border-gray-400 border-2 border-solid space-x-3 hover:shadow-md hover:duration-150'>
                
                <input onChange={handleSearch} type='text' placeholder='Search' className='pl-2 w-full text-[13px] h-full outline-none rounded-md border-l-0 md:text-[15px] text-gray-600' />
                
            </div>
            
        </div>
    </div>
    <div className='w-[100%] h-[80%] space-y-2 rounded-md border-gray-200  bg-white flex flex-col p-4'>
       
        <div className='flex flex-row w-[100%] h-[10%]  font-sans font-semibold'>
            <div className='w-[15%] h-[100%] flex items-center justify-start'>
                <p className='text-[16px] pl-2 font-inter'>Uploaded by</p>
            </div>
            <div className='w-[15%] h-[100%]  flex items-center justify-start'>
                <p className='text-[16px] pl-2 font-inter'>File Type</p>
            </div>
            <div className='w-[20%] items-center justify-start flex h-[100%]'>
                <p className='text-[16px] pl-2 font-inter'>File name</p>
            </div>
            <div className='w-[15%] flex pl-2 items-center justify-start h-[100%]'>
                <p className='text-[16px] font-inter'>Time</p>
            </div>
            <div className='w-[15%] flex pl-2 items-center justify-start h-[100%]'>
                <p className='text-[16px] font-inter'>Deal Name</p>
            </div>
            <div className='w-[15%] flex pl-2 items-center justify-start h-[100%]'>
                <p className='text-[16px] font-inter '>Tab</p>
            </div>
            <div className='w-[15%] flex pl-2 items-center justify-start h-[100%]'>
                <p className='text-[16px] font-inter '>Visibility</p>
            </div>
            <div className='w-[15%] flex flex-col pr-5 items-center justify-start h-[100%]'>
                <p className='text-[16px] font-inter'>Add or remove</p>
            </div> 
        </div>
       
        <div className='w-[100%] bg-white h-[1px] overflow-auto  '> </div>
        {
            !loading?
            <div className='flex flex-col w-[100%] h-[10%] pt-2 font-roboto overflow-auto'>
                {
                    (allDocs||[]).map(doc=>
                    <div key={doc._id} className='flex flex-row w-[100%] h-[100%] font-inter items-center pt-1  border-t border-gray-300 mb-6' >
                        <div className='w-[15%] h-[100%] scrollbar-hide overflow-x-auto flex items-end justify-start '>
                            <p className='text-[14px] pl-2  '>{doc.uploadedBy}</p>
                        </div>
                        <div className='w-[15%] h-[100%] scrollbar-hide overflow-x-auto pl-4 flex items-end justify-start'>
                            <p className='text-[14px] pl-3'>{doc.fileType}</p>
                        </div>
                        <div className='w-[20%] items-end scrollbar-hide overflow-x-auto justify-start flex h-[100%]'>
                            <p className='text-[14px] pl-2'>{doc.name}</p>
                        </div>
                        <div className='w-[15%] flex pl-2 scrollbar-hide overflow-x-auto items-end justify-start h-[100%]'>
                            <p className='text-[14px]'>{formatTime(doc.time)}</p>
                        </div>
                        <div className='w-[15%] flex pl-2 scrollbar-hide overflow-x-auto items-end justify-start h-[100%]'>
                            <p className='text-[14px]'>{doc.CompanyName}</p>
                        </div>
                        <div className='w-[15%] flex scrollbar-hide overflow-x-auto  pl-2 items-end justify-start h-[100%]'>
                            <p className='text-[14px]'>{doc.tab}</p>
                        </div>
                        <div className='w-[15%] flex scrollbar-hide overflow-x-auto  pl-2 items-end justify-start h-[100%]'>
                           {
                            !privatefiles.includes(doc._id)?
                            <div onClick={()=>{setfileprivate(true);setdocId(doc._id)}} className='select-none cursor-pointer w-[100%] h-[35px] mr-[32px] flex items-center justify-center bg-red-800 rounded-md text-white'>
                                <p className='text-[12px] font-inter'>make it private</p>
                           </div>
                           :
                           <div onClick={()=>handlepublicfun(doc._id)} className='select-none cursor-pointer w-[100%] h-[35px] mr-[32px] flex items-center justify-center bg-red-800 rounded-md text-white'>
                                <p className='text-[12px] font-inter'>make it public</p>
                           </div>
                           }
                        </div>
                        <div className='w-[15%] flex flex-col pr-5 items-center justify-start h-[100%]'>
                            <div className='basis-1/2 flex justify-end space-x-3 '>
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

    <div className='w-[100%] h-[80%] space-y-2 rounded-md border-gray-200  bg-white flex flex-col p-4'>
       <div className='w-[100%] h-[40px] mb-4 flex flex-row space-x-2 items-center'>
            <p className='text-[18px] font-semibold w-[20%]'>Google Drive Documents</p>
            <div className='text-blue-500 w-[10%]'><FaGoogleDrive /></div>
            <div className='w-[70%] flex items-center justify-end'>
                <div className='w-[20px] h-[20px] cursor-pointer' onClick={()=>GetDriveSheets()} >
                    <IoRefresh size={20} />
                </div>
            </div>
       </div>
        <div className='flex flex-row w-[100%] h-[10%]  font-sans font-semibold'>
            <div className='w-[15%] h-[100%] flex items-center justify-start'>
                <p className='text-[16px] pl-2 font-inter'>Gmail</p>
            </div>
            <div className='w-[15%] h-[100%]  flex items-center justify-start'>
                <p className='text-[16px] pl-2 font-inter'>File Type</p>
            </div>
            <div className='w-[20%] items-center justify-start flex h-[100%]'>
                <p className='text-[16px] pl-2 font-inter'>File name</p>
            </div>
            <div className='w-[15%] flex flex-col pr-5 items-center justify-start h-[100%]'>
                <p className='text-[16px] font-inter'>Add or remove</p>
            </div> 
        </div>
       
        <div className='w-[100%] bg-white h-[1px] overflow-auto  '> </div>
        {
            !loading?
            <div className='flex flex-col w-[100%] h-[10%] pt-2 font-roboto overflow-auto'>
                {
                    (googleDrivesheets||[]).map(doc=>
                    <div key={doc._id} className='flex flex-row w-[100%] h-[100%] font-inter items-center pt-1  border-t border-gray-300 mb-6' >
                        <div className='w-[15%] h-[100%] scrollbar-hide overflow-x-auto  flex items-end justify-start '>
                            <p className='text-[14px] pl-2 '>{gmailname}</p>
                        </div>
                        <div className='w-[15%] h-[100%] pl-4 scrollbar-hide overflow-x-auto flex items-end justify-start'>
                            <p className='text-[14px] pl-3'>xlsx</p>
                        </div>
                        <div className='w-[20%] items-end scrollbar-hide overflow-x-auto justify-start flex h-[100%]'>
                            <p className='text-[14px] pl-2'>{doc.name}</p>
                        </div>
                        <div className='w-[15%] flex flex-col pr-5 items-center justify-start h-[100%]'>
                            <div className='basis-1/2 flex justify-end space-x-3 '>
                            <p className='text-[14px] text-sky-600 cursor-pointer ' onClick={()=>handleGoogleSheetView(doc.id,doc.name)}>View</p>
                                <p className='text-[14px] text-red-600 cursor-pointer' onClick={()=>handleGoogleSheetDelete(doc.id)}>Remove</p>
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
        <div className='fixed left-0 top-[-20px] pt-[5%] w-[100%] h-[100%] bg-white'>
            <Viewsheet hidenavbar={hidenavbar} viewdDoc={viewdDoc} jsonData={jsonData} id={id} clickedview={clickedView} setclickedview={setclickedview}/>
        </div>
        :
        <></>
    }
    {
        createSheet?
        <div className='fixed left-0 w-[100%] top-[-20px] pt-[5%] h-[100%] bg-white'>
            <Createsheet createSheet={createSheet} setcreateSheet={setcreateSheet} hidenavbar={hidenavbar}/>
        </div>
        :
        <></>
    }
    {
        fileprivate?
        <div className='fixed left-0 w-[100%] top-[-20px] h-[100%] bg-white bg-opacity-80'>
            <PrivatePopup docId={docId} hidenavbar={hidenavbar} setfileprivate={setfileprivate}/>
        </div>
        :
        <></>
    }
</div>
  )
}

export default Alldocs