import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FlipMove from "react-flip-move";
import Post from './Post';

import LogoutIcon from '@mui/icons-material/Logout';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';



function Center({ setIsLoggedIn }) {
    const [images, setImages] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [isUrlValid, setIsUrlValid] = useState(true);
    const [fileUrl, setFileUrl] = useState('');
    const userId = localStorage.getItem('userId');

    const navigate = useNavigate();

    const handleOpenModal = () => {
      setOpenModal(true);
    }

    const checkUrl = (url) => {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$|^www\.[^\s/$.?#].[^\s]*$/i;
      return urlPattern.test(url);
    }

    const handleUpload = async () => {
      if (!checkUrl(fileUrl)) {
        setIsUrlValid(false);
        setFileUrl('');
        return;
      } 

      try {
        const username = localStorage.getItem('username');

        const userRes = await axios.get(`/api/users/${userId}`);
        const user = userRes.data;
        console.log('Username: ', username)

        const res = await axios.post('/api/memes', { imageUrl: fileUrl, username: user.username, avatar: user.avatar });
        const newMeme = res.data;

        setImages(prevImages => [...prevImages, newMeme])

        // reset the input field and close the modal
        setFileUrl('');
        setIsUrlValid(true)
        setOpenModal(false);
      } catch (err) {
        console.log(err);
      }

    }

    const handleCloseModal = () => {
      setFileUrl('');
      setOpenModal(false);
    }


    useEffect(() => {
        axios.get('/api/memes')
          .then(res => {
            setImages([...res.data])
          })
          .catch(err => console.log(err))

    }, [])

    const handleLogout = async () => {
      try {
          const res = await axios.post('/api/logout');
      
          if (res.data.loggedOut) {
              setIsLoggedIn(false)
              localStorage.removeItem('username');
              localStorage.removeItem('avatar');
              setTimeout(() => {
                navigate('/');
              }, 200)
          }
          } catch (error) {
          // Handle error
          console.error('Logout failed', error);
      }
    }

  return (
    <div className="flex-0.4 bg-black h-full border border-t-0 border-b-0 border-zinc-700 overflow-y-scroll no-scrollbar">
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
      <div className='-mt-1'>
        <FlipMove >
            {images.map((meme) => { return (
              <Post 
                key={meme._id}
                memeId={meme._id}
                imageUrl={meme.imageUrl}
                likes={meme.likes}
                comments={meme.comments}
                avatar={meme.avatar}
                username={meme.username}
              />
            )})}
        </FlipMove>
      </div>
      {openModal && (
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
              <div onClick={handleCloseModal} className='flex items-center justify-center rounded-md hover:bg-red-900 hover:bg-opacity-20 hover:border-red-900 border border-zinc-700 p-2 text-zinc-200 cursor-pointer group group-hover'>
                <p className="text-zinc-200 group-hover:text-red-700 text-sm">Cancel</p>
                <CloseIcon fontSize="small" className='group-hover:text-red-700'/>
              </div>
              <div onClick={handleUpload} className='flex items-center justify-center rounded-md hover:bg-emerald-900 hover:bg-opacity-20 hover:border-emerald-900 border border-zinc-700 p-2 text-zinc-200 cursor-pointer group group-hover'>
                <p className="text-zinc-200 group-hover:text-emerald-500 text-sm">Submit</p>
                <UploadIcon fontSize="small" className='group-hover:text-emerald-500'/>
              </div>
            </div>
          </div>
        </div>
      )}  
    </div>
  )
}

export default Center
