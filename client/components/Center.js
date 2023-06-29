import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FlipMove from "react-flip-move";
import Post from './Post';

import LogoutIcon from '@mui/icons-material/Logout';



function Center({ setIsLoggedIn, memes }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
          const res = await axios.post('/api/logout');
      
          if (res.data.loggedOut) {
              setIsLoggedIn(false)
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
    <div className="flex-0.4 h-full border border-t-0 border-b-0 border-zinc-700 overflow-y-scroll no-scrollbar">
      <div className="sticky top-0 flex justify-between z-50 p-5 bg-black bg-opacity-70 backdrop-blur-md">
        <h2 className="text-2xl text-zinc-200 lg:text-4xl font-bold">ℝ𝕒𝕥𝕖 𝕥𝕙𝕖 𝕄𝕖𝕞𝕖</h2>
        <div onClick={handleLogout} className="flex flex-col items-center justify-center text-zinc-200 cursor-pointer group group-hover">
          <LogoutIcon className="group-hover:text-sky-500"/>
          <p className="text-zinc-200 group-hover:text-sky-500 text-sm">Logout</p>
        </div>
      </div>
      <div className='-mt-1'>
        <FlipMove >
            {memes.map((meme) => { return (
              <Post 
                key={meme._id}
                memeId={meme._id}
                imageUrl={meme.imageUrl}
                likes={meme.likes}
                comments={meme.comments}
              />
            )})}
        </FlipMove>
      </div>  
    </div>
  )
}

export default Center
