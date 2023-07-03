import React from 'react'

import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';

function Upload( { fileUrl, setFileUrl, isUrlValid, handleCloseModal, handleModalSubmit }) {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-70">
        <div className="bg-black bg-opacity-80 border border-zinc-700 p-8 rounded-md w-96">
        <h3 className="text-md text-zinc-200 font-semibold mb-3">Upload Meme</h3>
            <input
            id="upload"
            type="text"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            placeholder="Enter URL for meme..."
            className="
                block
                rounded-md
                px-1
                py-2
                w-full
                text-sm
                bg-black
                bg-opacity-60
                border
                text-zinc-300
                border-zinc-700
                apperance-none
                focus:outline-none
                focus:border-blue-400
                focus:border-2
            "
            />
            <div className='mt-2'>
            {!isUrlValid && <div className='text-red-700 text-sm'>Invalid URL</div>}
            </div>
        <div className="mt-4 flex justify-end gap-4">
            <div onClick={handleModalSubmit} className='flex items-center justify-center rounded-md hover:bg-emerald-900 hover:bg-opacity-20 hover:border-emerald-900 border border-zinc-700 p-2 text-zinc-200 cursor-pointer group group-hover'>
              <p className="text-zinc-200 group-hover:text-emerald-500 text-sm">Submit</p>
              <UploadIcon fontSize="small" className='group-hover:text-emerald-500'/>
            </div>
            <div onClick={handleCloseModal} className='flex items-center justify-center rounded-md hover:bg-red-900 hover:bg-opacity-20 hover:border-red-900 border border-zinc-700 p-2 text-zinc-200 cursor-pointer group group-hover'>
              <p className="text-zinc-200 group-hover:text-red-700 text-sm">Cancel</p>
              <CloseIcon fontSize="small" className='group-hover:text-red-700'/>
            </div>
            
        </div>
        </div>
    </div>
  )
}

export default Upload
