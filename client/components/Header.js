import React from 'react'

import UploadIcon from '@mui/icons-material/Upload';
import LogoutIcon from '@mui/icons-material/Logout';

function Header({ handleLogout, handleOpenModal}) {
  return (
    <div className="sticky top-0 flex justify-between z-50 p-5 bg-black bg-opacity-70 backdrop-blur-md">
        <h2 className="text-2xl text-zinc-200 lg:text-4xl font-bold">ℝ𝕒𝕥𝕖 𝕥𝕙𝕖 𝕄𝕖𝕞𝕖</h2>
        <div className='flex justify-items-end gap-6'>
            <div onClick={handleOpenModal} className='flex flex-col items-center justify-center text-zinc-200 cursor-pointer group group-hover'>
            <UploadIcon fontSize="large" className='group-hover:text-emerald-500'/>
            <p className="text-zinc-200 group-hover:text-emerald-500 text-sm">Upload</p>
            </div>
            <div onClick={handleLogout} className="flex flex-col items-center justify-center text-zinc-200 cursor-pointer group group-hover">
            <LogoutIcon fontSize="large" className="group-hover:text-sky-500"/>
            <p className="text-zinc-200 group-hover:text-sky-500 text-sm">Logout</p>
            </div>
        </div>
    </div>
  )
}

export default Header
