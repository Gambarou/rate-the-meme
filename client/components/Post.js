import React, { forwardRef, useState, useEffect } from 'react'

import { Avatar, Tooltip } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PublishIcon from '@mui/icons-material/Publish';

import axios from 'axios';

const Post = forwardRef(({ memeId, imageUrl, likes, comments }) => {
  const [memeLikes, setMemeLikes] = useState(likes.length);
  const [liked, setLiked] = useState(false);
  const userId = localStorage.getItem('userId');
  const avatar = localStorage.getItem('avatar');

  useEffect(() => {
    if (likes.includes(userId)) {
      setLiked(true);
    }
  }, [likes, userId])

  const handleClick = () => {
    if (!liked) {
      setMemeLikes((prevVal) => prevVal + 1 )
      setLiked(true);

      axios.post(`/api/memes/${memeId}/like`, { userId })
        .then(() => {
          axios.put(`/api/users/${userId}/likedImages`, { memeId })
        })
        .catch((err) => console.log(err));
    } else {
      setMemeLikes((prevVal) => prevVal - 1 )
      setLiked(false);

      axios.post(`/api/memes/${memeId}/unlike`, { userId })
        .then(() => {
          axios.put(`/api/users/${userId}/likedImages/remove`, { memeId })
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex items-start border border-zinc-700 pb-4 border-r-0 border-l-0">
        <div className="p-5">
          <Avatar src="" />
        </div>
        <div className="flex-1 p-4">
          <div className="">
            <div className="">
              <h3 className="text-md mb-1 text-white">
                {'displayName'}{" "}
                <span className="text-gray-500 text-sm">
                  {'username'}
                </span>
              </h3>
            </div>
            <div className="mb-2 text-base">
              <p className="text-white text-sm">text</p>
            </div>
          </div>
          <div className="border border-zinc-600 rounded-lg">
            <img src={imageUrl} alt="" className='rounded-lg w-full h-full object-cover'/>
          </div>
          <div className="flex justify-between mt-1">
            
            <div className='flex items-center justify-center group group-hover cursor-pointer'>
              <Tooltip title="Comment" enterDelay={500}>
                <div className="inline-flex items-center justify-center p-2 rounded-full text-zinc-600 group-hover:bg-cyan-900 group-hover:bg-opacity-30 group-hover:text-sky-600">
                  <ChatBubbleOutlineIcon fontSize="small" />
                </div>
              </Tooltip>
              <p className='text-zinc-600 text-sm group-hover:text-sky-600'>500</p>
            </div>
            <Tooltip title="Resend" enterDelay={500}>
              <div className="inline-flex items-center justify-center p-2 rounded-full text-zinc-600 hover:bg-emerald-900 hover:bg-opacity-40 hover:text-emerald-400">
              <RepeatIcon fontSize="small"/>
              </div>
            </Tooltip>

            <div onClick={handleClick} className='flex items-center justify-center group group-hover cursor-pointer'>
              <Tooltip title="Like" enterDelay={500}>
                <div className={`inline-flex items-center justify-center p-2 rounded-full ${liked ? 'text-pink-600' : 'text-zinc-600'} group-hover:bg-pink-900 group-hover:bg-opacity-30 group-hover:text-pink-600`}>
                  {liked ? (<FavoriteIcon fontSize='small' />) : (<FavoriteBorderIcon fontSize="small" />) }
                </div>
              </Tooltip>
              <p className='text-zinc-600 text-sm group-hover:text-pink-500'>{memeLikes}</p>
            </div>

            <Tooltip title="Share" enterDelay={500}>
              <div className="inline-flex items-center justify-center p-2 rounded-full text-zinc-600 hover:bg-cyan-900 hover:bg-opacity-30 hover:text-sky-600">
              <PublishIcon
                  fontSize="small"
              />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    )
  }
);

export default Post
