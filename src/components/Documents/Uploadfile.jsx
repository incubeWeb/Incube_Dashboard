import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useRef, useState } from 'react'
import { BsFileEarmarkPdfFill, BsFiletypeJpg, BsFiletypePng } from 'react-icons/bs';
import { CiFileOn } from 'react-icons/ci';

const Uploadfile = ({uploadfile,setuploadfile,hidenavbar}) => {


    
    const [selectedFile, setSelectedFile] = useState(null);
    const [showload,setshowload]=useState(false)
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file);
        }
    };

    const handleCancel = () => {
        setSelectedFile(null);
        setuploadfile(!uploadfile)
    };
    const appnavref=useRef(null);
    const handleclickoutside=(e)=>{
        if(appnavref.current && !appnavref.current.contains(e.target))
        {
            setuploadfile(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleclickoutside);
        return () => {
          document.removeEventListener('mousedown', handleclickoutside);
        };
      }, []);

    const handleUpload = async () => {
        setshowload(true)
        if (selectedFile) {
            const fileType=selectedFile.name.split('.')[selectedFile.name.length-1]

            
            const formData = new FormData();
            formData.append('id',"none")
            formData.append('files', selectedFile);
            formData.append('tab', "-");
            formData.append('CompanyName',"-");
            formData.append('uploadedBy',Logemail)
            formData.append('organization',Logorganization)
            try {
                const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/uploadFile`, formData,{
                    headers:{
                      "Authorization":`Bearer ${token}`
                    }
                  });
               
                if(response.data.status==200){
                    setSelectedFile(null);
                    setuploadfile(!uploadfile)
                    setshowload(false)
                }
               
            } catch (error) {
                console.error('Error uploading file', error);
            }
        }
    };
  return (
    <div className=" flex w-[100%] h-[100%] items-center justify-center top-[-20px]">
        <div ref={appnavref} className="bg-white p-6 rounded-lg shadow-lg w-[380px] h-[50%] flex items-center justify-center flex-col">
            <div className="h-[80%] w-[100%]">
                    {uploadfile ? (
                        selectedFile ? (
                            <div className="flex flex-col items-center justify-center w-full h-[100%]">
                                <p className="text-sm text-gray-700">{selectedFile.name}</p>
                                {
                                    showload?
                                    <div><p>Uploading file...</p></div>
                                    :
                                    <div className="flex space-x-4 mt-4">
                                    <button
                                        className="px-4 py-2 bg-blue-500 shadow-md border-sky-500 border-[1px] text-white rounded-md text-[12px]"
                                        onClick={handleUpload}
                                    >
                                        Upload
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md text-[12px] border-red-500 border-[1px]"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                }
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full h-[100%]">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-[100%] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                                </label>
                            </div>
                        )
                    ) : null}
                    
                </div>



        </div>
        
    </div>
  )
}

export default Uploadfile