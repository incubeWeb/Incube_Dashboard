import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { BsFiletypePng } from "react-icons/bs";
import { BsFiletypeJpg } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
const FilesDoc = ({ currentTab,CompanyName }) => {
    const [uploadFile, setUploadFile] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleCancel = () => {
        setSelectedFile(null);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('files', selectedFile);
            formData.append('tab', `Tab${currentTab}`);
            formData.append('CompanyName',CompanyName);
            formData.append('uploadedBy',localStorage.getItem('email'))
            formData.append('organization',localStorage.getItem('organization'))
            try {
                const response = await axios.post('http://ec2-13-233-247-65.ap-south-1.compute.amazonaws.com:8999/uploadFile', formData);
                console.log('File uploaded successfully', response.data);
                setSelectedFile(null);
                fetchUploadedFiles(); // Clear selected file after upload
                setUploadFile(!uploadFile)
            } catch (error) {
                console.error('Error uploading file', error);
            }
        }
    };

    const fetchUploadedFiles = async () => {
        try {
            const response = await axios.post('http://ec2-13-233-247-65.ap-south-1.compute.amazonaws.com:8999/getfiles', { CompanyName:CompanyName,tab: `Tab${currentTab}`,organization:localStorage.getItem('organization') });
            setUploadedFiles(response.data.data);
        } catch (error) {
            console.error('Error fetching uploaded files', error);
        }
    };

    useEffect(() => {
        fetchUploadedFiles();
    }, [currentTab]);

    return (
        <div className="w-[100%] h-[100%]">
            <div className="p-[16px] w-[100%] h-[100%] rounded-md shadow-md border-[1px] border-gray-300 md:flex md:flex-col space-y-4">
                <div className="h-[20%] w-[100%] border-b-[1px] border-gray-300 flex flex-row items-center">
                    <div className="w-[50%] pl-[7px]">
                        <p className="text-[14px]">Files</p>
                    </div>
                    <div className="w-[50%] pr-[7px] flex justify-end">
                        <p
                            className="text-blue-600 text-[13px] cursor-pointer"
                            onClick={() => setUploadFile(!uploadFile)}
                        >
                            {uploadFile ? 'View' : 'Add new'}
                        </p>
                    </div>
                </div>
                <div className="h-[80%] w-[100%]">
                    {uploadFile ? (
                        selectedFile ? (
                            <div className="flex flex-col items-center justify-center w-full h-[100%]">
                                <p className="text-sm text-gray-700">{selectedFile.name}</p>
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
                    {!uploadFile && (
                        <div className=" overflow-y-auto h-[100%] flex flex-col space-y-2">
                        
                                {uploadedFiles.map((file, index) => (
                                    <div key={index} className=" flex h-[30px] p-2 rounded-md border-b-gray-300 border-b-[1px] flex-row items-center justify-between">
                                        <div className='flex flex-row w-[100%] space-x-2 items-center justify-start'>
                                            {file.fileType=='pdf'?<BsFileEarmarkPdfFill className='text-red-500'/>:
                                             file.fileType=='png'?<BsFiletypePng className='text-blue-500'/>:
                                             (file.fileType=='jpg'||file.fileType=='jpeg')?<BsFiletypeJpg  className='text-blue-500' />:
                                             <CiFileOn />
                                            
                                            
                                            }
                                            
                                            <span className='text-[14px] capitalize'>{file.name}</span>
                                        </div>
                                        <a href={`http://ec2-13-233-247-65.ap-south-1.compute.amazonaws.com:8999/uploads/${file.fileName}`} target="_blank" rel="noopener noreferrer" className='text-blue-600 text-[14px]'>
                                            Open
                                        </a>
                                    </div>
                                ))}
                            
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilesDoc;
