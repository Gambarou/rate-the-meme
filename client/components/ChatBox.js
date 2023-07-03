import React, { useEffect, useState, useCallback, useRef } from 'react'
import axios from 'axios'

import Message from './Message'
import { Avatar } from '@mui/material'

function ChatBox({ memeId, currentUser: { avatar, username }, onNewMessage, isChatOpen }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([]);
  const [avatarSvg, setAvatarSvg] = useState(null);
  const chatBoxRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const isAtBottomRef = useRef(true);

  useEffect(() => {
    if (avatar) {
      import(`../../public${avatar}?url`)
        .then((module) => {
          setAvatarSvg(module.default);
        })
        .catch(err => console.log(err)); 
    }
  }, [avatar]);

  const handleScroll = () => {
    const chatBox = chatBoxRef.current
    scrollPositionRef.current = chatBoxRef.scrollTop;
    isAtBottomRef.current = chatBox.scrollHeight - chatBox.scrollTop === chatBox.clientHeight;
  }

  useEffect(() => {
    if (chatBoxRef.current) {
      const chatBox = chatBoxRef.current;
      if (isAtBottomRef.current) {
        chatBox.scrollTop = chatBox.scrollHeight;
      } else {
        chatBox.scrollTop = scrollPositionRef.current;
      }
    }
  }, [messages]);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
   
    axios.get(`/api/memes/messages?memeId=${memeId}`, { cancelToken:cancelToken.token })
      .then(res => {
        setMessages(res.data.reverse())
        if (chatBoxRef.current) {
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log("cancelled");
        } else {
          console.log(err);
        }
      })

    return () => {
      cancelToken.cancel();
    }

  }, [])



  const handleMessage = async () => { 
    try {
      if (!message) {
        console.log('No message')
        return
      }
      setMessage('');
      const updatedMeme = await axios.post('/api/memes/messages', { _id: memeId, message, avatar, username });
      if (updatedMeme) {
        onNewMessage(message);
        setMessages(updatedMeme.data.comments.reverse())
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleMessage();
    }
  }, [handleMessage]);

  useEffect(() => {
    if (isChatOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      return;
    }
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col text-zinc-300 h-full w-full border border-zinc-700 p-2 text-sm">
        <div className='flex w-full h-full'>
          <div className='flex w-full'>
            <Avatar src={avatarSvg} sx={{ width: 24, height: 24 }}/>
            <input 
              className="
                flex-grow
                bg-black
                outline-none
                border
                ml-2
                border-b-1
                border-t-0
                border-x-0
                border-zinc-700
                focus:placeholder-transparent
              "
              onChange={((e) => setMessage(e.target.value))}  
              id='message'
              type='text' 
              value={message}
              placeholder='Type message here...' 
            />
            <label 
              className="
                bg-black
                text-zinc-200
                text-sm
                cursor-pointer
                p-2
                border
                border-zinc-700
                rounded-md
                hover:bg-sky-900
                hover:bg-opacity-30
                hover:text-sky-500
              "
              onClick={handleMessage}
              htmlFor="message" 
            >
              Submit
            </label>
          </div>
        </div>
        <div className='text-white' onScroll={handleScroll}>
          {messages.map((message) => {
            return (
              <Message key={message._id} avatar={message.avatar} username={message.username} message={message.text} />
            )
          })}
        </div>
    </div>
  )
}

export default ChatBox
