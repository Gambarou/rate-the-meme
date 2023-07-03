import React from 'react'

import { Tooltip } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PublishIcon from '@mui/icons-material/Publish';

function InteractionBar({ liked, handleComment, numOfMessages, handleLikeAndUnlike, memeLikes }) {
  return (
    <div className="flex justify-between mt-1">        
      <div onClick={handleComment} className='flex items-center justify-center group group-hover cursor-pointer'>
        <Tooltip title="Comment" enterDelay={500}>
          <div className="inline-flex items-center justify-center p-2 rounded-full text-zinc-600 group-hover:bg-cyan-900 group-hover:bg-opacity-30 group-hover:text-sky-600">
            <ChatBubbleOutlineIcon fontSize="medium" />
          </div>
        </Tooltip>
        <p className='text-zinc-600 text-sm group-hover:text-sky-600'>{numOfMessages}</p>
      </div>
        <Tooltip title="Resend" enterDelay={500}>
          <div className="inline-flex items-center justify-center p-2 rounded-full text-zinc-600 hover:bg-emerald-900 hover:bg-opacity-40 hover:text-emerald-500 cursor-pointer">
            <RepeatIcon fontSize="medium"/>
          </div>
        </Tooltip>
      <div onClick={handleLikeAndUnlike} className='flex items-center justify-center group group-hover cursor-pointer'>
        <Tooltip title="Like" enterDelay={500}>
          <div className={`inline-flex items-center justify-center p-2 rounded-full ${liked ? 'text-pink-600' : 'text-zinc-600'} group-hover:bg-pink-900 group-hover:bg-opacity-30 group-hover:text-pink-600`}>
            {liked ? (<FavoriteIcon fontSize="medium" />) : (<FavoriteBorderIcon fontSize="medium" />) }
          </div>
        </Tooltip>
        <p className='text-zinc-600 text-sm group-hover:text-pink-500'>{memeLikes}</p>
      </div>
        <Tooltip title="Share" enterDelay={500}>
          <div className="inline-flex items-center justify-center p-2 rounded-full text-zinc-600 hover:bg-cyan-900 hover:bg-opacity-30 hover:text-sky-600 cursor-pointer">
            <PublishIcon
              fontSize="medium"
            />
          </div>
        </Tooltip>
    </div>
  )
}

export default InteractionBar
