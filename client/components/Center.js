import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';
import Header from './Header';
import Upload from './Upload';
import { fetchUser } from '../fetchers/user';
import { postMeme, deleteMeme } from '../fetchers/meme';


function Center({ setIsLoggedIn }) {
  const [memesData, setMemesData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [fileUrl, setFileUrl] = useState('');
  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();

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
      const user = await fetchUser(userId);

      const newMeme = await postMeme(fileUrl, user);

      setMemesData(prevMemesData => [newMeme, ...prevMemesData])

      // reset the input field and close the modal
      setFileUrl('');
      setIsUrlValid(true)
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }

  }


  useEffect(() => { 
    const fetchMemes = async () => {
      try {
        const cancelToken = axios.CancelToken.source()
        const res = await axios.get('/api/memes', { cancelToken: cancelToken.token })
        setMemesData([...res.data.reverse()]);

        return () => {
          cancelToken.cancel();
        }
      } catch(err) {
          if (axios.isCancel(err)) {
            console.log("cancelled");
          } else {
            console.log(err);
          }
        }
    }

    fetchMemes();
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

  const handleOpenModal = () => {
    setOpenModal(true);
  }
  
  const handleCloseModal = () => {
    setFileUrl('');
    setOpenModal(false);
  }

  
  const handleModalSubmit = () => {
    setIsUrlValid(checkUrl(fileUrl));
    if (checkUrl(fileUrl)) {
      handleUpload();
    }
  }

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleModalSubmit();
    }
  }, [handleModalSubmit]);

  useEffect(() => {
    if (openModal) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      return;
    }
  }, [handleKeyDown]);

  const handleDelete = async (memeId) => {
    try {
      await deleteMeme(memeId);
      setMemesData(prevMemesData => prevMemesData.filter(meme => meme._id !== memeId));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex-0.4 bg-black h-full border border-t-0 border-b-0 border-zinc-700 overflow-y-scroll no-scrollbar">
      <Header handleOpenModal={handleOpenModal} handleLogout={handleLogout} />
      <div className='-mt-1'>
        <div className='flex flex-col'>
            {memesData.map((meme) => { return (
              <Post 
                key={meme._id}
                memeId={meme._id}
                imageUrl={meme.imageUrl}
                likes={meme.likes}
                comments={meme.comments}
                avatar={meme.avatar}
                username={meme.username}
                handleDelete={handleDelete}
              />
            )})}
        </div>
      </div>
      {openModal && (
        <Upload
          fileUrl={fileUrl}
          setFileUrl={setFileUrl}
          isUrlValid={isUrlValid} 
          handleCloseModal={handleCloseModal}
          handleModalSubmit={handleModalSubmit}
        />
      )}  
    </div>
  )
}

export default Center
