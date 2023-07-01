import React, { forwardRef, useState, useEffect } from 'react'

import { Avatar, Tooltip } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PublishIcon from '@mui/icons-material/Publish';

import axios from 'axios';
import ChatBox from './ChatBox';


const Post = forwardRef(({ memeId, imageUrl, likes, comments, avatar, username }, ref) => {
  const [memeLikes, setMemeLikes] = useState(likes.length);
  const [numOfMessages, setNumOfMessages] = useState(comments.length);
  const [liked, setLiked] = useState(false);
  const [messages, setMessages] = useState([...comments.reverse()]);
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
  }, [likes, userId])


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

  const handleNewMessage = (newMessage) => {
    setMessages(prevMessages => [ ...prevMessages, newMessage ])
    setNumOfMessages(prevNum => prevNum + 1);
  }

  return (
    <div className="flex flex-col items-start border border-zinc-700 pb-4 border-r-0 border-l-0">
        <div className="flex p-4 gap-2 items-center">
          <Avatar src={avatarSvg} />
          <p className="text-zinc-400 text-sm">
              {`@${username}`}
          </p>
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
        </div>
        {isChatOpen ? (
          <ChatBox 
            memeId={memeId} 
            comments={comments} 
            currentUser={{ username: localStorage.getItem('username'), avatar: localStorage.getItem('avatar') }}
            onNewMessage={handleNewMessage}
          /> 
        ) : null}
      </div>
    )
  }
);

export default Post
