import React, { useState, useEffect } from 'react'
import { Avatar } from '@mui/material'

function Message({ avatar, username, message }) {
  const [avatarSvg, setAvatarSvg] = useState(null);

  useEffect(() => {
    if (avatar) {
      import(`../../public${avatar}?url`)
        .then((module) => {
          setAvatarSvg(module.default);
        })
        .catch(err => console.log(err)); 
    }
  }, [avatar]);

  return (
    <div className='flex items-center mt-4'>
      <div className='flex pl-4 items-center text-sm'>
        <Avatar src={avatarSvg} sx={{ width: 36, height: 36}}/>
      </div>
      <div className='flex flex-col'>
        <div className='text-zinc-500 text-xs'>
          {`@${username}`}
        </div>
        <p className='ml-4 mt-2 text-white'>
          {message}
        </p>
      </div>
    </div>
    
  )
}

export default Message
