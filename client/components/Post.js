import React, { useState, useEffect } from 'react'

import { Avatar } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import axios from 'axios';
import ChatBox from './ChatBox';
import InteractionBar from './InteractionBar';


const Post = ({ memeId, imageUrl, likes, comments, avatar, username, handleDelete }) => {
  const [memeLikes, setMemeLikes] = useState(likes.length);
  const [numOfMessages, setNumOfMessages] = useState(comments.length);
  const [liked, setLiked] = useState(false);
  const [avatarSvg, setAvatarSvg] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (avatar) {
      import(`../../public${avatar}?url`)
        .then((module) => {
          setAvatarSvg(module.default);
        })
        .catch(err => console.log(err)); 
    }
  }, [avatar]);


  useEffect(() => {
    if (likes.includes(userId)) {
      setLiked(true);
    }
  }, [])


  const handleComment = () => {
    if (!isChatOpen) {
      setIsChatOpen(true);
    } else {
      setIsChatOpen(false);
    }
  }

  const handleLikeAndUnlike = () => {
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

  const handleNumOfMessages = () => {
    setNumOfMessages(prevNum => prevNum + 1);
  }

  return (
    <div className="flex flex-col border border-zinc-700 pb-4 border-r-0 border-l-0">
      <div className="flex p-4 gap-2 items-center justify-between">
        <div className="flex gap-1">
          <Avatar src={avatarSvg} />
          <p className="text-zinc-400 text-sm">{`@${username}`}</p>
        </div>
        <span onClick={() => handleDelete(memeId)}>
          {
            username === localStorage.getItem('username') && ( <ClearIcon fontSize="medium" className='text-zinc-700 rounded-full hover:text-zinc-400 cursor-pointer hover:border hover:border-zinc-700'/> )
          }
        </span>
      </div>
        <div className="flex-1 ml-12 px-4">
          <div className="border border-zinc-600 rounded-lg">
            {
              imageUrl.endsWith('.mp4') ? (<video src={imageUrl} autoPlay loop muted className='rounded-lg w-full h-full object-cover' loading="lazy"></video>) : 
              (
                <img src={imageUrl} alt="" className='rounded-lg w-full h-full object-cover'/>
              )
            }
          </div>
          <InteractionBar 
            handleComment={handleComment}
            numOfMessages={numOfMessages}
            handleLikeAndUnlike={handleLikeAndUnlike}
            memeLikes={memeLikes}
            liked={liked}
          />
        </div>
        {isChatOpen && 
          (<ChatBox 
            memeId={memeId} 
            comments={comments} 
            currentUser={{ username: localStorage.getItem('username'), avatar: localStorage.getItem('avatar') }}
            onNewMessage={handleNumOfMessages}
            isChatOpen={isChatOpen}
          />)
        }
      </div>
    )
  }
;

export default Post
