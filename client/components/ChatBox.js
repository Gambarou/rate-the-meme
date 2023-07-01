import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import Message from './Message'
import { Avatar } from '@mui/material'

function ChatBox({ memeId, comments, currentUser: { avatar, username }, onNewMessage }) {
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

  useEffect(() => {
    const reversedComments = [...comments].reverse();
    setMessages(reversedComments);
  }, []);

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

  const handleMessage = async () => { 
    try {
      setMessage('');
      const updatedMeme = await axios.post('/api/memes/messages', { _id: memeId, message, avatar, username });
      if (updatedMeme) {
        setMessages([...updatedMeme.data.comments.reverse()]);
        onNewMessage(message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col text-zinc-300 h-full w-full border border-zinc-700 p-2 text-sm">
        <div className='flex w-full h-full'>
          <div className='flex w-full'>
            <Avatar src={avatarSvg} sx={{ width: 24, height: 24 }}/>
            <input className="
                flex-grow
                bg-black
                outline-none
                border
                ml-2
                border-b-1
                border-t-0
                border-x-0
                border-zinc-700
                focus:border-zinc-800
                focus:transition-transform
                "
                onChange={((e) => setMessage(e.target.value))}  
                id='message'
                type='text' 
                value={message}
                placeholder='Type message here' 
            />
            <label onClick={handleMessage} htmlFor='message' className='bg-black text-zinc-200 text-sm -translate-x-4 cursor-pointer hover:text-zinc-400'>Submit</label>
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
